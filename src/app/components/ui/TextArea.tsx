type TextAreaProps = {
    label: string;
    error?: string;
    name: string;
    charCount?: number;
    minLength?: number;
    maxLength?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ label, error, name, charCount, maxLength, minLength, ...props }: TextAreaProps) {
    return (
        <div>
            <label htmlFor={name} className="primary-color font-semibold block pt-4">{label}</label>

            <textarea
                name={name}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                {...props}
                className={`block w-full border border-black dark:border-white rounded-lg p-2 ${error ? "focus:outline-2 focus:outline-orange-500 border border-orange-500" : ""}`}
                minLength={minLength}
                maxLength={maxLength}
            />

            <p className={error ? "text-orange-500" : ""}>{charCount}/{maxLength} Characters</p>

            {error && (
                <p id={`${name}-error`} role="alert" className="text-orange-500">
                    {error}
                </p>
            )}
        </div>
    );
}