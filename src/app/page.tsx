'use client';
import { useState } from "react";
import { fetchAI } from "./lib/prompt/buildPrompt";
import GenerateTemplate from "./components/mail-composer/GenerateTemplate";

export default function Home() {
  const [result, setResult] = useState<string>('');
  const [template, setTemplate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    try {
      const data = await fetchAI("Hi");
      setResult(data.result);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>MailComposer</h1>
        <p>Compose email templates with AI—ready when you are.</p>
        <p>AI says: {result}</p>
        <button onClick={handleClick} className="p-10 font-bold border-1">
          click to Test
        </button>
        <GenerateTemplate />
      </main>
    </div>
  );
}
