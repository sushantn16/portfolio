---
title: 'How I work: a vault for memory, Claude Code for hands, CI for the loop'
description: The setup behind how I ship. Notes the AI reads and writes, tools it can use, and a review on every pull request.
date: 2026-10-19
draft: true
---

AI made writing code cheap. Three things are still expensive: context, checking the work, and remembering what happened last week. My setup is built around those three.

## Memory: an Obsidian vault the AI reads and writes

Every session with Claude Code starts and ends in an Obsidian vault.

When a session starts, a small hook works out which project I'm in and puts that project's note, plus the last session's summary, into Claude's context. When the session ends, another hook checks that something was written down. If nothing was, it asks before it lets the session finish.

The vault has one note per project, and separate notes for decisions, problems and sessions. As of today that's 515 notes: 236 sessions, 98 decisions, 97 problems and 37 projects.

The hard part wasn't writing notes. It was keeping them true. An audit of the vault found that every number that had drifted had been copied from another note that was itself correct. So the vault now follows a few rules, and Claude follows them too:

- **The project note is the main record.** Session notes stay short. Nobody re-reads 40 session notes, but everyone re-reads the project note.
- **Any note that states a status carries a `last-verified` date.** A plan written in the future tense becomes wrong the day its date passes, and keeps reading as current.
- **Link to a fact instead of copying it.**
- **Check a status at its source** (Jira, `git log`, the actual system) before repeating it.

The result is that I almost never explain the same thing twice. Claude starts each session knowing what we decided, why, and what broke last time.

## Hands: tools the AI can actually use

Claude Code is useful when it can see what I see. I give it tools through MCP servers:

- **Chrome DevTools**, for performance traces, Lighthouse audits and screenshots. Most of what I fixed on this site came from traces Claude ran and read.
- **Playwright and Storybook**, for end-to-end tests and components.
- **Figma**, to read designs directly.
- **An internal MCP server I built**, with 38 tools that create test users, ads and accounts, so nobody clicks through an admin UI to set up a test.

The best example is still from building Business Hub. Redirecting commercial users from old JSP pages to the new portal broke tests across two repos. Claude traced it from the Java controllers through the test base classes to shared state leaking between tests, in one session.

## The loop: review on every pull request

The last piece runs in GitHub Actions. I built a self-healing pipeline of three agentic workflows: review, suggest and fix. Every pull request gets an AI review before a human opens it. The review is context-aware: it reads our architecture rules and conventions, and it reviews incrementally, so a new push only gets comments on what changed.

It started in one repo. It's now a shared action that other teams are adopting.

The design rule that made it work: let the model make judgment calls, and let ordinary code do everything deterministic, like deciding what to review, removing duplicate comments and posting the verdict.

I rewrote the review from scratch as a personal open-source version, [pr-review-agent](https://github.com/sushantn16/pr-review-agent). It works with any OpenAI-compatible model.

## What this buys me

Speed, mostly. Some examples, all with commit history to show for them:

- [job-scout](https://github.com/sushantn16/job-scout), a job-search pipeline with board scanning, prompt-injection screening, scoring and CV tailoring, went from design to a published repo in a day.
- pr-review-agent took a day: about 600 lines of TypeScript, no runtime dependencies, 15 tests.
- This site took an afternoon, including the performance work.

Speed isn't the point by itself. Because the boring parts are fast, I spend my time on the decisions.

## Rules I keep

- **Measure before trusting it.** That goes for my code, Claude's code and my own notes.
- **The AI never pushes to `main`.** Everything goes through a branch and a pull request.
- **Text from outside is untrusted input.** job-scout screens every job posting for prompt injection before a model reads it, because some postings really do hide instructions for AI tools.
- **I make the decisions.** The tools draft, check and remember, and I decide what ships.
