// api/compose/route.ts
import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { openai, DEFAULT_MODEL } from '@/src/app/lib/openai';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const message = body?.message;

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: 'Invalid message.' }, { status: 400 });
        }
        const response = await openai.responses.create({
            model: DEFAULT_MODEL,
            input: message,
        });

        // console.dir(response, { depth: null }); ** for debug use

        return NextResponse.json({ result: response.output_text });

    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}