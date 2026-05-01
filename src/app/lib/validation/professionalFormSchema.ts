import { z } from "zod";

export const professionalFormSchema = z.object({

    theme: z.enum(["announcement", "promotion", "invite", "relation"], {
        error: () => ({ message: "Please select a theme." })
    }),

    business: z.string().min(1, "Business name is required.").max(20, "Must be 20 characters or fewer."),

    address: z.string().min(1, "Business address is required.").max(30, "Must be 30 characters or fewer."),

    website: z.url({ message: "Invalid website address." }).or(z.literal("")),

    customer: z.string().min(1, "Customer name is required.").max(30, "Must be 30 characters or fewer."),

    purpose: z.string().min(1, "Please provide a purpose for the email.").max(50, "Must be 50 characters or fewer."),

    start: z.string().max(20, "Must be 20 characters or fewer.").optional(),

    end: z.string().max(20, "Must be 20 characters or fewer.").optional(),

    location: z.string().max(50, "Must be 50 characters or fewer.").optional(),

    message: z.string().min(50, "Message must be at least 50 characters.").max(500, "Must be 500 characters or fewer."),

    disclaimer: z.string().max(200, "Must be 200 characters or fewer.").optional(),

    unsub: z.url({ message: "Invalid or empty unsubscribe link." }),

    color: z.string().max(7, "Invalid entry.").optional(),

    logo: z.url({ message: "Invalid image link." }).or(z.literal("")),

    text: z.string().max(20, "Must be 20 characters or fewer.").optional(),

    cta: z.url({ message: "Invalid landing page address." }).or(z.literal("")),

    code: z.string().max(20, "Must be 20 characters or fewer.").optional(),
});