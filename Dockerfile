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
# Curated description cache — read by generate.ts to seed reference frontmatter
# on every build, written to by /api/describe on each generation.
COPY data ./data

# /app/output is the working directory for built skills. Pre-create it
# with permissive ownership so the unprivileged `bun` user can write to
# it (otherwise builds fail with EACCES on Fly's read-only base layers).
RUN mkdir -p /app/output && chown -R bun:bun /app/output

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "src/server.ts"]
