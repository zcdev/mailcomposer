import mjml2html from "mjml";
import { personalTemplate } from "./personal-template";
import { professionalTemplate } from "./professional-template";

export function generateHTML(
    subject: string,
    emailBody: string,
    formData: any
) {
    const isBusiness = formData.business;

    const theme = isBusiness
        ? professionalTemplate(subject, emailBody, formData)
        : personalTemplate(subject, emailBody, formData);

    const result = mjml2html(theme, {
        minify: true,
        validationLevel: "strict",
    });

    return result;
}