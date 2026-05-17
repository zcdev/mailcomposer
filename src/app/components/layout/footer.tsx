import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full text-sm text-olive-600 dark:text-olive-200 pt-4 pb-20 px-4 text-center">
            <p className="pt-4">Do not submit confidential, regulated, or sensitive information unless your organization has approved AI processing workflows.</p>
            <p className="pt-4">By using AI features, you agree to our <Link href="/privacy" className="underline">Privacy & AI Processing Policy</Link>.</p>
            <p className="pt-4">
                © {new Date().getFullYear()} MailComposer
            </p>
        </footer>
    );
}