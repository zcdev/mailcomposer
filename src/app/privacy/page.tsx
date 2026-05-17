import Link from "next/link";

import Wrapper from '@/components/layout/wrapper';
import Header from '@/components/layout/header';

export default function PrivacyPage() {
    return (
        <Wrapper>
            <main className="bg-white dark:bg-black p-6 rounded-lg border border-black dark:border-white">
                <Header />
                <section className="p-2">
                    <h1 className="text-2xl mt-8">Privacy & AI Processing</h1>
                    <p className="pt-4">
                        MailComposer uses AI services to help generate, refine, and process email templates and related content.
                    </p>
                    <p className="pt-4">
                        When using AI-powered features, the content you submit may be securely transmitted to third-party AI providers, including GPT-based services, for inference and content generation.
                    </p>
                    <p className="pt-4">
                        We do not use your submitted content to train our own AI models. <Link href="https://developers.openai.com/api/docs/guides/your-data" className="underline" target="_blank">OpenAI API services</Link> used by MailComposer are configured under standard API data policies, where submitted API data is not used to train public models.
                    </p>
                    <p className="pt-4">
                        Data may be temporarily retained by AI providers for security, abuse prevention, and operational monitoring purposes.
                    </p>
                    <p className="pt-4">
                        Please avoid submitting highly sensitive, confidential, or regulated information unless approved by your organization or applicable policies.
                    </p>
                    <p className="pt-4">
                        By using MailComposer’s AI features, you acknowledge and agree to this processing.
                    </p>
                </section>
            </main>
            <footer className="text-olive-500 dark:text-olive-200 pt-4 pb-20 text-center">
                <p className="pt-4">
                    © {new Date().getFullYear()} MailComposer
                </p>
            </footer>
        </Wrapper>
    );
}