<script lang="ts" module>
  export const CONTROL_BUTTON_STATES = {
    SETUP: 0,
    PLAY: 1,
    STOP: 2
  } as const;

  export type ControlStage = (typeof CONTROL_BUTTON_STATES)[keyof typeof CONTROL_BUTTON_STATES];
</script>

<script lang="ts">
  interface Props {
    stage: ControlStage;
    onclick?: (event: MouseEvent) => void;
    ref?: HTMLButtonElement;
  }

  let { stage, onclick, ref = $bindable() }: Props = $props();

  const icons: Record<ControlStage, string> = {
    [CONTROL_BUTTON_STATES.SETUP]: '◉',
    [CONTROL_BUTTON_STATES.PLAY]: '▷',
    [CONTROL_BUTTON_STATES.STOP]: '▧'
  };
</script>

<button
  id="control"
  bind:this={ref}
  aria-label="Control Button"
  data-stage={stage}
  data-playing={stage === CONTROL_BUTTON_STATES.STOP}
  {onclick}
>
  {icons[stage]}
</button>

<style>
  #control {
    width: 6rem;
    height: 6rem;
    font-size: 4rem;
    align-self: flex-end;

    color: var(--amber);
    border: 1px solid var(--amber);
    border-radius: 4px;
    background: var(--background);

    &:disabled {
      color: var(--disabled);
      border-color: var(--disabled);
      border-style: dashed;
    }

    &:focus {
      outline: var(--amber);
      animation: pulsate 1s alternate infinite;
    }
  }

  @keyframes pulsate {
    0% {
      box-shadow: 0 0.1rem 0.5rem color-mix(in srgb, var(--amber) 0%, transparent);
    }
    50% {
      box-shadow: 0 0.1rem 0.5rem color-mix(in srgb, var(--amber) 40%, transparent);
    }
    100% {
      box-shadow: 0 0.1rem 0.5rem color-mix(in srgb, var(--amber) 80%, transparent);
    }
  }
</style>
