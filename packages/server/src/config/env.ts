import type { ConfigFactory } from '@nestjs/config';

export default function loadEnv(): ReturnType<ConfigFactory> {
  return {
    hostname: process.env.HOSTNAME || 'localhost',
    origin: (process.env.ORIGIN || '').split(';'),
    port: Number.parseInt(process.env.PORT, 10) || 3000,
    secretKey: process.env.SECRET_KEY,
  };
}
