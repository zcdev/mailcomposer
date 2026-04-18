import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST() {
    return new Promise((resolve, reject) => {
        exec('node src/app/lib/generate/compileMJML.ts', (err, stdout) => {
            if (err) reject(err);
            resolve(new NextResponse(stdout));
        });
    });
}