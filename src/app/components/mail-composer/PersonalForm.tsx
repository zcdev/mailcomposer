'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalFormSchema } from "../../lib/validation/personalFormSchema";
import { promptAI } from '../../lib/prompt/promptAI';
import { personalFormData } from '../../lib/prompt/personalFormData';
import { downloadZip } from '../../lib/generate/downloadZip';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { z } from 'zod';

export default function PersonalForm() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(personalFormSchema),
    });

    const theme = watch("theme");
    const message = watch("message");

    const onSubmit = async (data: z.infer<typeof personalFormSchema>) => {
        try {
            const promptData = personalFormData(data);
            console.log("promptData", promptData);

            const aiResponseData = await promptAI(promptData);
            console.log("AI responded Data", aiResponseData.result);

            await downloadZip(aiResponseData.result, data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl flex-col">
            {/* Theme */}
            <label htmlFor="theme" className="primary-color font-semibold block pt-4">Theme</label>
            <select id="theme" {...register("theme")} className="w-full border border-black dark:border-white rounded-lg p-2">
                <option value="">Select a theme for the event</option>
                <option value="birthday">Birthday</option>
                <option value="graduation">Graduation</option>
                <option value="wedding">Wedding</option>
                <option value="newyear">New Year</option>
            </select>
            {errors?.theme && <p className="text-orange-500">{errors.theme?.message}</p>}

            {theme !== "" && (
                <>
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

                    {theme === "newyear" && (
                        <Input
                            label="Year"
                            id="year"
                            placeholder={`${new Date().getFullYear() + 1}`}
                            {...register("year")}
                            error={errors.year?.message}
                        />
                    )}

                    {/* Basic fields */}
                    <Input label="Host" id="host" placeholder="Joy Johnson"
                        {...register("host")} error={errors.host?.message} />
                    <Input label="Invitee" id="invitee" placeholder="Friends & Family"
                        {...register("invitee")} error={errors.invitee?.message} />
                    <Input label="Date" id="date" placeholder="June 12, 2026"
                        {...register("date")} error={errors.date?.message} />
                    <Input label="Time" id="time" placeholder="6:00 PM"
                        {...register("time")} error={errors.time?.message} />
                    <Input label="Location" id="location" placeholder="123 Sunset Blvd, Los Angeles"
                        {...register("location")} error={errors.location?.message} />
                    <Input label="Food" id="food" placeholder="Dinner, snacks, and drinks (Optional)"
                        {...register("food")} error={errors.food?.message} />
                    <Input label="Activities" id="activities" placeholder="Games, dancing, and live music"
                        {...register("activities")} error={errors.activities?.message} />

                    {/* vibe */}
                    <label htmlFor="vibe" className="primary-color font-semibold block pt-4">Vibe</label>
                    <select id="vibe" {...register("vibe")} className="block w-full border border-black dark:border-white rounded-lg p-2">
                        <option value="">Select a vibe for the event</option>
                        <option value="formal">Formal</option>
                        <option value="friendly">Friendly</option>
                        <option value="playful">Playful</option>
                    </select>
                    {errors.vibe && <p className="text-orange-500">{errors.vibe.message}</p>}

                    <label htmlFor="message" className="primary-color font-semibold block pt-4">Message</label>
                    <textarea
                        id="message"
                        maxLength={200}
                        placeholder="Add a personal note"
                        {...register("message")}
                        className={`block w-full border border-black dark:border-white rounded-lg p-2 ${errors.message} ? focus:outline-2 focus:outline-orange-500: ""`}
                    />

                    <p className={errors.message ? "text-orange-500" : ""}>({message?.length ?? 0}/200) Characters<br />{errors.message?.message}</p>

                    <Input label="RSVP Link" id="rsvp" placeholder="https://your-own-or-facebook-link-example.com"
                        {...register("rsvp")} error={errors.rsvp?.message} />

                    <Input label="Banner Link" id="banner" placeholder="https://your-own-banner-link-example.com/banner.png (Optional)"
                        {...register("rsvp")} error={errors.banner?.message} />

                    <Button type="submit" disabled={isSubmitting} className="primary-button inline-flex items-center justify-center px-6 py-3 mt-4 mr-8 text-lg text-white font-semibold rounded-lg hover:opacity-80 transition">{isSubmitting ? "Generating..." : "Generate & Download"}</Button>
                </>)}
        </form>
    );
}