export default function Footer() {
    return (
        <footer className="text-olive-500 dark:text-olive-200 pt-4 pb-20 text-center">
            © {new Date().getFullYear()} MailComposer
        </footer>
    );
}