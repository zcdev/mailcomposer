import { z } from "zod";

export const formSchema = z.object({
    theme: z.enum(["birthday", "graduation", "wedding", "newYear"]),
    host: z.string(),
    invitee: z.string(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    food: z.string().optional(),
    activities: z.string(),
    vibe: z.enum(["formal", "friendly", "playful"]),
    age: z.string().optional(),
    classYear: z.string().optional(),
    year: z.string().optional(),
    message: z.string().max(80, "Must be 80 characters or fewer"),
});

export type FormValues = z.infer<typeof formSchema>;