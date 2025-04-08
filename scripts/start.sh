#!/bin/bash

# Start Redis
echo "🔴 Starting Redis..."
redis-server &

# Wait for Redis to be ready
sleep 3

# Start HTTP Server
echo "🌐 Starting HTTP server..."
docker build -f docker/Dockerfile.http-server -t http-server .
docker run -e DATABASE_URL -e JWT_SECRET -e GEMINI_API_KEY -e ACCESS_TOKEN_EXPIRES_IN -e REFRESH_TOKEN_EXPIRES_IN -e REDIS_URL=redis://localhost:6379 -p 8000:8000 http-server &

# Start WebSocket Server
echo "📡 Starting WS server..."
docker build -f docker/Dockerfile.ws-server -t ws-server .
docker run -e DATABASE_URL -e JWT_SECRET -e GEMINI_API_KEY -e ACCESS_TOKEN_EXPIRES_IN -e REFRESH_TOKEN_EXPIRES_IN -e REDIS_URL=redis://localhost:6379 -p 8080:8080 ws-server &

# Start Worker
echo "⚙️ Starting Worker..."
docker build -f docker/Dockerfile.worker -t worker .
docker run -e DATABASE_URL -e REDIS_URL=redis://localhost:6379 worker &

# Start Web Frontend
echo "🖥️ Starting Web frontend..."
docker build -f docker/Dockerfile.web -t web .
docker run -e NEXT_PUBLIC_HTTP_URL -e NEXT_PUBLIC_WS_URL -p 3000:3000 web &

# Start Nginx (foreground)
echo "🚀 Starting Nginx reverse proxy..."
nginx -g "daemon off;"
