<script lang="ts">
  let { visible = true }: { visible?: boolean } = $props();
</script>

<div id="instructions" class:hidden={!visible} class="instructions">
  <p>Please press the ◉ Button above to begin Setup.</p>
  <p>This is necessary because modern Browsers keep Websites from playing random crap if you don't want to.</p>
  <p>They really do you a favor. So, please, click the ◉ Button.</p>
</div>
