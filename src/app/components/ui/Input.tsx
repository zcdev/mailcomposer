type InputProps = {
    label: string;
    error?: string;
    id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, error, id, ...props }: InputProps) {
    return (
        <div>
            <label htmlFor={id} className="primary-color font-semibold block pt-4">{label}</label>

            <input
                id={id}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                {...props}
                className="w-full border border-black dark:border-white rounded-lg p-2"
            />

            {error && (
                <p id={`${id}-error`} role="alert" className="text-orange-500">
                    {error}
                </p>
            )}
        </div>
    );
}