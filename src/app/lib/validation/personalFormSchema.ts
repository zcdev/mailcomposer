import { z } from "zod";

export const personalFormSchema = z.object({

    theme: z.string()
        .refine(
            (val) => ["birthday", "graduation", "wedding", "newyear"].includes(val), {
            message: "Please select a theme.",
        }),

    host: z.string().min(1, "Host name is required.").max(30, "Must be 30 characters or fewer."),

    invitee: z.string().min(1, "Invitee name is required.").max(30, "Must be 30 characters or fewer."),

    date: z.string().min(1, "Please enter a date.").max(15, "Must be 15 characters or fewer."),

    time: z.string().min(1, "Please enter a time.").max(15, "Must be 15 characters or fewer."),

    location: z.string().max(50, "Must be 50 characters or fewer."),

    food: z.string().max(30, "Must be 30 characters or fewer").optional(),

    activities: z.string().min(1, "Please enter at least one activity.").max(30, "Must be 30 characters or fewer"),

    vibe: z.string()
        .refine(
            (val) => ["formal", "friendly", "playful"].includes(val), {
            message: "Please select a theme.",
        }),

    age: z.string().optional(),

    classYear: z.string().optional(),

    year: z.string().optional(),

    message: z.string().min(1, "Message must not be empty.").max(200, "Must be 200 characters or fewer"),

    rsvp: z.url({ message: "Invalid website address." }),

    banner: z.url({ message: "Invalid website address." }).optional(),
});