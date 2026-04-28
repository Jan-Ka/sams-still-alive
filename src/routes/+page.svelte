<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Instructions from '$lib/components/Instructions.svelte';
  import Settings from '$lib/components/Settings.svelte';
  import Terminal from '$lib/components/Terminal.svelte';
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
  import ControlButton, {
    CONTROL_BUTTON_STATES,
    type ControlStage
  } from '$lib/components/ControlButton.svelte';
  import { Sam } from '$lib/Sam';
  import { Caroline } from '$lib/Caroline';

  type PreloadState = 'idle' | 'loading' | 'ready' | 'error';

  let stage = $state<ControlStage>(CONTROL_BUTTON_STATES.SETUP);
  let voices = $state<SpeechSynthesisVoice[]>([]);
  let controlRef = $state<HTMLButtonElement | undefined>();
  let preloadState = $state<PreloadState>('idle');

  let sam: Sam | undefined;
  let caroline: Caroline | undefined;

  let instructionsVisible = $derived(stage === CONTROL_BUTTON_STATES.SETUP);
  let settingsVisible = $derived(stage === CONTROL_BUTTON_STATES.PLAY);
  let terminalVisible = $derived(stage === CONTROL_BUTTON_STATES.STOP);

  onMount(() => {
    if (!browser) return;

    sam = new Sam();
    caroline = new Caroline();

    sam.onvoiceschanged = (newVoices) => {
      voices = newVoices;
    };

    caroline.onwanttospeek = (note) => {
      sam?.saySentence(note.text);
    };

    sam.updateVoices();
    controlRef?.focus();
  });

  function startPreload() {
    if (!caroline || preloadState !== 'idle') return;
    preloadState = 'loading';
    caroline
      .preload()
      .then(() => {
        preloadState = 'ready';
      })
      .catch((err) => {
        console.error('Caroline preload failed', err);
        preloadState = 'error';
      });
  }

  async function handleControl() {
    switch (stage) {
      case CONTROL_BUTTON_STATES.SETUP:
        stage = CONTROL_BUTTON_STATES.PLAY;
        startPreload();
        break;
      case CONTROL_BUTTON_STATES.PLAY:
        try {
          await caroline?.startPlaying();
          stage = CONTROL_BUTTON_STATES.STOP;
        } catch (err) {
          console.error('Caroline.startPlaying failed', err);
          preloadState = 'error';
        }
        break;
      case CONTROL_BUTTON_STATES.STOP:
        caroline?.stopPlaying();
        stage = CONTROL_BUTTON_STATES.PLAY;
        break;
    }
  }

  function handleVoiceChange(voice: SpeechSynthesisVoice) {
    sam?.changeVoice(voice);
    sam?.sayRandom();
  }

  function handleTest() {
    sam?.sayRandom();
  }
</script>

<div class="container crt">
  <Header />
  <main>
    <div class="controls">
      <ControlButton {stage} bind:ref={controlRef} onclick={handleControl} />
    </div>
    <Instructions visible={instructionsVisible} />
    <Settings
      visible={settingsVisible}
      {voices}
      onvoicechange={handleVoiceChange}
      ontest={handleTest}
    />
    <Terminal visible={terminalVisible} />
    {#if preloadState === 'loading'}
      <LoadingIndicator label="Loading audio engine" />
    {:else if preloadState === 'error'}
      <p class="preload-error">ERROR: failed to load audio engine. Try reloading.</p>
    {/if}
  </main>
  <Footer />
</div>

<style>
  main {
    padding: 1rem;
    flex: 1 1 auto;

    display: flex;
    flex-flow: column wrap;

    .controls {
      margin: 1rem;

      display: flex;
      justify-content: center;
    }
  }

  .preload-error {
    color: var(--amber);
    text-align: center;
    margin-top: 1rem;
  }
</style>
