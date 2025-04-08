# Base image
FROM node:18

# Install dependencies: Redis, Python, Nginx
RUN apt-get update && apt-get install -y \
    redis-server \
    python3 python3-pip \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Copy project files
WORKDIR /app
COPY . .

# Copy Nginx config
COPY nginx/default.conf /etc/nginx/sites-available/default

# Make the start script executable
RUN chmod +x scripts/start.sh

EXPOSE 80
CMD ["scripts/start.sh"]
