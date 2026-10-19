// Everything the site says lives here, so editing copy never means touching markup.

export const profile = {
  name: 'Sushant Nandwani',
  role: 'Senior Software Engineer',
  company: 'Kleinanzeigen',
  location: 'Berlin',
  email: 'nandwanisushant@gmail.com',
  url: 'https://iamsushant.dev',
  linkedin: 'https://www.linkedin.com/in/sushantnandwani/',
  github: 'https://github.com/sushantn16',
  description:
    'Senior software engineer in Berlin. I build AI-powered products end to end: Java and Spring Boot services, the LLM layer, and TypeScript and React interfaces.',
};

export const about = [
  "I'm a senior full-stack engineer at Kleinanzeigen, one of Germany's largest online marketplaces. I work on the tools commercial sellers run their business on, and on the AI features and developer tooling behind them.",
  'Most weeks are split between Spring Boot services and Astro and React frontends. I like owning a feature from the data model to the pixel, keeping architecture boring, and making pages fast.',
  "Lately that means LLM features in production, agentic workflows for code review, and MCP tools that let AI assistants work with our real systems.",
];

export interface Job {
  company: string;
  role: string;
  previously?: string;
  start: string;
  end: string;
  place: string;
  highlights: string[];
  stack: string[];
}

export const work: Job[] = [
  {
    company: 'Kleinanzeigen',
    role: 'Senior Software Engineer',
    previously: 'Full Stack Engineer',
    start: '2024',
    end: 'Now',
    place: 'Berlin',
    highlights: [
      'Architected and led Business Hub, the new portal for commercial sellers, and owned the phased migration of 1M+ users onto it under live production constraints.',
      'Moving features off the Java/Spring MVC monolith into a Spring Boot service with hexagonal architecture: REST endpoints, plus Feign, GraphQL and gRPC clients to downstream services.',
      'Built a self-healing pull-request pipeline of three agentic workflows (review, suggest, fix), now a shared GitHub Action other teams are adopting.',
      'Built an internal MCP server with 38 test-data tools, so engineers create test users, ads and accounts from Claude Code instead of an admin UI.',
      'Ran A/B tests across freemium acquisition and onboarding, contributing to 30%+ year-over-year customer growth.',
      'Maintained the shared design system and authored the Playwright end-to-end testing strategy adopted across teams; cut CI/CD time by 60%.',
    ],
    stack: ['Java', 'Spring Boot', 'TypeScript', 'React', 'Astro', 'LLMs', 'MCP'],
  },
  {
    company: 'Hintbox',
    role: 'Full Stack Developer',
    start: '2023',
    end: '2024',
    place: 'Koblenz',
    highlights: [
      'Owned large product initiatives end to end: architecture, implementation and launch.',
      'Built a TypeScript and React frontend framework of modular components, lifting engagement by 20%.',
      'Designed Django REST APIs that responded 30% faster, and automated test-data setup, cutting it by ~80%.',
    ],
    stack: ['TypeScript', 'React', 'Django'],
  },
  {
    company: 'Deloitte',
    role: 'Frontend Developer',
    start: '2023',
    end: '2023',
    place: 'Germany',
    highlights: [
      'Built data-intensive interfaces for machine-learning analytics tools.',
      'Refactored the component architecture for a 25% rendering performance gain.',
    ],
    stack: ['React', 'Data visualisation'],
  },
  {
    company: 'Capgemini',
    role: 'Software Analyst',
    start: '2021',
    end: '2022',
    place: 'Bangalore',
    highlights: [
      "Led the front-end modernisation of Amgen's global portal, from jQuery to React.",
      'Performance work across React, Sitecore and Bootstrap made the portal 20% faster worldwide.',
    ],
    stack: ['React', 'Sitecore'],
  },
];

export const education = [
  { degree: 'MSc Web and Data Science', school: 'University of Koblenz', year: '2024' },
  { degree: 'BTech Computer Science', school: 'Kurukshetra University', year: '2020' },
];

export const skills = [
  {
    group: 'AI & LLMs',
    items: ['Claude API', 'Gemini', 'AWS Bedrock', 'AWS SageMaker', 'LLM evals', 'Tool calling & MCP', 'Agentic workflows', 'RAG & pgvector'],
  },
  {
    group: 'Backend',
    items: ['Java', 'Spring Boot', 'Kotlin', 'Node.js', 'Python', 'REST', 'gRPC', 'GraphQL', 'SQL'],
  },
  {
    group: 'Frontend',
    items: ['TypeScript', 'React', 'Astro', 'Next.js', 'Tailwind CSS', 'Design systems', 'D3.js', 'Web performance'],
  },
  {
    group: 'Delivery',
    items: ['AWS', 'Docker', 'GitHub Actions', 'CI/CD', 'Playwright'],
  },
];

export const languages = ['English (fluent)', 'Hindi (native)', 'Punjabi (native)', 'German (A1)'];

export interface Project {
  name: string;
  year: string;
  href: string;
  source?: string;
  summary: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    name: 'job-scout',
    year: '2026',
    href: 'https://github.com/sushantn16/job-scout',
    summary:
      'A job-search pipeline with Claude in four tool-less roles. It scans company job boards, screens every posting for text aimed at AI before a model reads it, scores fit with an explainable formula, and prepares a fact-checked CV for each strong match. It never applies on its own.',
    stack: ['TypeScript', 'Claude', 'SQLite', 'Docker'],
  },
  {
    name: 'pr-review-agent',
    year: '2026',
    href: 'https://github.com/sushantn16/pr-review-agent',
    summary:
      'A GitHub Action that reviews pull requests with any OpenAI-compatible model. The model reads the diff and gets no tools, so it can comment but never change your code.',
    stack: ['TypeScript', 'GitHub Actions', 'Zero dependencies'],
  },
  {
    name: 'Stilllight',
    year: '2025',
    href: 'https://sushantn16.github.io/Stilllight/',
    source: 'https://github.com/sushantn16/Stilllight',
    summary:
      'A photo gallery that publishes itself. Drop a photo in a folder and it is resized, stripped of GPS data and uploaded to Cloudflare R2, then appears on the site with no rebuild.',
    stack: ['Astro', 'Node.js', 'Cloudflare R2'],
  },
];

export interface Post {
  title: string;
  date: string;
  href: string;
  blurb: string;
}

export const writing: Post[] = [
  {
    title: 'Building a commercial portal for Kleinanzeigen',
    date: '2026-04-01',
    href: 'https://www.linkedin.com/posts/sushantnandwani_building-a-commercial-portal-for-kleinanzeigen-activity-7445125717576572929-FddL',
    blurb: 'What mattered architecturally, and where AI actually helped.',
  },
  {
    title: 'AI code review on every pull request',
    date: '2026-04-13',
    href: 'https://www.linkedin.com/posts/sushantnandwani_ai-is-helping-us-write-more-code-than-ever-activity-7449464965029167104-rg85',
    blurb: 'Claude Code in GitHub Actions, and why it raises the floor.',
  },
  {
    title: 'Would you drive over your code?',
    date: '2025-11-01',
    href: 'https://www.linkedin.com/posts/sushantnandwani_just-got-back-from-performancenow-conference-activity-7390322946655023104-NKYE',
    blurb: 'Notes from performance.now() in Amsterdam.',
  },
];

export interface Interest {
  title: string;
  body: string;
  link?: { label: string; href: string };
}

export const interests: Interest[] = [
  {
    title: 'Photography',
    body: 'I photograph buildings and streets, mostly on a pocket-sized Sony RX100 VII. The photos live on Stilllight, a gallery I built that publishes itself.',
    link: { label: 'See the photos on Stilllight', href: 'https://sushantn16.github.io/Stilllight/' },
  },
  {
    title: 'Running',
    body: 'I run most weeks, usually long, easy runs through Berlin, and I train for half marathons.',
  },
];
