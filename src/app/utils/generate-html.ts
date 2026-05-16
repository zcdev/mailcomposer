import mjml2html from "mjml";
import { personalTemplate } from "./personal-template";
import { professionalTemplate } from "./professional-template";
import { FormData, ProfessionalInput } from "@/types";

const professionalThemes: ProfessionalInput["theme"][] = [
    "announcement",
    "promotion",
    "invite",
    "relation",
];

function isProfessionalForm(
    formData: FormData,
): formData is ProfessionalInput {
    return professionalThemes.includes(
        formData.theme as ProfessionalInput["theme"]
    );
}

export function generateHTML(
    subject: string,
    emailBody: string,
    formData: FormData,
) {
    const theme = isProfessionalForm(formData)
        ? professionalTemplate(subject, emailBody, formData)
        : personalTemplate(subject, emailBody, formData);

    const result = mjml2html(theme, {
        minify: true,
        validationLevel: "strict",
    });

    return result;
}