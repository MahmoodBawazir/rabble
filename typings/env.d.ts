declare namespace NodeJS {
  export interface ProcessEnv {
    REDIS_URL: string
    SESSION_SECRET: string
  }
}