<script lang="ts">
  import { base } from '$app/paths';
  import { appConfig } from '$lib/config';

  const ogImage = `${appConfig.url.replace(/\/$/, '')}${appConfig.ogImagePath}`;
  const favicon = `${base}${appConfig.faviconPath}`;
</script>

<svelte:head>
  <title>{appConfig.name}</title>
  <meta name="description" content={appConfig.description} />

  <meta property="og:title" content={appConfig.name} />
  <meta property="og:type" content="website" />
  <meta property="og:description" content={appConfig.description} />
  <meta property="og:url" content={appConfig.url} />
  <meta property="og:image" content={ogImage} />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={appConfig.twitterDomain} />
  <meta property="twitter:url" content={appConfig.url} />
  <meta property="twitter:title" content={appConfig.name} />
  <meta property="twitter:description" content={appConfig.description} />
  <meta property="twitter:image" content={ogImage} />

  <link rel="shortcut icon" href={favicon} type="image/x-icon" />
</svelte:head>
