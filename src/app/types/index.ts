export * from './personal';
export * from './professional';

import { PersonalInput, ProfessionalInput } from "@/types";

export type FieldConfig<T> = {
    name: keyof T;
    label: string;
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
    value?: string;
    type?: "input" | "textarea" | "select";
    options?: { label: string; value: string; }[];
    showIf?: (theme: PersonalInput["theme"] | ProfessionalInput["theme"]) => boolean;
};

export type ThemeBase = {
    subject: string;
    emailBody: string;
    logo: string;
    color: string;
    currentYear: string;
    formData: ProfessionalInput;
}