type DivProps = React.HTMLAttributes<HTMLDivElement>;

export default function Wrapper({ children }: DivProps) {
    return (
        <div className="flex w-full min-h-full items-center justify-center pt-10">
            <div className="w-full max-w-6xl">
                {children}
            </div>
        </div>
    );
}