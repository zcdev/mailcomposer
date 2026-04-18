type MJMLResponse = {
    result: string;
    error?: string;
};

export async function getTemplateData(input: string): Promise<string> {
    const response = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
    });

    if (!response.ok) {
        throw new Error("Request failed.");
    }

    return await response.text();
}