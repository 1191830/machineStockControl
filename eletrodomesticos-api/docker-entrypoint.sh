#!/bin/sh

echo "⏳ Waiting for DB to be ready..."
./wait-for-it.sh "$DB_HOST:$DB_PORT" --timeout=30 --strict -- echo "✅ DB is ready"

echo "🚀 Running seed script..."
node dist/database/seeds.js

echo "🚀 Starting API..."
node dist/server.js
