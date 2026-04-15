type MJMLResponse = {
    result: string;
    error?: string;
};

export async function getTemplateData(input: string): Promise<MJMLResponse> {
    const response = await fetch("/api/compose", {
        method: "POST",
        headers: { "Content-Type": "text/html" },
        body: JSON.stringify({ input })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.error || 'Request failed.');
    }

    return data; // for compileMJML() to receive
}