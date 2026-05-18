FROM oven/bun:1-alpine

WORKDIR /app

# `zip` is required by the /api/zip route which spawns the system binary.
# `python3` + `pipx` host the upstream `skills-ref` validator
# (https://pypi.org/project/skills-ref/) which `src/validate-skill.ts`
# shells out to so we always run the canonical Agent Skills spec rules
# instead of a hand-ported copy.
RUN apk add --no-cache zip python3 py3-pip pipx \
  && PIPX_HOME=/opt/pipx PIPX_BIN_DIR=/usr/local/bin pipx install skills-ref

# Install dependencies first to leverage Docker layer caching.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source.
COPY tsconfig.json ./
COPY src ./src
COPY templates ./templates
# Tracked curated bundles — source of truth for descriptions and any
# hand-written prose. The refresh flow reads/writes these on disk and
# commits diffs back to GitHub when GITHUB_TOKEN + GITHUB_REPO are set.
COPY curated-bundles ./curated-bundles

# /app/output is the working directory for built skills. Pre-create it
# with permissive ownership so the unprivileged `bun` user can write to
# it (otherwise builds fail with EACCES on Fly's read-only base layers).
RUN mkdir -p /app/output && chown -R bun:bun /app/output

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "src/server.ts"]
