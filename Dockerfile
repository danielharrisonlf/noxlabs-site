# syntax=docker/dockerfile:1

# 1. Build: Node 24 + pnpm, saída estática em /app/dist
FROM node:24-alpine AS build
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1 \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
RUN corepack enable && corepack prepare pnpm@10.11.1 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && node scripts/csp.mjs > /app/csp.conf

# 2. Runtime: nginx servindo só os arquivos estáticos
FROM nginx:alpine AS runtime
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/csp.conf /etc/nginx/snippets/csp.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
