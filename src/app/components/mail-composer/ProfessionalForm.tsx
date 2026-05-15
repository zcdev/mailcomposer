'use client';
import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfessionalInput } from "@/types/";
import { professionalFormSchema } from "@/lib/validation/professionalFormSchema";
import { submitForm } from "@/lib/services/submit";
import { primaryButtonStyle } from '@/components/ui';
import Input from '../ui/Input';
import TextArea from "../ui/TextArea";
import Button from '../ui/Button';
import Select from "../ui/Select";
import { fields } from "@/lib/data/professional-input";
import { toast } from 'sonner';

export default function ProfessionalForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfessionalInput>({
        resolver: zodResolver(professionalFormSchema),
    });

    const COOLDOWN_MS = 15000;

    const [cooldownUntil, setCooldownUntil] = useState<number>(0);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const cooldownSeconds = Math.ceil(cooldownUntil / 1000);

    const themeOption = useWatch({ control, name: "theme" });
    const messageValue = useWatch({ control, name: "message" });
    const disClaimerValue = useWatch({ control, name: "disclaimers" });

    const onSubmit = async (data: ProfessionalInput): Promise<void> => {
        const result = await submitForm(data);
        result.success
            ? toast.success(result.message, {
                duration: 5000,
            })
            : toast.error(result.message, {
                duration: 5000,
            });

        if (cooldownUntil > 0) {
            toast.error(`Please wait ${cooldownSeconds}s`);
            return;
        }

        if (result.success) {
            setIsSubmitted(true);
            setCooldownUntil(COOLDOWN_MS);
        }
    };

    useEffect(() => {
        if (!isSubmitted) return;

        const coolDownClock = setInterval(() => {

            setCooldownUntil(prev => {

                if (prev <= 1000) {
                    clearInterval(coolDownClock);
                    setIsSubmitted(false);
                    return 0;
                }

                return prev - 1000;
            });

        }, 1000);

        return () => clearInterval(coolDownClock);
    }, [isSubmitted]);

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
                            disclaimerCharCount={disClaimerValue?.length ?? 0}
                        />
                    );
                }

                return null;
            })}

            <Button type="submit"
                disabled={isSubmitted && cooldownUntil > 0} className={primaryButtonStyle}>
                {isSubmitting
                    ? "Generating..."
                    : (isSubmitted && cooldownUntil > 0)
                        ? `Wait ${cooldownUntil / 1000}s`
                        : "Generate & Download"}</Button>
        </form>
    );
}