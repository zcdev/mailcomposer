'use client';
import { useState } from 'react';
import { promptAI } from '../../lib/prompt/promptAI';
import { parseFormData } from '../../lib/prompt/parseFormData';
import { getTemplateData } from '../../lib/generate/getTemplateData';

type EventTheme = "birthday" | "graduation" | "wedding" | "newYear";
type Vibe = "formal" | "friendly" | "playful";

export default function MailComposerForm() {
    const [formData, setFormData] = useState({
        theme: "birthday" as EventTheme,
        host: "",
        invitee: "",
        date: "",
        time: "",
        location: "",
        vibe: "friendly" as Vibe,
        message: "",
        details: {
            age: undefined as number | undefined,
            classYear: undefined as number | undefined,
            year: new Date().getFullYear(),
        },
    });

    function handleSelectChange(
        e: React.ChangeEvent<HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            details: {
                ...prev.details,
                [name]: value ? Number(value) : undefined,
            },
        }));
    }

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        console.log("FORM DATA 👉", formData);
        try {
            const prompt = parseFormData(formData);
            const data = await promptAI(prompt);
            await getTemplateData(data.result);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Theme */}
            <select name="theme" value={formData.theme} onChange={handleSelectChange}>
                <option value="birthday">Birthday</option>
                <option value="graduation">Graduation</option>
                <option value="wedding">Wedding</option>
                <option value="newYear">New Year</option>
            </select>

            {/* Basic fields */}
            <input name="host" placeholder="Host" onChange={handleInputChange} />
            <input name="invitee" placeholder="Invitees" onChange={handleInputChange} />
            <input name="date" placeholder="Date" onChange={handleInputChange} />
            <input name="time" placeholder="Time" onChange={handleInputChange} />
            <input name="location" placeholder="Location" onChange={handleInputChange} />

            {/* vibe */}
            <select name="vibe" value={formData.vibe} onChange={handleSelectChange}>
                <option value="formal">Formal</option>
                <option value="friendly">Friendly</option>
                <option value="playful">Playful</option>
            </select>

            {/* Conditional fields */}
            {formData.theme === "birthday" && (
                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    onChange={handleInputChange}
                />
            )}

            {/* Placeholder */}
            {formData.theme === "graduation" && (
                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    onChange={handleInputChange}
                />
            )}

            {/* Placeholder */}
            {formData.theme === "wedding" && (
                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    onChange={handleInputChange}
                />
            )}

            {/* Placeholder */}
            {formData.theme === "newYear" && (
                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    onChange={handleInputChange}
                />
            )}

            {/* Message */}
            <input
                name="message"
                placeholder="Add a personal note"
                onChange={handleInputChange}
            />

            <button type="submit">Generate</button>
        </form>
    );

}