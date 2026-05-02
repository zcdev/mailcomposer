import { ProfessionalInput, ThemeBase } from "@/types";
import { relationMJML } from "@/utils/professional-mjml/relation";
import { inviteMJML } from "@/utils/professional-mjml/invite";
import { getContrastTextColor } from "./helpers/theming";
import { announcementMJML } from "./professional-mjml/announcement";
import { promotionMJML } from "./professional-mjml/promotion";

export function professionalTemplate(subject: string, emailBody: string, formData: ProfessionalInput) {
    const theme = formData.theme;
    const logo = formData.logo ?? "";
    const picture = formData.picture ?? "";
    const color = formData.color?.toLowerCase() ?? "black";
    const currentYear = new Date().getFullYear().toString();
    const themeBase = { subject, emailBody, formData, logo, color, currentYear };

    const themes = {
        announcement: (themeBase: ThemeBase) => announcementMJML(themeBase, picture, getContrastTextColor(themeBase.color)),
        promotion: (themeBase: ThemeBase) => promotionMJML(themeBase, picture),
        invite: (themeBase: ThemeBase) => inviteMJML(themeBase, getContrastTextColor(themeBase.color)),
        relation: relationMJML,
    };

    switch (theme) {
        case "announcement":
            return themes.announcement(themeBase);
        case "promotion":
            return themes.promotion(themeBase);
        case "invite":
            return themes.invite(themeBase);
        case "relation":
            return themes.relation(themeBase);
        default:
            throw new Error(`Unsupported theme: ${theme}`);
    }
}