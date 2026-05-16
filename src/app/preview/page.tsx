"use client";

import { useEffect, useState } from "react";

export default function PreviewPage() {
    const [html, setHtml] = useState("");

    useEffect(() => {
        const savedHtml = localStorage.getItem("previewHtml");

        if (savedHtml) {
            setHtml(savedHtml);
        }
    }, []);

    return (
        <iframe
            srcDoc={html}
            className="w-full h-screen border-0"
        />
    );
}