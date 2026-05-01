'use client';
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfessionalInput, FieldConfig } from "@/types/";
import { professionalFormSchema } from "@/lib/validation/professionalFormSchema";
import { promptAI } from '@/lib/prompt/promptAI';
import { professionalFormData } from '@/lib/prompt/professionalFormData';
import { downloadZip } from '@/lib/generate/downloadZip';
import { primaryButtonStyle } from '@/components/ui';
import Input from '../ui/Input';
import TextArea from "../ui/TextArea";
import Button from '../ui/Button';
import Select from "../ui/Select";

export default function ProfessionalForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfessionalInput>({
        resolver: zodResolver(professionalFormSchema),
    });

    const onSubmit = async (data: ProfessionalInput) => {
        try {
            const promptData = professionalFormData(data);
            console.log("promptData", promptData);

            const aiResponseData = await promptAI(promptData);
            console.log("AI responded Data", aiResponseData.result);

            await downloadZip(aiResponseData.result, data);
        } catch (error) {
            console.error(error);
        }
    };

    const themeOption = useWatch({ control, name: "theme" });
    const messageValue = useWatch({ control, name: "message" });
    const disClaimerValue = useWatch({ control, name: "disclaimer" });
    const currentYear = new Date().getFullYear();

    const fields: FieldConfig<ProfessionalInput>[] = [
        // Theme
        {
            name: "theme",
            label: "Theme",
            type: "select",
            options: [
                { label: "Select the theme of your email", value: "" },
                { label: "Announcement (Company News, Updates, Product Launch)", value: "announcement" },
                { label: "Promotion (Discount, Offer, Limited-time deal)", value: "promotion" },
                { label: "Event Invitation (Seminar, Workshop, Meetup)", value: "invite" },
                { label: "Customer Relationship (Welcome, Follow-up, Check-in, Outreach)", value: "relation" },
            ],
        },

        // Theme-based input fields
        {
            name: "code",
            label: "Promo Code",
            type: "input",
            placeholder: "$20OFFSOFTWARE",
            maxLength: 20,
            showIf: (theme) => theme === "promotion",
        },
        {
            name: "start",
            label: "Start Date & Time",
            type: "input",
            placeholder: `November 1st, ${currentYear}`,
            maxLength: 20,
            showIf: (theme) => theme === "promotion",
        },
        {
            name: "end",
            label: "End Date & Time",
            type: "input",
            placeholder: `January 1st, ${currentYear + 1}`,
            maxLength: 20,
            showIf: (theme) => theme === "promotion",
        },
        {
            name: "purpose",
            label: "Promotional Item",
            type: "input",
            placeholder: "Hybridger AI Software Suite",
            minLength: 1,
            maxLength: 50,
            showIf: (theme) => theme === "promotion",
        },
        {
            name: "purpose",
            label: "Topic",
            type: "input",
            placeholder: "AI Software Development Workshop",
            minLength: 1,
            maxLength: 50,
            showIf: (theme) => theme !== "promotion",
        },
        {
            name: "location",
            label: "Event Location",
            type: "input",
            placeholder: "1st Street, Industrial City, CA 99999",
            maxLength: 50,
            showIf: (theme) => theme === "invite",
        },

        // Base fields
        {
            name: "business", label: "Business Name", type: "input", placeholder: "Hybridger, Inc.", minLength: 1, maxLength: 30,
        },
        {
            name: "address", label: "Business Address", type: "input", placeholder: "1st Main Street, Hybrid City, CA 99999", minLength: 1, maxLength: 30,
        },
        {
            name: "website", label: "Business Website", type: "input", placeholder: "https://www.your-company.com", minLength: 1, maxLength: 100,
        },
        {
            name: "customer", label: "Customer Name", type: "input", placeholder: "Joy Johnson", minLength: 1, maxLength: 15,
        },

        // Official fields
        {
            name: "message",
            label: "Message",
            type: "textarea",
            placeholder: "",
            minLength: 50,
            maxLength: 500,
        },
        {
            name: "disclaimer",
            label: "Disclaimer",
            type: "textarea",
            placeholder: "",
            maxLength: 200,
        },
        {
            name: "unsub", label: "Unsubscribe Link", type: "input", placeholder: "https://your-company.com/unsubscribe", minLength: 1, maxLength: 50,
        },

        // Templating fields
        {
            name: "color", label: "Brand Color", type: "input", placeholder: "#ff0000 (Optional)", maxLength: 7,
        },
        {
            name: "logo", label: "Logo Link", type: "input", placeholder: "https://your-company.com/logo.png (Optional)", maxLength: 200,
        },
        {
            name: "text", label: "Button Text", type: "input", placeholder: "Join now (Optional)", minLength: 1, maxLength: 20,
        },
        {
            name: "cta", label: "Button Link", type: "input", placeholder: "https://your-company.com/landing-page (Optional)", minLength: 1, maxLength: 100,
        },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl flex-col">
            {fields.map((field) => {

                if (field.showIf && !field.showIf(themeOption ?? "")) return null;

                if (field.type === "select") {
                    return (
                        <Select
                            key={field.name}
                            label={field.label}
                            id={field.name}
                            {...register(field.name)}
                            error={errors[field.name]?.message}
                            options={field.options}
                        />
                    );
                }

                if (field.type === "input") {
                    return (
                        <Input
                            key={field.name}
                            label={field.label}
                            id={field.name}
                            placeholder={field.placeholder}
                            {...register(field.name)}
                            error={errors[field.name]?.message}
                        />
                    );
                }

                if (field.type === "textarea") {
                    return (
                        <TextArea
                            label={field.label}
                            id={field.name}
                            key={field.name}
                            {...register(field.name)}
                            placeholder={field.placeholder}
                            minLength={field.minLength}
                            maxLength={field.maxLength}
                            error={errors[field.name]?.message}
                            messageCharCount={messageValue?.length ?? 0}
                            disclaimerCharCount={disClaimerValue?.length ?? 0}
                        />
                    );
                }

                return null;
            })}

            <Button type="submit" disabled={isSubmitting} className={primaryButtonStyle}>{isSubmitting ? "Generating..." : "Generate & Download"}</Button>
        </form>
    );
}