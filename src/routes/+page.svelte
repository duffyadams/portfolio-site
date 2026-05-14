<script lang="ts">
  import About from '$lib/components/About.svelte';
  import ExperienceTimeline from '$lib/components/ExperienceTimeline.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import SkillsBento from '$lib/components/SkillsBento.svelte';
</script>

<svelte:head>
  <meta property="og:title" content="Duffy Adams | Software Engineer" />
  <meta
    property="og:description"
    content="Recruiter-focused portfolio for Duffy Adams, a software engineer building real-time web apps, dashboards, automation, and polished interfaces."
  />
</svelte:head>

<Navbar />
<main>
  <Hero />
  <Projects />
  <SkillsBento />
  <ExperienceTimeline />
  <About />
</main>
<Footer />
