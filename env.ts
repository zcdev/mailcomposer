// env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        OPENAI_API_KEY: z.string().min(1).startsWith("sk-"),
        NODE_ENV: z.enum(["development", "test", "production"]),
    },
    runtimeEnv: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        NODE_ENV: process.env.NODE_ENV,
    },
});