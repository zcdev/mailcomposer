import Link from 'next/link';

export default function Content() {
    return (
        <section className="p-2">
            <h1 className="text-2xl mt-8">Turn what you wanted to say into ready-to-send emails:</h1>
            <ol className="text-xl my-8">
                <li>Select a template</li>
                <li>Enter a few details</li>
                <li>Let AI generate</li>
                <li>Download your file</li>
                <li>Copy, paste, and send it</li>
            </ol>
            <p className="text-xl mb-4">Pick a style, fill it in, and let AI do the rest—then just grab and go.</p>
            <Link href="/professional" className="primary-button inline-flex items-center justify-center px-6 py-3 mt-4 mr-8 text-lg text-white font-semibold rounded-lg hover:opacity-80 transition">Professional</Link>
            <Link href="/personal" className="primary-button inline-flex items-center justify-center px-6 py-3 mt-4 text-lg text-white font-semibold rounded-lg hover:opacity-80 transition">Personal</Link>
        </section>
    );

}