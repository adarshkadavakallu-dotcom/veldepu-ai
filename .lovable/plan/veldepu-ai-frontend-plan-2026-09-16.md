# Veldepu AI Frontend Plan

## Goal
Build a complete frontend-only agency website for Veldepu AI across the requested routes. Keep all content, forms, projects, and interactions local to the browser, with no database, authentication, APIs, or third-party service connections.

## Visual Direction
- Premium charcoal and off-white foundation with restrained blue-violet accents.
- Strong editorial typography, compact navigation, subtle borders and shadows, generous whitespace, and small purposeful motion.
- Abstract website/workflow interface compositions instead of robot imagery or generic AI artwork.
- Responsive layouts for mobile, tablet, and desktop, with reduced-motion support and visible focus states.

## Shared Experience
- Create a reusable site shell with sticky desktop navigation, an accessible animated mobile menu, and a complete footer.
- Add shared buttons, section headings, service cards, FAQ accordions, call-to-action bands, form controls, and project details dialog.
- Keep every navigation item, card action, menu control, FAQ, dialog control, and form action functional.
- Use only the three approved services throughout the site.

## Pages
- `/`: Build the full home experience with the specified hero copy, values, business problems, three services, process preview, work preview, FAQ, and clear calls to action.
- `/services`: Present the three services with concise comparisons and working links to their detail pages.
- `/websites`: Include Hero, What We Build, Features, How It Works, Benefits, FAQ, and contact/process calls to action.
- `/website-improvement`: Include problems, improvements, before/after explanation, process, benefits, FAQ, and audit/contact actions.
- `/automation`: Explain practical automation and render the specified example workflow with a clear disclaimer that it is illustrative.
- `/process`: Present the five-step process and a working contact action.
- `/work`: Show clearly labeled concept projects with accessible details dialogs, close controls, and an honest portfolio note.
- `/about`: Include Who We Are, What We Do, Our Approach, Why Veldepu AI, and contact action.
- `/contact`: Build the complete project inquiry form with inline validation, loading/disabled state, and an honest local success state.
- `/audit`: Build the website review form with the same polished frontend-only validation and submission behavior.
- `/404`: Add a dedicated page, while also styling the site-wide missing-page view with a working Home action.

## Forms and Interactions
- Validate required fields, email addresses, URLs, and sensible text lengths without clearing valid user input after errors.
- Use labeled controls and error messages connected to their fields; focus the first invalid field after submission.
- Simulate a short submission delay, prevent duplicate submissions, show the approved frontend-only success wording, and provide a useful reset/new-request action.
- Use accessible accordions and dialogs with keyboard support and focus management.

## Technical Details
- Keep TanStack Start routing and create one route file per requested URL, each with unique title, description, Open Graph text, `og:type`, and Twitter card metadata.
- Centralize static content and route-safe data in reusable frontend modules; do not add server functions or persistence.
- Extend the existing Tailwind v4 token system in `src/styles.css` using semantic OKLCH variables and reusable animation utilities.
- Reuse and refine the existing shadcn Button, Accordion, Dialog, Input, Select, and Textarea primitives rather than duplicating controls.
- Load selected web fonts from the document head and keep all component colors token-based.

## Verification
- Check desktop and mobile layouts for overflow, tap targets, typography, forms, cards, dialogs, navigation, and footer.
- Exercise the required journeys: website creation to contact success; website improvement to audit success; automation to contact; work details open/close; and every mobile navigation link.
- Audit rendered buttons and links for dead actions, verify FAQ keyboard behavior and form states, and review browser console output.
