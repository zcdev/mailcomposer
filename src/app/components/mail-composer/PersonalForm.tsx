'use client';
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInput, FieldConfig } from '@/types';
import { personalFormSchema } from "@/lib/validation/personalFormSchema";
import { promptAI } from '@/lib/prompt/promptAI';
import { personalFormData } from '@/lib/prompt/personalFormData';
import { downloadZip } from '@/lib/generate/downloadZip';
import { primaryButtonStyle } from '@/components/ui';
import Input from '../ui/Input';
import TextArea from "../ui/TextArea";
import Button from '../ui/Button';
import Select from "../ui/Select";

export default function PersonalForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PersonalInput>({
        resolver: zodResolver(personalFormSchema),
    });

    const onSubmit = async (data: PersonalInput) => {
        try {
            const promptData = personalFormData(data);
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
    const currentYear = new Date().getFullYear();

    const fields: FieldConfig<PersonalInput>[] = [
        // Theme
        {
            name: "theme",
            label: "Theme",
            type: "select",
            options: [
                { label: "Select a theme for the event", value: "" },
                { label: "Birthday", value: "birthday" },
                { label: "Graduation", value: "graduation" },
                { label: "New Year", value: "newyear" },
                { label: "Wedding", value: "wedding" },
            ],
        },

        // Vibe
        {
            name: "vibe",
            label: "Vibe",
            type: "select",
            options: [
                { label: "Select a vibe for the event", value: "" },
                { label: "Formal", value: "formal" },
                { label: "Friendly", value: "friendly" },
                { label: "Playful", value: "playful" },
            ],
        },

        // Theme-based input fields
        {
            name: "age",
            label: "Age",
            type: "input",
            placeholder: "25",
            maxLength: 3,
            showIf: (theme) => theme === "birthday",
        },
        {
            name: "classYear",
            label: "Class Year",
            type: "input",
            placeholder: `${currentYear}`,
            maxLength: 4,
            showIf: (theme) => theme === "graduation",
        },
        {
            name: "year",
            label: "Year",
            type: "input",
            placeholder: `${currentYear + 1}`,
            maxLength: 4,
            showIf: (theme) => theme === "newyear",
        },

        // Base fields
        {
            name: "host", label: "Host", type: "input", placeholder: "Joy Johnson", minLength: 1, maxLength: 30
        },
        {
            name: "invitee", label: "Invitee", type: "input", placeholder: "Friends & Family", minLength: 1, maxLength: 30
        },
        {
            name: "date", label: "Date", type: "input", placeholder: "June 12, 2026", minLength: 1, maxLength: 15
        },
        {
            name: "time", label: "Time", type: "input", placeholder: "6:00 PM", minLength: 1, maxLength: 15
        },
        {
            name: "location", label: "Location", type: "input", placeholder: "123 Sunset Blvd", minLength: 1, maxLength: 50
        },
        {
            name: "food", label: "Food", type: "input", placeholder: "Dinner, snacks, and drinks (Optional)"
        },
        {
            name: "activities", label: "Activities", type: "input", placeholder: "Games, music", minLength: 1, maxLength: 30
        },
        {
            name: "rsvp", label: "RSVP Link", type: "input", placeholder: "https://your-own-or-facebook-link-example.com", minLength: 1, maxLength: 100
        },
        {
            name: "banner", label: "Banner Link", type: "input", placeholder: "https://your-own-banner-link-example.com/banner.png (Optional)", minLength: 1, maxLength: 100
        },

        // Message
        {
            name: "message",
            label: "Message",
            type: "textarea",
            placeholder: "Add a personal note",
            minLength: 30,
            maxLength: 200,
        },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="maxLength-w-xl flex flex-col">
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
                        />
                    );
                }

                return null;
            })}

            <Button type="submit" disabled={isSubmitting} className={primaryButtonStyle}>{isSubmitting ? "Generating..." : "Generate & Download"}</Button>
        </form>
    );
}