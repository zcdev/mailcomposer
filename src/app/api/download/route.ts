import { NextResponse, NextRequest } from "next/server";
import AdmZip from 'adm-zip';
import mjml2html from 'mjml';
import { personalTemplate } from "../../utils/personal-template";
import path from "path";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    const { subject, emailBody, formData } = await req.json();
    const result = mjml2html(personalTemplate(subject, emailBody, formData), {
        beautify: true,
        validationLevel: 'strict',
    });
    const headers = new Headers();
    headers.append('Content-Disposition', 'attachment; filename=archive.zip');
    headers.append('Content-Type', 'application/zip');

    const bannerPath = path.join(
        process.cwd(),
        `public/downloads/${formData.theme}`,
    );

    const zip = new AdmZip();
    zip.addFile("subject-line.txt", Buffer.from(subject));
    zip.addFile("email-temlpate.html", Buffer.from(result.html));
    zip.addLocalFolder(bannerPath);

    const zipBuffer = zip.toBuffer();

    return new NextResponse(zipBuffer, {
        headers,
    });
}