import { ProfessionalInput, ThemeBase, TemplatePartials } from "@/types";
import { relationMJML } from "@/utils/professional-mjml/relation";
import { inviteMJML } from "@/utils/professional-mjml/invite";
import { getContrastTextColor } from "./helpers/theming";
import { announcementMJML } from "./professional-mjml/announcement";
import { promotionMJML } from "./professional-mjml/promotion";

export function professionalTemplate(subject: string, emailBody: string, formData: ProfessionalInput) {
    const color = formData.color?.toLowerCase() ?? "black";
    const btnTxtColor = getContrastTextColor(color);
    const currentYear = new Date().getFullYear().toString();
    const themeBase = { subject, emailBody, formData, color, currentYear };
    const { theme, logo, picture, website, business, customer, disclaimers, unsub, address, text, cta } = formData;

    const partials: TemplatePartials = {
        picture: picture
            ? `<mj-image width="400px" padding="10px 10px" src="${picture}" href="${cta}" alt="${text} to visit" />`
            : undefined,
        button: text && cta
            ? `<mj-button font-family="Helvetica" background-color="${color}" color="${btnTxtColor}" padding-bottom="20px" href="${cta}">
        ${text}</mj-button>`
            : undefined,
        disclaimers: disclaimers
            ? `<mj-text font-size="12px" line-height="24px" color="#666666" padding="0px 20px 0px 20px">
        ${disclaimers}</mj-text>`
            : undefined,
        header: logo && website && business && color
            ? `<mj-image width="100px" padding="10px 10px" src="${logo}" href="${website}" alt="${business} logo" />
        <mj-divider border-width="4px" border-style="solid" border-color="${color}"></mj-divider>`
            : undefined,
        footer: unsub
            ? `<mj-divider border-width="1px" border-style="dashed" border-color="#dddddd" padding="20px 20px" />
        <mj-text font-size="12px" line-height="24px" color="#666666" padding="0px 20px 0px 20px">
        This email was sent to ${customer}. To no longer receive emails from 
        <a href="${website}" style="color:#666666 !important; text-decoration: underline;">
        ${business}
        </a>, 
        <a href="${unsub}" style="color:#666666 !important; text-decoration: underline;">
        unsubscribe</a>.
        </mj-text>
        <mj-text font-size="12px" line-height="24px" color="#666666" padding="0px 20px 0px 20px">
        ${address}
        </mj-text>
        <mj-text font-size="12px" line-height="24px" color="#666666" padding="0px 20px 0px 20px">
        ${business} &copy;${currentYear}
        </mj-text>
        <mj-spacer height="20px" />`
            : undefined,
    };

    const themes = {
        announcement: announcementMJML,
        promotion: promotionMJML,
        invite: inviteMJML,
        relation: relationMJML,
      };

    const renderTheme = themes[theme];

    if (!renderTheme) {
        throw new Error(`Unsupported theme: ${theme}`);
    }

    return renderTheme(themeBase, partials);
}