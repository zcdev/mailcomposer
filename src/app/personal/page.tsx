'use client';

import PersonalForm from "../components/mail-composer/PersonalForm";
import Wrapper from '@/components/layout/wrapper';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "sonner";

export default function PersonalPage() {
    return (
        <Wrapper>
            <main className="bg-white dark:bg-black px-4 py-6 md:p-6 rounded-lg border border-black dark:border-white">
                <Header />
                <section className="p-2">
                    <h1 className="text-2xl mt-8">Personal Email Template</h1>
                    <PersonalForm />
                    <Toaster position="bottom-center" />
                </section>
            </main>
            <Footer />
        </Wrapper>
    );
}