"use client";

import { useEffect, useState } from "react";
import Wrapper from '@/components/layout/wrapper';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PreviewPage() {
    const [html, setHtml] = useState("");

    useEffect(() => {
        const savedHtml = localStorage.getItem("previewHtml");

        if (savedHtml) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHtml(savedHtml);
        }
    }, []);

    return (
        <Wrapper>
            <main className="max-w-6xl bg-white dark:bg-black px-4 py-6 md:p-6 rounded-lg border border-black dark:border-white">
                <Header />
                <section>
                    <h1 className="text-xl md:text-2xl text-center mb-4">Email Preview:</h1>
                    <iframe
                        srcDoc={html}
                        className="w-full h-screen border-0"
                    />
                </section>
            </main>
            <Footer />
        </Wrapper>
    );
}