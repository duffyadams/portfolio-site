<script lang="ts">
  import { Bot, Braces, Database, Layers3, Server, Wrench } from 'lucide-svelte';
  import { reveal } from '$lib/reveal';

  const groups = [
    { title: 'Frontend', icon: Braces, skills: ['Svelte', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind'], span: 'lg:col-span-2' },
    { title: 'Backend', icon: Server, skills: ['Python', 'Flask', 'REST APIs', 'SQLite'], span: '' },
    { title: 'Systems/Data', icon: Database, skills: ['Scraping', 'Background workers', 'Geocoding', 'Real-time updates'], span: '' },
    { title: 'Tools', icon: Wrench, skills: ['Git', 'Playwright', 'Linux', 'Docker/Proxmox', 'Supabase'], span: 'lg:col-span-2' },
    { title: 'AI', icon: Bot, skills: ['OpenAI API', 'LLM summaries', 'AI image workflows'], span: '' }
  ];
</script>

<section id="skills" class="section-shell py-20 sm:py-28">
  <div class="reveal mb-10" use:reveal={0}>
    <p class="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Technical Range</p>
    <h2 class="mt-3 max-w-3xl text-4xl font-black tracking-normal sm:text-6xl">A full-stack toolkit with systems instincts.</h2>
  </div>

  <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
    {#each groups as group, index}
      <article class={`reveal surface rounded-apple p-7 ${group.span}`} use:reveal={index * 90}>
        <div class="mb-8 flex items-center justify-between">
          <div class="grid h-12 w-12 place-items-center rounded-2xl bg-muted">
            <svelte:component this={group.icon} size={22} />
          </div>
          <Layers3 class="text-muted-foreground/40" size={20} />
        </div>
        <h3 class="text-2xl font-black">{group.title}</h3>
        <div class="mt-5 flex flex-wrap gap-2">
          {#each group.skills as skill}
            <span class="rounded-full bg-muted px-3 py-2 text-sm font-semibold text-muted-foreground">{skill}</span>
          {/each}
        </div>
      </article>
    {/each}
  </div>
</section>
