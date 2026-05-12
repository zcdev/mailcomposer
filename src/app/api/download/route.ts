import { NextResponse, NextRequest } from "next/server";
import AdmZip from 'adm-zip';
import mjml2html from 'mjml';
import { personalTemplate } from "../../utils/personal-template";
import { professionalTemplate } from "@/utils/professional-template";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const { subject, emailBody, formData } = await req.json();

        if (!subject || !emailBody || !formData) {
            return NextResponse.json(
                { error: "Missing data" },
                { status: 400 }
            );
        }

        const isBusiness = formData.business;

        const theme = isBusiness
            ? professionalTemplate(subject, emailBody, formData)
            : personalTemplate(subject, emailBody, formData);

        const result = mjml2html(theme, {
            minify: true,
            validationLevel: 'strict',
        });

        if (result.errors.length > 0 || !result.html) {
            return NextResponse.json(
                {
                    error: "Failed to generate template",
                    details: result.errors,
                },
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

    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}