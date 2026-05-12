'use client';

import ProfessionalForm from "../components/mail-composer/ProfessionalForm";
import Wrapper from '@/components/layout/wrapper';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "sonner";

export default function ProfessionalPage() {
    return (
        <Wrapper>
            <main className="bg-white dark:bg-black p-6 rounded-lg border border-black dark:border-white">
                <Header />
                <section className="p-2">
                    <h1 className="text-2xl mt-8">Professional (B2C) Email Template</h1>
                    <ProfessionalForm />
                    <Toaster position="bottom-center" />
                </section>
            </main>
            <Footer />
        </Wrapper>
    );
}