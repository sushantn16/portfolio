---
title: Building a commercial portal for Kleinanzeigen
description: What mattered architecturally, and where AI actually helped.
date: 2026-04-01
linkedin: https://www.linkedin.com/posts/sushantnandwani_building-a-commercial-portal-for-kleinanzeigen-activity-7445125717576572929-FddL
---

For the past 6 months I've been building a unified portal for commercial sellers on Kleinanzeigen, replacing a 15-year-old micro-frontend setup where each feature had its own deploy pipeline and zero shared infrastructure.

25+ pages, 11 feature modules (subscriptions, branding, analytics, AI assistant, support tickets, push notifications, invoices), one Astro + React codebase.

## What actually mattered architecturally

- **Astro's islands model.** Server-render everything, hydrate React only where you need interactivity. No SPA complexity, good performance by default.
- **Feature-first code organization.** Each module owns its components, hooks, types, API layer, and tests. A new developer can ship within a feature without reading the whole codebase.
- **A shared middleware pipeline** (auth, A/B testing, route access control, user context) that resolves before any component renders. This is where most of the velocity gain comes from.

## How I used AI during development

- Claude Code reviews every PR against our architecture rules, design system, and TypeScript conventions. Human reviewers focus on product decisions instead of style nits.
- Custom Claude Code agents and skills in the repo for migration, test generation and dead code removal, which help generate code that follows our actual patterns.
- MCP servers (Chrome DevTools, Playwright, Figma, Storybook) for debugging E2E tests, by having Claude look at what the browser actually renders instead of reading stack traces.

The best example: redirecting commercial users from old JSP pages to the new portal broke tests across two repos. AI traced the full chain from Java controllers to test base classes to shared mutable state leaking between tests. Fixed in one session.

## Takeaways

The boring decisions early on (shared utilities, strict typing, middleware, feature isolation) are why we move fast now. Not the framework choice.

AI is most useful when you give it context: `CLAUDE.md`, a component reference, custom agents. That investment is what makes AI suggestions relevant instead of generic.

Legacy migration is unglamorous, and it's where all the user value ships. Building the new thing is the easy part. Making everyone actually use it is the work.
