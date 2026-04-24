import Image from 'next/image';

export default function Header() {
    return (
        <header>
            <Image className="flex-inline" src="/assets/mailcomposer-logo.svg" alt="MailComposer logo" width="200" height="96" loading="eager" />
        </header>
    );
}