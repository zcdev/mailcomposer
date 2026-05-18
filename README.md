# MailComposer ✉️

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=for-the-badge&logo=openai&logoColor=white)
![MJML](https://img.shields.io/badge/MJML-F46519?style=for-the-badge)
![Sonner](https://img.shields.io/badge/Sonner_Toast-111111?style=for-the-badge)
![adm-zip](https://img.shields.io/badge/adm--zip-444444?style=for-the-badge)
![Upstash Redis](https://img.shields.io/badge/Upstash_Redis-00E9A3?style=for-the-badge&logo=redis&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

## Live Demo

A lightweight AI-powered email composer built with modern frontend tooling. Generate polished email drafts, preview the final HTML output, and export clean email-ready markup with a smooth, responsive user experience: [https://mailcomposer.vercel.app/](https://mailcomposer.vercel.app/)

## Overview

MailComposer was built to explore practical AI-assisted workflows for email drafting and formatting. The project focuses on a clean developer experience, thoughtful UI feedback, and reliable deployment practices.

The app allows users to:

* Generate email content from prompts
* Instant preview and download generated HTML output
* Validation and error notifications upon form input
* Prevent accidental multiple submissions by cooldown period and rate limiting

The project also served as a strong exercise in:

* Frontend architecture
* API route design
* Type-safe form handling
* State management
* Error handling patterns
* Deployment readiness and production verification

## Features

### AI Email Composition

Generate structured email drafts from user prompts using a streamlined composition flow.

### HTML Preview

Preview rendered email HTML directly in the browser using an iframe-based preview page.

### HTML Export

Download generated HTML in an extractable Zip file for use in email clients or external workflows.

### Toast Notifications

Responsive toast feedback powered by Sonner for:

* Validation errors
* API failures
* Cooldown messaging
* Success states

### Cooldown + Rate Limiting

Implemented request protection using Redis-based rate limiting to help prevent abuse and accidental spam requests.

### TypeScript + ESLint Verification

Project includes strict linting and verification workflows to reduce deployment issues and improve maintainability.

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* MJML

### UI + DX

* Sonner
* ESLint
* Prettier
* Custom-made email template banners (for personal themes)

### Backend / Infrastructure

* Next.js API Routes
* Redis / Upstash Redis
* Adm-Zip
* OpenAI API

### Deployment

* Vercel

## Project Structure

```txt
.
├── public
│   └── assets
│       └── banners
└── src
    └── app
        ├── api
        ├── components
        ├── lib
        ├── personal
        ├── preview
        ├── privacy
        ├── professional
        ├── types
        └── utils
```

## Local Development

### 1. Clone the repository

```bash
git clone git@github.com:zcdev/mailcomposer.git
cd mailcomposer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file.

Example:

```env
OPENAI_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### 4. Run development server

```bash
npm run dev
```

Open `http://localhost:3000`

## Verification Workflow

Before deployment:

```bash
npm run verify
```

This workflow helped catch deployment issues early by combining linting, type checking, and build verification.

## Deployment

The project is configured for deployment on Vercel.

```bash
npm run build
```

Production deployment includes:

* Environment variable validation
* Redis-backed cooldown protection
* Build verification checks
* Responsive preview support

## Challenges & Learnings

Some key areas explored during development:

* Designing reusable utility functions while balancing DRY principles with readability and intent
* Separating business logic and presentation responsibilities for clearer architecture and easier theming
* Utilizing comprehensive form schemas, HTML5 validation, type guards, and input restrictions
* Structuring form input into thoughtful AI prompts for more reliable output generation
* Rendering form fields and template themes dynamically through conditional UI patterns
* Extracting reusable MJML/HTML generation logic into shared utilities, allowing preview and export functionality to rely on the same source of truth
* Evaluating architectural trade-offs, including when suppressing a one-off linter warning was the more practical decision
* Building a cohesive error messaging system to create a smoother user experience

## Future Improvements

Potential next steps for the project:

* Email template presets
* Rich text editor support
* Authentication and saved drafts
* Prompt history
* Multi-theme email styles
* Markdown-to-email conversion
* Copy-to-clipboard export helpers

## Portfolio Notes

This project demonstrates:

* Production-focused frontend engineering
* Practical API integration
* Thoughtful UX feedback systems
* Type-safe development workflows
* Deployment reliability practices
* Clean component and utility organization

## License

MIT
