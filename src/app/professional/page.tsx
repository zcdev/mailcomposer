'use client';

import ProfessionalForm from "../components/mail-composer/ProfessionalForm";
import Wrapper from '@/src/app/components/layout/wrapper';
import Header from '@/src/app/components/layout/header';
import Footer from '@/src/app/components/layout/footer';

export default function ProfessionalPage() {
    return (
        <Wrapper>
            <main className="bg-white dark:bg-black p-6 rounded-lg border border-black dark:border-white">
                <Header />
                <section className="p-2">
                    <h1 className="text-2xl mt-8">Professional (B2C) Email Template</h1>
                    <ProfessionalForm />
                </section>
            </main>
            <Footer />
        </Wrapper>
    );
}