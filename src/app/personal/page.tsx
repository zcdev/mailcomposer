'use client';

import PersonalForm from "../components/mail-composer/PersonalForm";
import Wrapper from '@/components/layout/wrapper';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PersonalPage() {
    return (
        <Wrapper>
            <main className="bg-white dark:bg-black p-6 rounded-lg border border-black dark:border-white">
                <Header />
                <section className="p-2">
                    <h1 className="text-2xl mt-8">Personal Email Template</h1>
                    <PersonalForm />
                </section>
            </main>
            <Footer />
        </Wrapper>
    );
}