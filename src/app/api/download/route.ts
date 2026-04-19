import { NextResponse, NextRequest } from "next/server";
import AdmZip from 'adm-zip';
import mjml2html from 'mjml';
import { personalTemplate } from "../../utils/personal-template";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    const { subject, emailBody } = await req.json();
    const result = mjml2html(personalTemplate(subject, emailBody), {
        beautify: true,
        validationLevel: 'strict',
    });
    const headers = new Headers();
    headers.append('Content-Disposition', 'attachment; filename=archive.zip');
    headers.append('Content-Type', 'application/zip');

    const zip = new AdmZip();
    zip.addFile("subject-line.txt", Buffer.from(subject));
    zip.addFile("email-temlpate.html", Buffer.from(result.html));

    const zipBuffer = zip.toBuffer();

    return new NextResponse(zipBuffer, {
        headers,
    });
}