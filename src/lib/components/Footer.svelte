<script lang="ts">
  import { appConfig, appVersion } from '$lib/config';
</script>

<footer>
  <span>`Still Alive` by Jonathon Coulton</span>
  <span>Sequenced by Andrew Coccimiglio</span>
  <span>Adapted by Jan Kaltenecker</span>
  <span>
    <a href={appConfig.repoUrl} target="_self">v{appVersion} Code on GitHub</a>
  </span>
</footer>

<style lang="scss">
  @use '../styles/vars' as *;

  footer {
    min-height: 2rem;

    flex: 0 1 1rem;

    padding: 0.25rem;
    border: 1px dashed $amber;
    vertical-align: baseline;
    line-height: 1rem;

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    a {
      color: $amber;
    }
  }
</style>
