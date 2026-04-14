type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: InputProps) => {
    return (
        <input
            className={`border rounded px-3 py-2 text-sm w-full ${className}`}
            {...props} />
    );
};