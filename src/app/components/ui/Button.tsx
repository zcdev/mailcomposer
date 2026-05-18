type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, ...props }: ButtonProps) {
    return (
        <button {...props} className={`mt-6 ${className ?? ""}`}>{children}</button>
    );
};