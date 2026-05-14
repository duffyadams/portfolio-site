<script lang="ts">
  import { FileDown, Github, Linkedin, Menu, Terminal, X } from 'lucide-svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  let open = $state(false);

  const links = [
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#about', label: 'About' }
  ];
</script>

<header class="fixed inset-x-0 top-0 z-50 px-4 pt-4">
  <nav
    class="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/80 bg-background/92 px-4 py-3 shadow-sm backdrop-blur-xl transition-colors dark:bg-background/88 sm:px-5"
    aria-label="Primary navigation"
  >
    <a href="#top" class="flex items-center gap-3 rounded-full focus-visible:outline-offset-8">
      <span class="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-black text-primary-foreground">DA</span>
      <span class="hidden text-sm font-semibold sm:block">Duffy Adams</span>
    </a>

    <div class="hidden items-center gap-7 md:flex">
      {#each links as link}
        <a class="text-sm font-medium text-muted-foreground transition hover:text-foreground" href={link.href}>{link.label}</a>
      {/each}
    </div>

    <div class="hidden items-center gap-2 md:flex">
      <!-- Replace these href values with your live profiles. -->
      <a class="button-secondary !h-11 !px-4" href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub profile">
        <Github size={17} /> GitHub
      </a>
      <a class="button-secondary !h-11 !px-4" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
        <Linkedin size={17} /> LinkedIn
      </a>
      <a class="button-secondary !h-11 !w-11 !px-0" href="/assets/resume.pdf" download="Duffy-Adams-Resume.pdf" aria-label="Download resume">
        <FileDown size={17} />
      </a>
      <a class="button-secondary !h-11 !w-11 !px-0" href="/terminal/index.html" aria-label="Open Terminal Mode">
        <Terminal size={17} />
      </a>
      <ThemeToggle />
    </div>

    <div class="flex items-center gap-2 md:hidden">
      <ThemeToggle />
      <button
        type="button"
        class="grid h-11 w-11 place-items-center rounded-full border border-border bg-card"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onclick={() => (open = !open)}
      >
        {#if open}
          <X size={19} />
        {:else}
          <Menu size={19} />
        {/if}
      </button>
    </div>
  </nav>

  {#if open}
    <div class="mx-auto mt-3 max-w-7xl rounded-card border border-border bg-background p-3 shadow-soft md:hidden">
      <div class="grid gap-1">
        {#each links as link}
          <a class="rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-muted" href={link.href} onclick={() => (open = false)}>{link.label}</a>
        {/each}
        <a class="rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-muted" href="/terminal/index.html">Terminal Mode</a>
        <a class="rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-muted" href="/assets/resume.pdf" download="Duffy-Adams-Resume.pdf">Download Resume</a>
      </div>
    </div>
  {/if}
</header>
