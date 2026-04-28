<script lang="ts">
  import { appConfig } from '$lib/config';
</script>

<header>
  <h1 class="title">{appConfig.name}</h1>
</header>

<style lang="scss">
  @use '../styles/vars' as *;

  header {
    height: 2rem;

    flex: 0 1 auto;

    padding: 1rem;
    border: 1px dashed $amber;
    vertical-align: baseline;
    font-size: 2rem;
    line-height: 2rem;

    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
    align-content: space-between;
    justify-content: space-between;
  }

  h1.title {
    display: inline;
    margin: 0;
    font-size: 2rem;
    line-height: 2rem;
  }
</style>
