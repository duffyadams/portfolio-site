<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';

  let { children } = $props();

  onMount(() => {
    const stored = localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark', stored ? stored === 'dark' : true);
  });
</script>

{@render children()}
