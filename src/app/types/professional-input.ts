export type ProfessionalInput = {
    theme: string;
    business: string;
    address: string;
    website?: string;
    customer: string;
    purpose: string;
    start?: string;
    end?: string;
    location?: string;
    message: string;
    disclaimer?: string;
    unsub: string;
    color?: string;
    logo?: string;
    text?: string;
    cta?: string;
    code?: string;
};

export type ThemeIntent = {
    announcement: string;
    promotion: string;
    invite: string;
    relation: string;
};