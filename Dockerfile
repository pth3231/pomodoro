# syntax=docker/dockerfile:1

FROM node:22-alpine3.21

RUN mkdir /pomodoro
RUN chown node /pomodoro

# Run the application as a non-root user.
USER node

WORKDIR /pomodoro

# Copy the rest of the source files into the image.
COPY . .

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Expose the port that the application listens on.
EXPOSE 8000

# Run the application
CMD npm run start:docker
