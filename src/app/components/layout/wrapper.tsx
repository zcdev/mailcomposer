type DivProps = React.HTMLAttributes<HTMLDivElement>;

export default function Wrapper({ children }: DivProps) {
    return (
        <div className="flex w-full min-h-full items-center justify-center bg-slate-100 p-6">
            <div className="flex-col w-full max-w-6xl">
                {children}
            </div>
        </div>
    );
}