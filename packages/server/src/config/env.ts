import type { ConfigFactory } from '@nestjs/config';

export default function loadEnv(): ReturnType<ConfigFactory> {
  return {
    hostname: process.env.HOSTNAME ?? 'localhost',
    origin: process.env.ORIGIN ?? '',
    port: Number.parseInt(process.env.PORT ?? '3000', 10),
    secretKey: process.env.SECRET_KEY,
  };
}
