#!/bin/bash

# Start Redis
redis-server &

# Start your backend HTTP server (adjust path if needed)
python3 path/to/http_server.py &

# Start your WebSocket server (adjust path if needed)
python3 path/to/ws_server.py &

# Start your web frontend (adjust if it’s Next.js or something else)
npm run start &

# Start Nginx in the foreground
nginx -g "daemon off;"
