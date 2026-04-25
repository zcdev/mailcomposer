'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { professionalFormSchema } from "../../lib/validation/professionalFormSchema";
import { promptAI } from '../../lib/prompt/promptAI';
import { professionalFormData } from '../../lib/prompt/professionalFormData';
import { downloadZip } from '../../lib/generate/downloadZip';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { z } from 'zod';

export default function ProfessionalForm() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(professionalFormSchema),
    });

    const theme = watch("theme");
    const message = watch("message");
    const disclaimer = watch("disclaimer");

    const onSubmit = async (data: z.infer<typeof professionalFormSchema>) => {
        try {
            const promptData = professionalFormData(data);
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
            {/* theme */}
            <label htmlFor="theme" className="primary-color font-semibold block pt-4">Theme</label>
            <select id="theme" {...register("theme")} className="w-full border border-black rounded-lg p-2">
                <option value="">Select the theme of your email</option>
                <option value="announcement">Announcement (Company News, Updates, Product Launch)</option>
                <option value="promotion">Promotion (Discount, Offer, Limited-time deal)</option>
                <option value="invite">Event Invitation (Seminar, Workshop, Meetup)</option>
                <option value="relation">Customer Relationship (Welcome, Follow-up, Check-in, Outreach)</option>
            </select>
            {errors?.theme && <p className="text-orange-500">{errors.theme?.message}</p>}
            {theme !== "" && (
                <>
                    {theme === "promotion" && (
                        <Input
                            label="Promo Code"
                            id="code"
                            placeholder="OFF20SOFTWARE"
                            {...register("code")}
                            error={errors.code?.message}
                        />
                    )}

                    {/* Basic fields */}
                    <Input label="Business Name" id="business" placeholder="Hybridger, Inc."
                        {...register("business")} error={errors.business?.message} />
                    <Input label="Business Address" id="address" placeholder="1st Main Street, Hybrid City, CA 99999"
                        {...register("address")} error={errors.address?.message} />
                    <Input label="Business Website" id="websute" placeholder="https://www.your-company.com"
                        {...register("website")} error={errors.website?.message} />
                    <Input label="Customer Name" id="customer" placeholder="Joy Johnson"
                        {...register("customer")} error={errors.customer?.message} />

                    {(theme === "announcement" || theme === "relation") && (
                        <Input label="Purpose" id="purpose" placeholder="What is this about?"
                            {...register("purpose")} error={errors.purpose?.message} />
                    )}

                    {theme === "promotion" && (
                        <Input label="Promotional Item" id="purpose" placeholder="Hybridger AI Software Suite"
                            {...register("purpose")} error={errors.purpose?.message} />
                    )}

                    {theme === "invite" && (
                        <Input label="Topic" id="purpose" placeholder="AI Coding Workshop"
                            {...register("purpose")} error={errors.purpose?.message} />
                    )}

                    {theme === "promotion" || theme === "invite" && (
                        <>
                            <Input label="Start Date & Time" id="start" placeholder="When does it start?"
                                {...register("start")} error={errors.start?.message} />
                            <Input label="End Date & Time" id="end" placeholder="When does it end?"
                                {...register("end")} error={errors.end?.message} />
                        </>
                    )}

                    {theme === "invite" && (
                        <Input label="Location" id="location" placeholder="Where?"
                            {...register("location")} error={errors.location?.message} />
                    )}

                    {/* Message */}
                    <label htmlFor="message" className="primary-color font-semibold block pt-4">Message</label>

                    <textarea
                        id="message"
                        maxLength={500}
                        placeholder="Enter additional required important information"
                        {...register("message")}
                        className={`block w-full border border-black rounded-lg p-2 ${errors.message} ? focus:outline-2 focus:outline-orange-500: ""`}
                    />

                    <p className={errors.message ? "text-orange-500" : ""}>({message?.length ?? 0}/500) Characters<br />{errors.message?.message}</p>

                    {/* Disclaimer */}
                    <label htmlFor="disclaimer" className="primary-color font-semibold block pt-4">Disclaimer</label>

                    <textarea
                        id="disclaimer"
                        maxLength={200}
                        placeholder="Add disclaimer (Optional)"
                        {...register("disclaimer")}
                        className={`block w-full border border-black rounded-lg p-2 ${errors.disclaimer} ? focus:outline-2 focus:outline-orange-500: ""`}
                    />

                    <p className={errors.disclaimer ? "text-orange-500" : ""}>({disclaimer?.length ?? 0}/200) Characters<br />{errors.disclaimer?.message}</p>

                    {/* Unsubscribe Link */}
                    <Input label="Unsubscribe Link" id="unsub" placeholder="https://your-company.com/unsubscribe"
                        {...register("unsub")} error={errors.unsub?.message} />

                    {/* For templating */}
                    <Input label="Brand Color" id="color" placeholder="#ff0000 (Optional)"
                        {...register("color")} error={errors.color?.message} />
                    <Input label="Logo Link" id="logo" placeholder="https://your-company.com/logo.png (Optional)"
                        {...register("logo")} error={errors.logo?.message} />

                    {/* Note: Button Text & Link are dependent */}
                    <Input label="Button Text" id="text" placeholder="Join now (Optional)"
                        {...register("text")} error={errors.text?.message} />
                    <Input label="Button Link" id="cta" placeholder="https://your-company.com/landing-page (Optional)"
                        {...register("cta")} error={errors.cta?.message} />

                    <Button type="submit" disabled={isSubmitting} className="primary-button inline-flex items-center justify-center px-6 py-3 mt-4 mr-8 text-lg text-white font-semibold rounded-lg hover:opacity-80 transition">{isSubmitting ? "Generating..." : "Generate & Download"}</Button>
                </>)}
        </form>
    );
}