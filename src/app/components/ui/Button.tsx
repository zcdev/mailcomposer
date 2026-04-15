type ButtonProps = {
    className: string;
    onClick: () => void;
};

export const Button = ({ className, onClick, ...props }: ButtonProps) => {
    return (
        <button></button>
    );
};