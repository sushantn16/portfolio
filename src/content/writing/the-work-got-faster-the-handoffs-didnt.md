---
title: "With AI, the work got faster. The handoffs didn't."
description: Why AI's productivity gains are easy to feel alone and hard to see in a team, and what I'd change about how we split the work.
date: 2026-10-28
linkedin: https://www.linkedin.com/posts/sushantnandwani_with-ai-the-work-got-faster-the-handoffs-share-7521300805040132096-zcqc/
draft: false
---

Everyone around me uses AI to go faster now. I do too. When I work alone, the difference is big: things that took days now take hours, and I can carry a feature from the database to the button without waiting on anyone.

But when I look at how fast teams deliver, I don't see the same jump. Features don't reach users twice as fast. In teams where everyone owns one part of the product, it's hard to see any change at all.

I've been thinking about why.

## We tried to ship one feature in a week

We recently ran an experiment. One feature, one week, the whole team on it: backend developers, product, design, Android, iOS and frontend. Everyone used AI.

Each part got done quickly. The backend had its API, and the apps and the web had their screens. By the end of the week, we still couldn't ship.

Nobody was slow, and nobody did bad work. The pieces were there. Putting them together was the part that didn't fit in a week.

## The work was never the slow part

Looking back at that week, the time spent on actual work was small. Most of it went to coordination: agreeing on the approach, handing over, waiting for someone else's piece, and checking that what I built still matched what someone else built.

Agents make the work part even smaller. They don't make the coordination smaller. So the share of time that goes to coordination grows.

This is why the gain is hard to see. Say the work was a third of the time, and AI cuts it in half. The feature gets faster by a sixth. On a team board, that looks like nothing changed. Speeding up the part that wasn't the bottleneck never shows up much in the total.

## The context stays with you

There's a new problem too, and AI created it.

When I work with an agent, I build up a lot of context: what we tried, what didn't work, which edge cases came up, and why the code looks the way it does. That context lives in my session, and it's what makes the next step fast for me.

It doesn't move to the next person. When my part is done and someone else picks up theirs, they start from a ticket and a few comments, and their agent starts from zero. Writing things down helps, but it never transfers fully. The more the agent does, the more context there is to lose.

So handoffs got more expensive at the same time as the work got cheaper.

## Building a bridge from two ends

Splitting a feature across people is like building a bridge from two ends. Both sides agree to meet at a certain place, start building, and pray they meet in the middle.

Sometimes it works. Sometimes it doesn't, and you're making changes at the last moment, on both sides, under time pressure.

And in today's teams it's rarely two ends. It's not even one person owning one part. There are several backend developers, and roughly one developer per client: web, Android and iOS. That's a bridge with many ends, all trying to meet at the same point.

Every extra end is another agreement, another handoff and another chance to miss.

## With one owner, there's no middle to miss

When one person owns the whole flow, the bridge is built from one side.

As a full-stack developer, I can own a feature across the backend and the frontend. When I do, decisions take minutes, because I'm the one making them. If the API needs another field, I add it and use it in the same hour. Even a pivot is mine to own: if the plan changes halfway, I change both sides and keep everything aligned myself.

That's where AI feels fast, because nothing is waiting on anything.

## Plan together, build alone

So here is what I'd change: more people in the planning, fewer in the implementing.

Before anything is built, put everyone in one session: product, design, backend and the clients. Discuss the approach. Let people share their opinions and disagree. Leave with a plan everyone has shaped.

After that, ideally, one person implements it.

Opinions are cheapest before anything is built. Once two halves of a bridge exist, every new opinion means rebuilding one of them. So I'd rather spend the team's time where it's cheap, and keep the building with as few people as possible.

## Where this stops working

There's a clear limit. Backend and frontend can be done by one full-stack developer. Android and iOS can't, not well. They still need their own expertise.

So I'm not arguing that one person should build everything. I'm arguing for fewer handoffs: wherever one person can own a whole flow, let them. Where a handoff can't be avoided, make the plan precise enough that both ends know exactly where the middle is.

## What I expect people to say

**"That's waterfall."** Not really. Waterfall plans everything up front and hands each phase to a different group. This plans together and then removes handoffs. The builder can still change the plan; they just don't need a meeting to do it.

**"Then only one person knows the code."** The planning is shared, and code review still happens, so the knowledge isn't only in one head. And with handoffs, context gets lost anyway. It just gets lost between people instead of staying with one.

**"One person is slower than five."** At typing, maybe. But typing isn't the bottleneck anymore. Waiting is.

## The bottleneck moved

AI made the actual work small. It didn't make coordination small. If most of the time now goes to waiting and handing over, a faster agent won't fix that. Fewer handoffs will.

I don't think most teams are set up for this yet. We still split work the way we did when writing code was the expensive part.

Is AI making your team faster, or mostly the people in it?
