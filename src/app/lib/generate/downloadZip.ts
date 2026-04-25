import { PersonalInput } from "@/src/app/types/personal-input";

export async function downloadZip(emailData: string, formData: PersonalInput) {
    const subjectLineTxt = emailData.split('\n')[0]?.replace(/\*\*Subject:\*\*\s+/, "").trim();

    const emailBodyMsg = emailData.split('\n')[1]?.replace(/\*\*Message:\*\*\s+/, "").trim();

    const response = await fetch('/api/download', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            subject: subjectLineTxt,
            emailBody: emailBodyMsg,
            formData: formData,
        }),
    });

    console.log(subjectLineTxt);
    console.log(emailBodyMsg);
    const blob = await response.blob();
    console.log("response", response);
    console.log("blob", blob);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'archive.zip';
    link.click();
    window.URL.revokeObjectURL(url);
};