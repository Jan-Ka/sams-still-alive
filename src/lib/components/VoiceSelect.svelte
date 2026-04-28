<script lang="ts">
  import { slugify } from '$lib/Utils';

  type VoiceOption = { key: string; voice: SpeechSynthesisVoice };

  interface Props {
    voices: SpeechSynthesisVoice[];
    onchange?: (voice: SpeechSynthesisVoice) => void;
    onenabledchanged?: (isDisabled: boolean) => void;
  }

  let { voices, onchange, onenabledchanged }: Props = $props();

  let options = $derived.by<VoiceOption[]>(() =>
    voices
      .map((voice) => ({ key: slugify(voice.name), voice }))
      .sort((a, b) => {
        const byLang = a.voice.lang.localeCompare(b.voice.lang);
        return byLang === 0 ? a.voice.name.localeCompare(b.voice.name) : byLang;
      })
  );

  let longestNameLength = $derived(
    options.reduce((max, o) => (o.voice.name.length > max ? o.voice.name.length : max), 0)
  );

  let isDisabled = $derived(options.length === 0);
  let selectedKey = $state('');

  $effect(() => {
    if (options.length === 0) {
      selectedKey = '';
      return;
    }
    const stillExists = options.some((o) => o.key === selectedKey);
    if (!stillExists) {
      const def = options.find((o) => o.voice.default) ?? options[0];
      selectedKey = def.key;
    }
  });

  $effect(() => {
    onenabledchanged?.(isDisabled);
  });

  function handleChange() {
    const found = options.find((o) => o.key === selectedKey);
    if (found) {
      onchange?.(found.voice);
    }
  }
</script>

<select
  id="voice"
  name="voice"
  disabled={isDisabled}
  bind:value={selectedKey}
  onchange={handleChange}
>
  {#if options.length === 0}
    <option>No Voices available on your System</option>
  {:else}
    {#each options as option (option.key)}
      <option value={option.key}>
        {option.voice.name.padEnd(longestNameLength, ' ')} ({option.voice.lang})
      </option>
    {/each}
  {/if}
</select>

<style lang="scss">
  @use '../styles/vars' as *;

  #voice {
    color: $amber;

    height: 2rem;
    font-family: $font-family;
    line-height: 2rem;
    flex-grow: 1;

    @include styled-border;

    &:focus {
      outline: $amber;
    }
  }
</style>
