import { z } from "zod";

export const professionalFormSchema = z.object({

    theme: z.string()
        .refine(
            (val) => ["birthday", "graduation", "wedding", "newyear"].includes(val), {
            message: "Please select a theme.",
        }),

    host: z.string().min(1, "Host name is required."),

    invitee: z.string().min(1, "Invitee name is required."),

    date: z.string().min(1, "Please select a date."),

    time: z.string().min(1, "Please select a time."),

    location: z.string().min(1, "Location is required."),

    food: z.string().optional(),

    activities: z.string().min(1, "Please enter at least one activity."),

    vibe: z.string()
        .refine(
            (val) => ["formal", "friendly", "playful"].includes(val), {
            message: "Please select a theme.",
        }),

    age: z.string().optional(),

    classYear: z.string().optional(),

    year: z.string().optional(),

    message: z.string().min(1, "Message must not be empty."),

    rsvp: z.url({ message: "Invalid website address." }),

    banner: z.url({ message: "Invalid website address." }).optional(),
});