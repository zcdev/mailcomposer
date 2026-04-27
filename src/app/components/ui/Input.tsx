type InputProps = {
    label: string;
    error?: string;
    name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, error, name, ...props }: InputProps) {
    return (
        <div>
            <label htmlFor={name} className="primary-color font-semibold block pt-4">{label}</label>

            <input
                name={name}
                aria-invalname={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                {...props}
                className="w-full border border-black dark:border-white rounded-lg p-2"
            />

            {error && (
                <p id={`${name}-error`} role="alert" className="text-orange-500">
                    {error}
                </p>
            )}
        </div>
    );
}