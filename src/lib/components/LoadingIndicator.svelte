<script lang="ts">
  interface Props {
    label?: string;
  }

  let { label = 'Loading' }: Props = $props();
</script>

<div class="loading" role="status" aria-live="polite">
  <span class="text">{label}</span><span class="dots" aria-hidden="true"></span>
</div>

<style>
  .loading {
    color: var(--amber);
    font-family: var(--font-family);
    font-size: 1rem;
    letter-spacing: 0.1em;
    text-align: center;
    margin-top: 1rem;
    animation: blink 1.2s ease-in-out infinite;
  }

  .dots::after {
    content: '...';
    display: inline-block;
    width: 1.5em;
    text-align: left;
    animation: dots 1.4s steps(4, end) infinite;
  }

  @keyframes dots {
    0% { content: ''; }
    25% { content: '.'; }
    50% { content: '..'; }
    75%, 100% { content: '...'; }
  }

  @keyframes blink {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 1; }
  }
</style>
