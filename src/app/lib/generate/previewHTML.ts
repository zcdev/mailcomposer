import { PersonalInput, ProfessionalInput } from "@/types";

export async function previewHtml(emailData: string, formData: PersonalInput | ProfessionalInput) {
    const subjectLineTxt = emailData.split('\n')[0]?.replace(/\*\*Subject:\*\*\s+/, "").trim();

    const emailBodyMsg = emailData.split('\n')[1]?.replace(/\*\*Message:\*\*\s+/, "").trim();

    const disclaimerNote = emailData.split('\n')[2]?.replace(/\*\*Disclaimer:\*\*\s+/, "").trim();

    const response = await fetch('/api/preview', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            subject: subjectLineTxt,
            emailBody: emailBodyMsg,
            disclaimer: disclaimerNote ?? "",
            formData: formData,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to generate preview");
    }

    return response.json();
}