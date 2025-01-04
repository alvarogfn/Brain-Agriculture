FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=server --prod /server
RUN pnpm deploy --filter=web --prod /web

FROM base AS server
COPY --from=build /server /server
WORKDIR /server
EXPOSE 8000
CMD [ "pnpm", "start" ]

FROM base AS web
COPY --from=build /web /web
WORKDIR /web
EXPOSE 8001
CMD [ "pnpm", "start" ]