import Link from 'next/link';

type AnchorProps = { href: string; } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Anchor({ className, href, ...props }: AnchorProps) {
    return (
        <Link href={href} className={className} {...props} />
    );
}