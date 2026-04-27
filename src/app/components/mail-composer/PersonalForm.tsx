'use client';
import { useForm } from "react-hook-form";
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
        watch,
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

    const values = watch();

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
            maxLength: 3,
            showIf: (values) => values.theme === "birthday",
        },
        {
            name: "classYear",
            label: "Class Year",
            type: "input",
            maxLength: 4,
            showIf: (values) => values.theme === "graduation",
        },
        {
            name: "year",
            label: "Year",
            type: "input",
            maxLength: 4,
            showIf: (values) => values.theme === "newyear",
        },

        // Base fields
        { name: "host", label: "Host", type: "input", placeholder: "Joy Johnson", minLength: 1, maxLength: 30 },
        { name: "invitee", label: "Invitee", type: "input", placeholder: "Friends & Family", minLength: 1, maxLength: 30 },
        { name: "date", label: "Date", type: "input", placeholder: "June 12, 2026", minLength: 1, maxLength: 15 },
        { name: "time", label: "Time", type: "input", placeholder: "6:00 PM", minLength: 1, maxLength: 15 },
        { name: "location", label: "Location", type: "input", placeholder: "123 Sunset Blvd", minLength: 1, maxLength: 50 },
        { name: "food", label: "Food", type: "input", placeholder: "Optional" },
        { name: "activities", label: "Activities", type: "input", placeholder: "Games, music", minLength: 1, maxLength: 30 },

        // Message
        {
            name: "message",
            label: "Message",
            type: "textarea",
            placeholder: "Add a personal note",
            minLength: 1,
            maxLength: 200,
        },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="maxLength-w-xl flex-col">
            {fields.map((field) => {

                if (field.showIf && !field.showIf(values)) return null;

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
                            value={field.value}
                            minLength={field.minLength}
                            maxLength={field.maxLength}
                            error={errors[field.name]?.message}
                            charCount={values[field.name]?.length ?? 0}
                        />
                    );
                }
            })}

            <Button type="submit" disabled={isSubmitting} className={primaryButtonStyle}>{isSubmitting ? "Generating..." : "Generate & Download"}</Button>
        </form>
    );
}