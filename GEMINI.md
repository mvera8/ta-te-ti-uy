## Antigravity

GEMINI.md - Project Instructions
🎯 Core Principles
Performance First: Every solution must prioritize Core Web Vitals (LCP, INP, CLS). Favor Server Components over Client Components unless interactivity is strictly required.

Mobile-First Design: Since users will likely check prices while at the supermarket, all UI/UX must be optimized for one-handed mobile use and slow 4G connections.

Clean Code: Follow DRY (Don't Repeat Yourself) and KISS (Keep It Simple, Stupid) principles.

🛠 Tech Stack & Implementation
Framework: Next.js (App Router).

UI Library: Mantine Dev (@mantine/core, @mantine/hooks).

Instruction: Always use Mantine's built-in components and hooks instead of custom CSS or third-party libraries when possible.

Theming: Respect the existing Mantine theme configuration.

State Management: Prioritize URL states (searchParams) for filtering and pagination to ensure shareable links.

🚀 Performance Guidelines
Images: Use next/image with proper sizes attribute and WebP format.

Data Fetching: Use fetch with appropriate revalidate tags or cache: 'force-cache' for price data that doesn't change every second.

Bundle Size: Avoid heavy dependencies. If a Mantine component has a lighter alternative for a specific mobile use case, suggest it.

📱 Mobile Specifics
Touch Targets: Ensure all buttons and links are at least 44x44px.

Loading States: Always implement loading.tsx or Mantine Skeleton screens to prevent layout shifts.

Inputs: Use correct inputMode (e.g., numeric for prices) to trigger the right mobile keyboard.

📋 General Rules for Antigravity
Be Concise: Give me the code first, then the explanation.

Modern Syntax: Use TypeScript, arrow functions, and destructuring.

Error Handling: Always wrap data fetches in try/catch and provide user-friendly feedback via Mantine Notifications.

SEO: Ensure every page has proper Metadata generation.