// lib/openai.ts (client setup)
import "server-only";
import { env } from "@/env";
import OpenAI from "openai";

if (!env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
}

export const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});

export const DEFAULT_MODEL = "gpt-5.4-nano";