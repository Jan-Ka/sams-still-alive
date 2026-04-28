<script lang="ts">
  import '$lib/styles/global.scss';
  import PageMeta from '$lib/components/PageMeta.svelte';

  let { children } = $props();
</script>

<PageMeta />

{@render children?.()}
