import { promptAI } from '@/lib/prompt/promptAI';
import { downloadZip } from '@/lib/generate/downloadZip';
import { PersonalInput, ProfessionalInput, SubmitResult } from '@/types';
import { personalFormData } from '@/lib/prompt/personalFormData';
import { professionalFormData } from '../prompt/professionalFormData';

export const submitForm = async (data: PersonalInput | ProfessionalInput): Promise<SubmitResult> => {

    const personalTheme = ["birthday", "graduation", "wedding", "newyear"];

    try {
        const isPersonal = personalTheme.includes(data.theme);

        const promptData = isPersonal ? personalFormData(data as PersonalInput) : professionalFormData(data as ProfessionalInput);
        console.log("promptData", promptData);

        const aiResponseData = await promptAI(promptData);
        console.log("AI responded Data", aiResponseData.result);

        if (!aiResponseData) {
            return {
                success: false,
                message: "No AI response received.",
            };
        }

        await downloadZip(aiResponseData.result, data);

        return {
            success: true,
            message: "Template successfully generated!"
        };

    } catch (error) {
        return {
            success: false,
            message: "Failed generating template.",
        };
    }
};