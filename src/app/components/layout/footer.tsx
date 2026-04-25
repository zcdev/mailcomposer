export default function Footer() {
    return (
        <footer className="text-olive-500 dark:text-olive-200 py-8 text-center">
            © {new Date().getFullYear()} MailComposer
        </footer>
    );
}