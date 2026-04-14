// lib/prompt.ts (fetch for frontend consumption)
type AIResponse = {
    result: string;
    error?: string;
};

export async function fetchAI(message: string): Promise<AIResponse> {
    const response = await fetch("/api/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error || 'Request failed.');
    }

    return data;
}
