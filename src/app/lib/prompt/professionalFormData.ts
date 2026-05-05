import { ProfessionalInput } from "@/types";

export function professionalFormData(data: ProfessionalInput): string {
    const {
        theme,
        business,
        item,
        topic,
        start,
        end,
        datetime,
        speakers,
        agenda,
        location,
        message,
        disclaimers,
        code
    } = data;

    const getIntent = (theme: ProfessionalInput["theme"]) => {
        switch (theme) {
            case "announcement":
                return "Write a professional announcement email sharing important business news.";
            case "promotion":
                return "Write a persuasive promotional email highlighting an offer, discount, or deal.";
            case "invite":
                return "Write an invitation email for a business event with clear details and RSVP encouragement.";
            case "relation":
                return "Write a personalized message to the customer base on the given information.";
            default:
                return "";
        }
    };

    const isPromotion = theme === "promotion";
    const isBusinessIntent = theme !== "promotion";
    const isBusinessEvent = theme === "invite";

    const details = [
        isPromotion && item && `Promotional Item: ${item}`,
        isPromotion && code && `Use promo code: ${code}`,
        isPromotion && start && `Promotion start date & time: ${start}`,
        isPromotion && end && `Promotion end date & time: ${end}`,
        isBusinessIntent && topic && `Business intent: ${topic}`,
        isBusinessEvent && datetime && `Event Date & Time: ${datetime}`,
        isBusinessEvent && speakers && `Event Speakers: ${speakers}`,
        isBusinessEvent && agenda && `Event Agenda: ${agenda}`,
        isBusinessEvent && location && `Event Location: ${location}`,
    ].filter(Boolean).join("\n");

    return `
BUSINESS INTENT: ${getIntent(theme)}

BUSINESS DETAILS:
- Business Name: ${business}
- Brand Tone: Professional, friendly, and clear

CONTENT:
- Key Info: ${message}
${details ? `- Details: ${details}` : ""}
${disclaimers ? `- Disclaimers: ${disclaimers}` : ""}

Instructions:
- No greeting
- Highlight what recipient can expect
- Polish and make the message content feel personalized yet professional

Output:
${disclaimers
            ? "Subject line, email message, and disclaimer (3 lines total)"
            : "Subject line and email message (2 lines total)"}
`;
}