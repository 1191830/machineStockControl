import Redis from "ioredis";

let redis: Redis;

export function initRedis() {
  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  redis = new Redis(redisUrl);

  redis.on("connect", () => console.log("✅ Redis connected"));
  redis.on("error", (err) => console.error("❌ Redis error", err));

  return redis;
}

export { redis };