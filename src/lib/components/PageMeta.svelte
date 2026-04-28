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

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:domain" content={appConfig.twitterDomain} />
  <meta name="twitter:url" content={appConfig.url} />
  <meta name="twitter:title" content={appConfig.name} />
  <meta name="twitter:description" content={appConfig.description} />
  <meta name="twitter:image" content={ogImage} />

  <link rel="shortcut icon" href={favicon} type="image/x-icon" />
</svelte:head>
