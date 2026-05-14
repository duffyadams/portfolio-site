<script lang="ts">
  import ProjectCard from './ProjectCard.svelte';
  import { reveal } from '$lib/reveal';

  const projects = [
    {
      title: 'San Diego Traffic Watch',
      description:
        'A real-time traffic and emergency incident dashboard that aggregates live public safety data across San Diego into one searchable web platform.',
      highlights: [
        'Python/Flask backend with background scraping workers',
        'SQLite data layer with pagination and analytics endpoints',
        'Geocoding and automatic map image generation',
        'LLM-based incident summaries',
        'Svelte frontend with search, filters, live stats, likes, comments, and responsive UI',
        'Built for real-time updates and efficient reads/writes'
      ],
      tech: ['Svelte', 'Flask', 'Python', 'SQLite', 'Playwright', 'OpenAI API', 'Tailwind/CSS'],
      demoHref: '#',
      githubHref: '#',
      preview: '/assets/web-capture-loop.webm',
      accent: 'linear-gradient(135deg, #bae6fd, #38bdf8 48%, #0f172a)'
    },
    {
      title: 'AI Action Figure Generator',
      description:
        'A SaaS-style web app concept that turns user-uploaded photos into custom AI-generated action figure images with login and payment flow support.',
      highlights: ['AI image generation workflow', 'Auth flow', 'Stripe payment concept', 'Full-stack architecture'],
      tech: ['Svelte', 'Flask', 'Python', 'Stripe', 'Supabase', 'OpenAI API'],
      demoHref: '#',
      githubHref: '#',
      accent: 'linear-gradient(135deg, #fde68a, #f472b6 52%, #312e81)'
    },
    {
      title: 'Pourtocol Smart Fountain',
      description:
        'A distributed systems project that uses NFC identity, ultrasonic cup detection, and an ESP32-controlled pour system connected to a web UI.',
      highlights: [
        'ESP32 firmware',
        'Web-controlled hardware interaction',
        'HTTP-based device communication',
        'Failure handling and mutual exclusion for physical actuator safety'
      ],
      tech: ['ESP32', 'C++', 'HTTP', 'JavaScript', 'Distributed Systems'],
      demoHref: '#',
      githubHref: '#',
      accent: 'linear-gradient(135deg, #bbf7d0, #2dd4bf 48%, #083344)'
    }
  ];
</script>

<section id="projects" class="section-shell py-20 sm:py-28">
  <div class="reveal mb-10 flex flex-col justify-between gap-5 sm:mb-14 md:flex-row md:items-end" use:reveal={0}>
    <div>
      <p class="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Featured Work</p>
      <h2 class="mt-3 max-w-3xl text-4xl font-black tracking-normal sm:text-6xl">Projects built for real users and real constraints.</h2>
    </div>
    <p class="max-w-md text-base leading-7 text-muted-foreground">
      Recruiter-friendly snapshots of systems work: live data, dashboards, hardware, AI workflows, and product-quality UI.
    </p>
  </div>

  <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {#each projects as project, index}
      <ProjectCard {project} delay={index * 110} />
    {/each}
  </div>
</section>
