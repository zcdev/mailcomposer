export type PersonalInput = {
    theme: "birthday" | "graduation" | "wedding" | "newyear";
    host: string;
    invitee: string;
    date: string;
    time: string;
    location: string;
    food?: string;
    activities: string;
    vibe: "formal" | "friendly" | "playful";
    age?: string;
    classYear?: string;
    year?: string;
    message: string;
    rsvp: string;
    banner?: string;
};