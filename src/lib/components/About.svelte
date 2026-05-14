<script lang="ts">
  import { GraduationCap, Sparkles } from 'lucide-svelte';
  import { reveal } from '$lib/reveal';
</script>

<section id="about" class="section-shell py-20 sm:py-28">
  <div class="reveal surface grid gap-8 rounded-apple p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" use:reveal={0}>
    <div>
      <p class="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">About</p>
      <h2 class="mt-3 text-4xl font-black tracking-normal sm:text-6xl">Practical software, carefully finished.</h2>
    </div>

    <div class="space-y-5">
      <div class="flex gap-4">
        <div class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-muted">
          <GraduationCap size={22} />
        </div>
        <p class="text-lg leading-8 text-muted-foreground">
          I’m a computer science graduate and full-stack developer focused on building practical software that solves real problems. I enjoy working on real-time systems, dashboards, automation, and clean user interfaces.
        </p>
      </div>
      <div class="flex gap-4 rounded-[2rem] bg-muted/65 p-5">
        <Sparkles class="mt-1 shrink-0 text-accent" size={20} />
        <p class="text-sm leading-6 text-muted-foreground">
          The through-line in my work is dependable systems wrapped in interfaces people can understand quickly.
        </p>
      </div>
    </div>
  </div>
</section>
