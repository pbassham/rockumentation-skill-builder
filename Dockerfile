FROM oven/bun:1-alpine

WORKDIR /app

# `zip` is required by the /api/zip route which spawns the system binary.
RUN apk add --no-cache zip

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

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "src/server.ts"]
