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
  <div class="relative min-h-56 overflow-hidden rounded-[2rem] bg-muted">
    {#if project.preview}
      {#if isVideo}
        <video
          bind:this={videoElement}
          src={shouldLoadVideo ? project.preview : undefined}
          class="h-full min-h-56 w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]"
          autoplay={shouldLoadVideo}
          loop
          muted
          playsinline
          preload="none"
          aria-label={`${project.title} preview video`}
        ></video>
      {:else}
        <img src={project.preview} alt="" class="h-full min-h-56 w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]" />
      {/if}
    {:else}
      <div class="absolute inset-0" style={`background: ${project.accent}`}></div>
      <div class="absolute inset-5 rounded-[1.5rem] border border-white/24 bg-white/16 dark:bg-black/16"></div>
      <div class="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/88 p-4 shadow-lg dark:bg-slate-950/82">
        <div class="mb-3 h-2 w-24 rounded-full bg-slate-300 dark:bg-slate-700"></div>
        <div class="grid grid-cols-4 gap-2">
          <span class="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800"></span>
          <span class="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800"></span>
          <span class="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800"></span>
          <span class="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800"></span>
        </div>
      </div>
    {/if}
    <div class="absolute right-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-slate-900 shadow-sm dark:bg-slate-950/86 dark:text-white">
      Preview
    </div>
  </div>

  <div class="flex flex-1 flex-col p-5">
    <h3 class="text-2xl font-black tracking-normal">{project.title}</h3>
    <p class="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>

    <div class="mt-5 flex flex-wrap gap-2">
      {#each project.tech as tech}
        <span class="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{tech}</span>
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
