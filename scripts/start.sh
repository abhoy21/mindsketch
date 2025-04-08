#!/bin/bash

# Start Redis
echo "🔴 Starting Redis..."
redis-server &

# Wait for Redis to be ready
echo "⏳ Waiting for Redis to start..."
sleep 3

# Start HTTP Server
echo "🌐 Building and starting HTTP server..."
docker build -f docker/Dockerfile.http-server -t http-server .
docker run -e DATABASE_URL -e JWT_SECRET -e GEMINI_API_KEY -e ACCESS_TOKEN_EXPIRES_IN -e REFRESH_TOKEN_EXPIRES_IN -e REDIS_URL=redis://localhost:6379 -p 8000:8000 http-server &

# Start WS Server
echo "📡 Building and starting WS server..."
docker build -f docker/Dockerfile.ws-server -t ws-server .
docker run -e DATABASE_URL -e JWT_SECRET -e GEMINI_API_KEY -e ACCESS_TOKEN_EXPIRES_IN -e REFRESH_TOKEN_EXPIRES_IN -e REDIS_URL=redis://localhost:6379 -p 8080:8080 ws-server &

# Start Worker
echo "⚙️  Building and starting Worker..."
docker build -f docker/Dockerfile.worker -t worker .
docker run -e DATABASE_URL -e REDIS_URL=redis://localhost:6379 worker &

# Start Web (Next.js)
echo "🖥️  Building and starting Web app..."
docker build -f docker/Dockerfile.web -t web .
docker run -e NEXT_PUBLIC_HTTP_URL -e NEXT_PUBLIC_WS_URL -p 3000:3000 web &

# Keep container running
wait
