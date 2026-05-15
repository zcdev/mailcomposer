import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { openai, DEFAULT_MODEL } from '@/lib/prompt/openai';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "1 m"),
});

export async function POST(req: NextRequest) {
    try {

        const forwardedFor = req.headers.get("x-forwarded-for");

        const ip = forwardedFor
            ? forwardedFor.split(",")[0].trim()
            : "anonymous";

        const { success, remaining, limit, reset } =
            await ratelimit.limit(ip);

        console.log({
            success,
            remaining,
            limit,
            reset,
        });

        if (!success) {
            return NextResponse.json(
                { error: 'Too many requests.' },
                { status: 429 }
            );
        }

        const body = await req.json();
        const message = body?.message;

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Invalid message.' },
                { status: 400 });
        }
        const response = await openai.responses.create({
            model: DEFAULT_MODEL,
            input: message,
        });

        // console.dir(response, { depth: null }); ** for debug use

        return NextResponse.json(
            { result: response.output_text }
        );

    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong.' },
            { status: 500 });
    }
}