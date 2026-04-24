'use client';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, ...props }: ButtonProps) {
    return (
        <button {...props} className={`btn ${className ?? ""}`}>{children}</button>
    );
};