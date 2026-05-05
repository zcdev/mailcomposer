import { z } from "zod";

export const professionalFormSchema = z.object({

    // ───────────────────────── Theme ─────────────────────────

    theme: z.enum(["announcement", "promotion", "invite", "relation"], {
        error: () => ({ message: "Please select a theme." })
    }),

    // ───────────────────── Required fields ─────────────────────

    item: z.string().min(1, "A promotional item is required.").max(50, "Must be 50 characters or fewer.").optional(),

    topic: z.string().min(1, "A topic is required.").max(50, "Must be 50 characters or fewer.").optional(),

    customer: z.string().min(1, "Customer name is required.").max(30, "Must be 30 characters or fewer."),

    business: z.string().min(1, "Business name is required.").max(30, "Must be 30 characters or fewer."),

    address: z.string().min(1, "Business address is required.").max(40, "Must be 40 characters or fewer."),

    color: z.string().min(7, "Must provide a hex color code of 7 characters."),

    website: z.url({ message: "Empty or invalid website address." }).max(100, "Must be 100 characters or fewer."),

    logo: z.url({ message: "Empty or invalid image link." }).max(100, "Must be 100 characters or fewer."),

    unsub: z.url({ message: "Invalid or empty unsubscribe link." }).max(100, "Must be 100 characters or fewer."),

    message: z.string().min(50, "Message must be at least 50 characters.").max(500, "Must be 500 characters or fewer."),

    // ───────────────────── Conditional or optional fields ─────────────────────

    disclaimers: z.string().max(200, "Must be 200 characters or fewer.").optional(),

    code: z.string().max(40, "Must be 20 characters or fewer.").optional(),

    start: z.string().max(40, "Must be 40 characters or fewer.").optional(),

    end: z.string().max(40, "Must be 40 characters or fewer.").optional(),

    datetime: z.string().max(50, "Must be 50 characters or fewer.").optional(),

    speakers: z.string().max(100, "Must be 100 characters or fewer.").optional(),

    agenda: z.string().max(200, "Must be 150 characters or fewer.").optional(),

    location: z.string().max(100, "Must be 50 characters or fewer.").optional(),

    cta: z.url({ message: "Invalid landing page address." }).max(100, "Must be 100 characters or fewer.").or(z.literal("")).optional(),

    text: z.string().max(20, "Must be 20 characters or fewer.").optional(),

    picture: z.url({ message: "Invalid image link." }).max(100, "Must be 100 characters or fewer.").or(z.literal("")).optional(),
}).superRefine((data, context) => {
    if (data.theme === "promotion") {
        if (!data.item) {
            context.addIssue({
                path: ["item"],
                code: "custom",
                message: "Item is required when theme is promotion",
            });
        }
    } else {
        if (!data.topic) {
            context.addIssue({
                path: ["topic"],
                code: "custom",
                message: "Topic is required when theme is not promotion",
            });
        }
    }
});;