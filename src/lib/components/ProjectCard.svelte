<script lang="ts">
  import { ExternalLink, Github } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { reveal } from '$lib/reveal';

  type Project = {
    title: string;
    description: string;
    tech: string[];
    highlights: string[];
    demoHref: string;
    githubHref: string;
    preview?: string;
    accent: string;
  };

  const techPillStyles: Record<string, string> = {
    Svelte:
      '--pill-border: #ff8f73; --pill-bg: rgba(255, 62, 0, 0.1); --pill-text: #a63d22; --pill-dark-bg: rgba(255, 62, 0, 0.14); --pill-dark-text: #ffd0c5;',
    Flask:
      '--pill-border: #8f98a3; --pill-bg: rgba(148, 163, 184, 0.12); --pill-text: #4a5562; --pill-dark-bg: rgba(148, 163, 184, 0.16); --pill-dark-text: #e4eaf2;',
    Python:
      '--pill-border: #ffd24d; --pill-bg: rgba(255, 210, 77, 0.16); --pill-text: #7a5a00; --pill-dark-bg: rgba(55, 118, 171, 0.22); --pill-dark-text: #ffe08a;',
    SQLite:
      '--pill-border: #6fc3ff; --pill-bg: rgba(111, 195, 255, 0.14); --pill-text: #0b5f95; --pill-dark-bg: rgba(0, 119, 181, 0.18); --pill-dark-text: #b8e3ff;',
    Playwright:
      '--pill-border: #88e17b; --pill-bg: rgba(136, 225, 123, 0.14); --pill-text: #2f6f26; --pill-dark-bg: rgba(45, 212, 191, 0.14); --pill-dark-text: #c7f7d1;',
    'OpenAI API':
      '--pill-border: #8df0cf; --pill-bg: rgba(141, 240, 207, 0.14); --pill-text: #1b7460; --pill-dark-bg: rgba(16, 185, 129, 0.14); --pill-dark-text: #cff9ea;',
    'Tailwind/CSS':
      '--pill-border: #6ee7f9; --pill-bg: rgba(110, 231, 249, 0.16); --pill-text: #0c6f86; --pill-dark-bg: rgba(34, 211, 238, 0.16); --pill-dark-text: #c8f8ff;',
    'Svelte 5':
      '--pill-border: #ff8f73; --pill-bg: rgba(255, 62, 0, 0.1); --pill-text: #a63d22; --pill-dark-bg: rgba(255, 62, 0, 0.14); --pill-dark-text: #ffd0c5;',
    Vite:
      '--pill-border: #c4a1ff; --pill-bg: rgba(196, 161, 255, 0.14); --pill-text: #6a3db3; --pill-dark-bg: rgba(139, 92, 246, 0.18); --pill-dark-text: #ecdeff;',
    'Dexie.js':
      '--pill-border: #f59e8b; --pill-bg: rgba(245, 158, 139, 0.14); --pill-text: #a3472e; --pill-dark-bg: rgba(249, 115, 22, 0.14); --pill-dark-text: #ffe0d2;',
    IndexedDB:
      '--pill-border: #facc15; --pill-bg: rgba(250, 204, 21, 0.16); --pill-text: #856100; --pill-dark-bg: rgba(234, 179, 8, 0.18); --pill-dark-text: #ffefad;',
    'Node.js':
      '--pill-border: #8bd87c; --pill-bg: rgba(139, 216, 124, 0.14); --pill-text: #376c2e; --pill-dark-bg: rgba(34, 197, 94, 0.14); --pill-dark-text: #d4f7c8;',
    Express:
      '--pill-border: #a1a1aa; --pill-bg: rgba(161, 161, 170, 0.12); --pill-text: #56565f; --pill-dark-bg: rgba(113, 113, 122, 0.18); --pill-dark-text: #f0f0f3;',
    SQLite3:
      '--pill-border: #6fc3ff; --pill-bg: rgba(111, 195, 255, 0.14); --pill-text: #0b5f95; --pill-dark-bg: rgba(0, 119, 181, 0.18); --pill-dark-text: #b8e3ff;',
    PWA:
      '--pill-border: #ff7b84; --pill-bg: rgba(255, 123, 132, 0.14); --pill-text: #a33a47; --pill-dark-bg: rgba(244, 63, 94, 0.14); --pill-dark-text: #ffd0d5;',
    ESP32:
      '--pill-border: #fca5a5; --pill-bg: rgba(252, 165, 165, 0.14); --pill-text: #a24343; --pill-dark-bg: rgba(239, 68, 68, 0.14); --pill-dark-text: #ffe0e0;',
    'C++':
      '--pill-border: #8fb5ff; --pill-bg: rgba(143, 181, 255, 0.14); --pill-text: #2e5ab3; --pill-dark-bg: rgba(59, 130, 246, 0.16); --pill-dark-text: #dce8ff;',
    HTTP:
      '--pill-border: #fdba74; --pill-bg: rgba(253, 186, 116, 0.14); --pill-text: #9a5718; --pill-dark-bg: rgba(251, 146, 60, 0.16); --pill-dark-text: #ffe3c7;',
    JavaScript:
      '--pill-border: #f7df5e; --pill-bg: rgba(247, 223, 94, 0.16); --pill-text: #735d00; --pill-dark-bg: rgba(250, 204, 21, 0.16); --pill-dark-text: #fff0a8;',
    'Distributed Systems':
      '--pill-border: #c7b3ff; --pill-bg: rgba(199, 179, 255, 0.14); --pill-text: #6942b0; --pill-dark-bg: rgba(168, 85, 247, 0.14); --pill-dark-text: #ede2ff;'
  };

  function getTechPillStyle(tech: string) {
    return (
      techPillStyles[tech] ??
      '--pill-border: rgba(148, 163, 184, 0.45); --pill-bg: rgba(148, 163, 184, 0.12); --pill-text: #4b5563; --pill-dark-bg: rgba(148, 163, 184, 0.16); --pill-dark-text: #e2e8f0;'
    );
  }

  let { project, delay = 0 }: { project: Project; delay?: number } = $props();
  let isVideo = $derived(project.preview?.endsWith('.webm') ?? false);
  let videoElement = $state<HTMLVideoElement>();
  let shouldLoadVideo = $state(false);

  onMount(() => {
    if (!isVideo || !videoElement) return;

    if (!('IntersectionObserver' in window)) {
      shouldLoadVideo = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        shouldLoadVideo = true;
        observer.disconnect();
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(videoElement);

    return () => observer.disconnect();
  });
</script>

<article class="reveal group flex h-full flex-col overflow-hidden rounded-apple border border-border bg-card p-3 shadow-soft transition duration-300 hover:-translate-y-2 hover:shadow-hover" use:reveal={delay}>
  <div class="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-muted">
    {#if project.preview}
      {#if isVideo}
        <video
          bind:this={videoElement}
          src={shouldLoadVideo ? project.preview : undefined}
          class="h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]"
          autoplay={shouldLoadVideo}
          loop
          muted
          playsinline
          preload="none"
          aria-label={`${project.title} preview video`}
        ></video>
      {:else}
        <img src={project.preview} alt="" class="h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]" />
      {/if}
    {:else}
      <div class="absolute inset-0" style={`background: ${project.accent}`}></div>
      <div class="absolute inset-5 rounded-[1.5rem] border border-white/24 bg-white/16 dark:bg-black/16"></div>
      <div class="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-[#fff7ed]/88 p-4 shadow-lg dark:bg-slate-950/82">
        <div class="mb-3 h-2 w-24 rounded-full bg-orange-200 dark:bg-slate-700"></div>
        <div class="grid grid-cols-4 gap-2">
          <span class="h-12 rounded-2xl bg-orange-50 dark:bg-slate-800"></span>
          <span class="h-12 rounded-2xl bg-orange-50 dark:bg-slate-800"></span>
          <span class="h-12 rounded-2xl bg-orange-50 dark:bg-slate-800"></span>
          <span class="h-12 rounded-2xl bg-orange-50 dark:bg-slate-800"></span>
        </div>
      </div>
    {/if}
    <div class="absolute right-4 top-4 rounded-full bg-[#fff7ed]/92 px-3 py-1 text-xs font-bold text-orange-950 shadow-sm dark:bg-slate-950/86 dark:text-white">
      Preview
    </div>
  </div>

  <div class="flex flex-1 flex-col p-5">
    <h3 class="text-2xl font-black tracking-normal">{project.title}</h3>
    <p class="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>

    <div class="mt-5 flex flex-wrap gap-2">
      {#each project.tech as tech}
        <span class="tech-pill rounded-full px-3 py-1 text-xs font-semibold" style={getTechPillStyle(tech)}>
          {tech}
        </span>
      {/each}
    </div>

    <ul class="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
      {#each project.highlights as highlight}
        <li class="flex gap-3">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span>
          <span>{highlight}</span>
        </li>
      {/each}
    </ul>

    <div class="mt-auto flex flex-wrap gap-2 pt-7">
      <!-- Replace project URLs with production links. -->
      <a class="button-primary !px-4 !py-2.5" href={project.demoHref} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Live Demo</a>
      <a class="button-secondary !px-4 !py-2.5" href={project.githubHref} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
    </div>
  </div>
</article>

<style>
  .tech-pill {
    border: 2px solid var(--pill-border);
    background: var(--pill-bg);
    color: var(--pill-text);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  :global(.dark) .tech-pill {
    border-color: var(--pill-dark-border, var(--pill-border));
    background: var(--pill-dark-bg, var(--pill-bg));
    color: var(--pill-dark-text, var(--pill-text));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
</style>
