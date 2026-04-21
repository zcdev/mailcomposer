'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../lib/validation/formSchema";
import { promptAI } from '../../lib/prompt/promptAI';
import { parseFormData } from '../../lib/prompt/parseFormData';
import { downloadZip } from '../../lib/generate/downloadZip';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { z } from 'zod';

export default function MailComposerForm() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const theme = watch("theme");
    const message = watch("message") ?? "";

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const promptData = parseFormData(data);
            console.log("promptData", promptData);

            const aiResponseData = await promptAI(promptData);
            console.log("AI responded Data", aiResponseData.result);

            await downloadZip(aiResponseData.result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            {/* Theme */}
            <label htmlFor="theme">Theme</label>
            <select id="theme" {...register("theme")}>
                <option value="">Select a theme for the event:</option>
                <option value="birthday">Birthday</option>
                <option value="graduation">Graduation</option>
                <option value="wedding">Wedding</option>
                <option value="newYear">New Year</option>
            </select>
            {errors?.theme && <p className="text-orange-500">{errors.theme?.message}</p>}

            {theme === "birthday" && (
                <Input
                    label="Age"
                    id="age"
                    placeholder="20"
                    {...register("age")}
                    error={errors.age?.message}
                />
            )}

            {theme === "graduation" && (
                <Input
                    label="Year of Class"
                    id="classYear"
                    placeholder={`${new Date().getFullYear()}`}
                    {...register("classYear")}
                    error={errors.classYear?.message}
                />
            )}

            {theme === "newYear" && (
                <Input
                    label="Year"
                    id="year"
                    placeholder={`${new Date().getFullYear() + 1}`}
                    {...register("year")}
                    error={errors.year?.message}
                />
            )}

            {/* Basic fields */}
            <Input label="Host" id="host" placeholder="Alex Johnson"
                {...register("host")} error={errors.host?.message} />
            <Input label="Invitee" id="invitee" placeholder="Friends & Family"
                {...register("invitee")} error={errors.invitee?.message} />
            <Input label="Date" id="date" placeholder="June 12, 2026"
                {...register("date")} error={errors.date?.message} />
            <Input label="Time" id="time" placeholder="6:00 PM"
                {...register("time")} error={errors.time?.message} />
            <Input label="Location" id="location" placeholder="123 Sunset Blvd, Los Angeles"
                {...register("location")} error={errors.location?.message} />
            <Input label="Food" id="food" placeholder="Dinner, snacks, and drinks (optional)"
                {...register("food")} error={errors.food?.message} />
            <Input label="Activities" id="activities" placeholder="Games, dancing, and live music"
                {...register("activities")} error={errors.activities?.message} />

            {/* vibe */}
            <label htmlFor="vibe">Vibe</label>
            <select id="vibe" {...register("vibe")}>
                <option value="">Select a vibe for the event:</option>
                <option value="formal">Formal</option>
                <option value="friendly">Friendly</option>
                <option value="playful">Playful</option>
            </select>
            {errors.vibe && <p className="text-orange-500">{errors.vibe.message}</p>}

            <textarea
                id="message"
                maxLength={100}
                placeholder="Add a personal note"
                {...register("message")}
                className={errors.message ? "focus:outline-2 focus:outline-orange-500" : ""}
            />

            <p className={errors.message ? "text-orange-500" : ""}>({message?.length ?? 0}/100) Characters<br />{errors.message?.message}</p>

            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Generating..." : "Generate & Download"}</Button>
        </form>
    );
}