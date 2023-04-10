# docker build . -t fyp-api -f ci/Dockerfile
ARG WORKDIR=/opt/app

# Base Stage: Upgrade npm and install / upgrade pnpm
FROM node:16-alpine AS base

LABEL builder=true
RUN npm i -g npm pnpm

# Dependencies Stage: Copy package.json + lock file and install dependencies
FROM base as dependencies
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm i --production

# Production Stage: Copy dist and package.json from builder and start the application
FROM base as runner
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY src src
COPY package.json .
COPY --from=dependencies ${WORKDIR}/node_modules node_modules
COPY tsconfig.json .
RUN pnpm build


CMD [ "pnpm", "start:prod"]