type SelectProps = {
    label: string;
    error?: string;
    name: string;
    options?: {
        label: string;
        value: string;
    }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ label, error, name, options, ...props }: SelectProps) {
    return (
        <div>
            <label htmlFor={name} className="primary-color font-semibold block pt-4">{label}</label>

            <select name={name} {...props} className="block w-full border border-black dark:border-white rounded-lg p-2">
                {options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {error && (
                <p id={`${name}-error`} role="alert" className="text-orange-500">
                    {error}
                </p>
            )}
        </div>
    );
}