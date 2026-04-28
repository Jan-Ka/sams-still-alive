<script lang="ts">
  import { appConfig, appVersion } from '$lib/config';
</script>

<footer>
  <span>`Still Alive` by Jonathan Coulton</span>
  <span>Sequenced by Andrew Coccimiglio</span>
  <span>Adapted by Jan Kaltenecker</span>
  <span>
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a href={appConfig.repoUrl} target="_self">v{appVersion} Code on GitHub</a>
  </span>
</footer>

<style>
  footer {
    min-height: 2rem;

    flex: 0 1 1rem;

    padding: 0.25rem;
    border: 1px dashed var(--amber);
    vertical-align: baseline;
    line-height: 1rem;

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    a {
      color: var(--amber);
    }
  }
</style>
