type PromptInput = {
    theme: string;
    host: string;
    invitee: string;
    date: string;
    time: string;
    location: string;
    food?: string;
    activities: string;
    vibe: string;
    age?: string;
    classYear?: string;
    year?: string;
    message?: string | undefined;
};

export function parseFormData(data: PromptInput): string {
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
${theme === "Birthday" && age ? `Celebrating ${age} years` : ""}
${theme === "Graduation" && classYear ? `Class of ${classYear}` : ""}
${theme === "New Year" && year ? `Celebrating the year ${year}` : ""}

Notes: ${!message || message === "" ? "None" : message}

Instructions:
- Highlight what guests can expect
- Make the event feel personal

Output:
- Message: 1 short paragraph (max 80 words)
- Subject: 1 concise line
`;
}