import { PersonalInput, ProfessionalInput } from "@/types";

export async function downloadZip(emailData: string, formData: PersonalInput | ProfessionalInput) {
    const subjectLineTxt = emailData.split('\n')[0]?.replace(/\*\*Subject:\*\*\s+/, "").trim();

    const emailBodyMsg = emailData.split('\n')[1]?.replace(/\*\*Message:\*\*\s+/, "").trim();

    const disclaimerNote = emailData.split('n')[2]?.replace(/\*\*Message:\*\*\s+/, "").trim();

    const response = await fetch('/api/download', {
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

    console.log(subjectLineTxt);
    console.log(emailBodyMsg);
    console.log(disclaimerNote);
    const blob = await response.blob();
    console.log("response", response);
    console.log("blob", blob);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MailComposer.zip';
    link.click();
    window.URL.revokeObjectURL(url);
};