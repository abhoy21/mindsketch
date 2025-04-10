#!/bin/bash

echo "Starting Redis..."
redis-server &

echo "Starting HTTP server..."
cd apps/api
npm install
npm run build
npm run start &

echo "Starting WS server..."
cd ../ws
npm install
npm run build
npm run start &

echo "Starting Web frontend..."
cd ../web
npm install
npm run build
npm run start &

echo "Starting Nginx..."
nginx -g "daemon off;"
