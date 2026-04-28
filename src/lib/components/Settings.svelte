<script lang="ts">
  import VoiceSelect from './VoiceSelect.svelte';
  import TestButton from './TestButton.svelte';

  interface Props {
    visible?: boolean;
    voices: SpeechSynthesisVoice[];
    onvoicechange?: (voice: SpeechSynthesisVoice) => void;
    ontest?: () => void;
  }

  let { visible = false, voices, onvoicechange, ontest }: Props = $props();
  let testDisabled = $state(true);
</script>

<div id="settings" class:hidden={!visible} class="settings">
  <h2>Voice Select</h2>
  <p>ERROR: GLaDOS voice was not found.</p>
  <p>Please select one of the provided replacement voices.</p>
  <p>Being content with the default selection is permissible.</p>
  <div class="row">
    <VoiceSelect
      {voices}
      onchange={onvoicechange}
      onenabledchanged={(isDisabled) => (testDisabled = isDisabled)}
    />
    <TestButton disabled={testDisabled} onclick={ontest} />
  </div>
  <p>
    If you are happy with
    <span class="strike" aria-hidden="true">your</span>
    the selection. Press the ▷ button.
  </p>
</div>

<style>
  #settings {
    .row {
      display: flex;
      flex-flow: row wrap;

      gap: 1rem;

      justify-content: space-between;
    }
  }
</style>
