import { PersonalInput, FieldConfig } from '@/types';
import { currentYear } from '@/utils/helpers/theming';

export const fields: FieldConfig<PersonalInput>[] = [
    // Theme
    {
        name: "theme",
        label: "Theme",
        type: "select",
        options: [
            { label: "Select a theme for the event", value: "" },
            { label: "Birthday", value: "birthday" },
            { label: "Graduation", value: "graduation" },
            { label: "New Year", value: "newyear" },
            { label: "Wedding", value: "wedding" },
        ],
    },

    // Vibe
    {
        name: "vibe",
        label: "Vibe",
        type: "select",
        options: [
            { label: "Select a vibe for the event", value: "" },
            { label: "Formal", value: "formal" },
            { label: "Friendly", value: "friendly" },
            { label: "Playful", value: "playful" },
        ],
    },

    // Theme-based input fields
    {
        name: "age",
        label: "Age",
        type: "input",
        placeholder: "25",
        maxLength: 3,
        showIf: (theme) => theme === "birthday",
    },
    {
        name: "classYear",
        label: "Class Year",
        type: "input",
        placeholder: `${currentYear}`,
        maxLength: 4,
        showIf: (theme) => theme === "graduation",
    },
    {
        name: "year",
        label: "New Year",
        type: "input",
        placeholder: `${currentYear + 1}`,
        maxLength: 4,
        showIf: (theme) => theme === "newyear",
    },

    // Base fields
    {
        name: "host",
        label: "Host",
        type: "input",
        placeholder: "Joy Johnson",
        minLength: 1,
        maxLength: 30,
    },
    {
        name: "invitee",
        label: "Invitee",
        type: "input",
        placeholder: "Friends & Family",
        minLength: 1,
        maxLength: 30,
    },
    {
        name: "date",
        label: "Date",
        type: "input",
        placeholder: "June 12, 2026",
        minLength: 1,
        maxLength: 15,
    },
    {
        name: "time",
        label: "Time",
        type: "input",
        placeholder: "6:00 PM",
        minLength: 1,
        maxLength: 15,
    },
    {
        name: "location",
        label: "Location",
        type: "input",
        placeholder: "123 Sunset Blvd",
        minLength: 1,
        maxLength: 50,
    },
    {
        name: "food",
        label: "Food",
        type: "input",
        placeholder: "Dinner, snacks, and drinks (Optional)",
    },
    {
        name: "activities",
        label: "Activities",
        type: "input",
        placeholder: "Games, music",
        minLength: 1,
        maxLength: 30,
    },
    {
        name: "rsvp",
        label: "RSVP Link",
        type: "input",
        placeholder: "https://your-own-or-facebook-link-example.com", minLength: 1,
        maxLength: 100,
    },
    {
        name: "banner",
        label: "Banner Link",
        type: "input",
        placeholder: "https://your-own-banner-link-example.com/banner.png (Optional)",
        minLength: 1,
        maxLength: 100,
    },

    // Message
    {
        name: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Add a personal note",
        minLength: 30,
        maxLength: 200,
    },
];