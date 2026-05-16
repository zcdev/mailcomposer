import { NextResponse, NextRequest } from "next/server";
import AdmZip from 'adm-zip';
import { generateHTML } from "@/utils/generate-html";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const { subject, emailBody, formData } = await req.json();

        if (!subject || !emailBody || !formData) {
            return NextResponse.json(
                { error: "Missing data." },
                { status: 400 }
            );
        }

        const result = generateHTML(subject, emailBody, formData);

        if (result.errors.length > 0 || !result.html) {
            return NextResponse.json(
                { error: "Failed to generate template." },
                { status: 400 }
            );
        }

        const zip = new AdmZip();
        zip.addFile("subject-line.txt", Buffer.from(subject));
        zip.addFile("email-template.html", Buffer.from(result.html));

        const zipBuffer = zip.toBuffer();

        return new NextResponse(zipBuffer, {
            headers: {
                'Content-Disposition': 'attachment; filename=MailComposer.zip',
                'Content-Type': 'application/zip',
            },
        });

    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: 'Something went wrong.' },
            { status: 500 });
    }
}