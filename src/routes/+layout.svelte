<script lang="ts">
  import '$lib/styles/global.css';
  import PageMeta from '$lib/components/PageMeta.svelte';

  let { children } = $props();
</script>

<PageMeta />

{@render children?.()}
