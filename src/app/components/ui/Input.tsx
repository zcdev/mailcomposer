type InputProps = {
    label: string;
    error?: string;
    id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, error, id, ...props }: InputProps) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>

            <input
                id={id}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                {...props}
            />

            {error && (
                <p id={`${id}-error`} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}