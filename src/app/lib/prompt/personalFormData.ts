import { PersonalInput } from "../../types/personal-input";

export function personalFormData(data: PersonalInput): string {
    const {
        theme,
        host,
        invitee,
        date,
        time,
        location,
        food,
        activities,
        vibe,
        age,
        classYear,
        year,
        message,
    } = data;

    return `
Write a warm, engaging invitation email.

Event: ${theme}
Host: ${host}
Guests: ${invitee}
Date: ${date}
Time: ${time}
Location: ${location}
Food: ${food}
Activities: ${activities}
Vibe: ${vibe}

Details:
${theme === "birthday" && age ? `Celebrating ${age} years` : ""}
${theme === "graduation" && classYear ? `Class of ${classYear}` : ""}
${theme === "newyear" && year ? `Celebrating the year ${year}` : ""}

Notes: ${message}

Instructions:
- Highlight what guests can expect
- Make the event feel personal
- Output to 2 lines with just 1 line break
- If the vibe is playful, add emojis

Output:
- 1 concise line (for subject line, no need to label it for subject)
- 1 line of text at max 50 words (for the message, no need to label it for message)
`;
}