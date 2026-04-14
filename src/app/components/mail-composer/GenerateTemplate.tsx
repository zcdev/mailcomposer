'use client';

export default function GenerateTemplate() {
    const generateHTML = async () => {
        await fetch("/api/generate-email", {
            method: "POST",
            headers: {
                'Content-Type': 'text/html',
            },
            body: JSON.stringify({
                input: "Hey there, welcome aboard 🚀"
            }),
        });
    };

    return (
        <div>
            <button onClick={generateHTML} className="p-10 font-bold border-1">
                Generate Email
            </button>
        </div>
    );
}