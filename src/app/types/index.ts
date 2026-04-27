export * from './personal';
export * from './professional';

export type FieldConfig<T> = {
    name: keyof T;
    label: string;
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
    value?: string;
    type?: "input" | "textarea" | "select";
    options?: { label: string; value: string; }[];
    showIf?: (values: T) => boolean;
};