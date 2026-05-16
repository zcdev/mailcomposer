import { promptAI } from '@/lib/prompt/promptAI';
import { downloadZip } from '@/lib/generate/downloadZip';
import { previewHtml } from '../generate/previewHTML';
import { PersonalInput, ProfessionalInput, SubmitResult } from '@/types';
import { personalFormData } from '@/lib/prompt/personalFormData';
import { professionalFormData } from '../prompt/professionalFormData';

export const submitForm = async (data: PersonalInput | ProfessionalInput): Promise<SubmitResult> => {

    const personalTheme = ["birthday", "graduation", "wedding", "newyear"];

    try {
        const isPersonal = personalTheme.includes(data.theme);

        const promptData = isPersonal ? personalFormData(data as PersonalInput) : professionalFormData(data as ProfessionalInput);

        const aiResponseData = await promptAI(promptData);

        if (!aiResponseData?.result) {
            return {
                success: false,
                message: "No AI response received.",
            };
        }

        const preview = await previewHtml(aiResponseData.result, data);

        /* For debug use */
        console.log("promptData", promptData);
        console.log("AI responded Data", aiResponseData.result);
        console.log(preview);

        localStorage.setItem("previewHtml", preview.html);

        window.open("/preview", "_blank");

        await downloadZip(aiResponseData.result, data);

        return {
            success: true,
            message: "Template successfully generated!"
        };

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed generating template.",
        };
    }
};