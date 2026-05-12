'use client';
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInput } from '@/types';
import { personalFormSchema } from "@/lib/validation/personalFormSchema";
import { primaryButtonStyle } from '@/components/ui';
import Input from '../ui/Input';
import TextArea from "../ui/TextArea";
import Button from '../ui/Button';
import Select from "../ui/Select";
import { submitForm } from "@/lib/services/submit";
import { fields } from "@/lib/data/personal-input";

export default function PersonalForm() {
    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<PersonalInput>({
        resolver: zodResolver(personalFormSchema),
    });

    const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);

    const themeOption = useWatch({ control, name: "theme" });
    const messageValue = useWatch({ control, name: "message" });

    const onSubmit = async (data: PersonalInput): Promise<void> => {
        const result = await submitForm(data);

        if (!result.success) {
            setError("root", {
                type: "manual",
                message: result.message,
            });
        }
        return;
    };

    const onError = (err: any) => console.log("ERROR", err);

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="max-w-xl flex flex-col">
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