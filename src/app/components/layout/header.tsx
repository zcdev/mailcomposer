import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <Link href="/" className="dark:bg-white inline-block rounded-lg">
                <Image className="flex-inline" src="/assets/mailcomposer-logo.svg" alt="MailComposer logo" width="200" height="96" loading="eager" />
            </Link>
        </header>
    );
}