import { RedisOptions } from 'ioredis'

declare namespace NodeJS {
  export interface ProcessEnv {
    REDIS_URL: RedisOptions
    SESSION_SECRET: string
  }
}
