// app/api/generate-email/route.ts
import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST() {
    return new Promise((resolve, reject) => {
        exec('node src/app/lib/compileMJML.ts', (err, stdout) => {
            if (err) reject(err);
            resolve(new NextResponse(stdout));
        });
    });
}