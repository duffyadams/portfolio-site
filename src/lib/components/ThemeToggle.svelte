<script lang="ts">
  import { Moon, Sun } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let isDark = $state(false);

  function applyTheme(next: boolean) {
    isDark = next;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  onMount(() => {
    isDark = document.documentElement.classList.contains('dark');
  });
</script>

<button
  type="button"
  class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-muted"
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  onclick={() => applyTheme(!isDark)}
>
  {#if isDark}
    <Sun size={18} strokeWidth={2.2} />
  {:else}
    <Moon size={18} strokeWidth={2.2} />
  {/if}
</button>
