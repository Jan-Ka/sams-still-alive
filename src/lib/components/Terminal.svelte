<script lang="ts">
  let { visible = false }: { visible?: boolean } = $props();
</script>

<div id="terminal" class:hidden={!visible} class="terminal">
  <p>ERROR: missing halflife3.dll</p>
  <p>ERROR: Automatic repair malfunction</p>
  <p>WARN: repair is not possible in this time continuum</p>
</div>
