# Use a minimal base image with bash, Docker, and Redis support
FROM docker:dind

# Install Redis, Node.js, and Python (or your project stack needs)
RUN apk add --no-cache \
    bash \
    redis \
    docker-cli \
    nodejs \
    npm \
    python3 \
    py3-pip \
    git

WORKDIR /app
COPY . .

# Make sure the start script is executable
RUN chmod +x scripts/start.sh

CMD ["scripts/start.sh"]
