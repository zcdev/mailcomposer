import { z } from "zod";

export const personalFormSchema = z.object({

    theme: z.enum(["birthday", "graduation", "wedding", "newyear"], {
        error: () => ({ message: "Please select a theme." })
    }),

    host: z.string().min(1, "Host name is required.").max(30, "Must be 30 characters or fewer."),

    invitee: z.string().min(1, "Invitee name is required.").max(30, "Must be 30 characters or fewer."),

    date: z.string().min(1, "Please enter a date.").max(15, "Must be 15 characters or fewer."),

    time: z.string().min(1, "Please enter a time.").max(15, "Must be 15 characters or fewer."),

    location: z.string().min(1, "Please enter a location.").max(50, "Must be 50 characters or fewer."),

    food: z.string().max(30, "Must be 30 characters or fewer").optional(),

    activities: z.string().min(1, "Please enter at least one activity.").max(30, "Must be 30 characters or fewer"),

    vibe: z.enum(["formal", "friendly", "playful"], {
        error: () => ({ message: "Please select a vibe." })
    }),

    age: z.string().max(3, "Invalid entry.").optional(),

    classYear: z.string().max(4, "Invalid entry.").optional(),

    year: z.string().max(4, "Invalid entry.").optional(),

    message: z.string().min(30, "Message must be 30 characters or more.").max(200, "Must be 200 characters or fewer"),

    rsvp: z.url({ message: "Invalid website address." }),

    banner: z.string().optional(),
});