'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "../../lib/validation/formSchema";
import { promptAI } from '../../lib/prompt/promptAI';
import { parseFormData } from '../../lib/prompt/parseFormData';
import { downloadZip } from '../../lib/generate/downloadZip';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function MailComposerForm() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const theme = watch("theme");
    const message = watch("message");

    const onSubmit = async (data: FormValues) => {
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
                <option value="">Select event theme</option>
                <option value="birthday">Birthday</option>
                <option value="graduation">Graduation</option>
                <option value="wedding">Wedding</option>
                <option value="newYear">New Year</option>
            </select>

            {/* Basic fields */}
            <Input label="Host" id="host" placeholder="Host" {...register("host")} />
            {errors.host && <p>{errors.host.message}</p>}
            <Input label="Invitee" id="invitee" placeholder="Invitee" {...register("invitee")} />
            {errors.invitee && <p>{errors.invitee.message}</p>}
            <Input label="Date" id="date" placeholder="Date" {...register("date")} />
            {errors.date && <p>{errors.date.message}</p>}
            <Input label="Time" id="time" placeholder="Time" {...register("time")} />
            {errors.time && <p>{errors.time.message}</p>}
            <Input label="Location" id="location" placeholder="Location" {...register("location")} />
            {errors.location && <p>{errors.location.message}</p>}
            <Input label="Food" id="food" placeholder="Food" {...register("food")} />
            {errors.food && <p>{errors.food.message}</p>}
            <Input label="Activities" id="activities" placeholder="Activities" {...register("activities")} />
            {errors.activities && <p>{errors.activities.message}</p>}

            {/* vibe */}
            <label htmlFor="vibe">Vibe</label>
            <select id="vibe" {...register("vibe")} >
                <option value="">Select event vibe</option>
                <option value="formal">Formal</option>
                <option value="friendly">Friendly</option>
                <option value="playful">Playful</option>
            </select>

            {theme === "birthday" && (
                <Input
                    label="Age"
                    id="age"
                    placeholder="Age"
                    {...register("age")}
                />
            )}

            {theme === "graduation" && (
                <Input
                    label="Year of Class"
                    id="classYear"
                    placeholder="Year of Class"
                    {...register("classYear")}
                />
            )}

            {theme === "newYear" && (
                <Input
                    label="Year"
                    id="year"
                    placeholder="Year"
                    {...register("year")}
                />
            )}

            <textarea
                id="message"
                maxLength={80}
                placeholder="Add a personal note"
                {...register("message")}
            />
            <p className={message?.length > 70 ? "text-orange-500" : ""}>{message?.length ?? 0}/80</p>

            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Generating..." : "Generate & Download"}</Button>
        </form>
    );

}