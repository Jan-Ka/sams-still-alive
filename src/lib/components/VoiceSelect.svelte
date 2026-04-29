<script lang="ts" module>
  const STORAGE_KEY = 'sams-still-alive:selected-voice-uri';
  const TIER_RE = /\s*\((Premium|Enhanced|Compact|Eloquence)\)\s*$/i;
</script>

<script lang="ts">
  import { browser } from '$app/environment';

  type Tier = 'Premium' | 'Enhanced' | 'Compact' | 'Eloquence' | null;

  type VoiceOption = {
    key: string;
    voice: SpeechSynthesisVoice;
    displayName: string;
    tier: Tier;
    lang: string;
    primaryLang: string;
    langLabel: string;
    primaryLangLabel: string;
  };

  type Group = { lang: string; label: string; options: VoiceOption[] };

  interface Props {
    voices: SpeechSynthesisVoice[];
    onchange?: (voice: SpeechSynthesisVoice) => void;
    onenabledchanged?: (isDisabled: boolean) => void;
  }

  let { voices, onchange, onenabledchanged }: Props = $props();

  let search = $state('');
  let localOnly = $state(false);
  let myLangOnly = $state(false);
  let selectedKey = $state('');

  const myLang = browser ? (navigator.language.split('-')[0] || '').toLowerCase() : '';
  const langDisplay = browser
    ? new Intl.DisplayNames([navigator.language], { type: 'language' })
    : null;
  const regionDisplay = browser
    ? new Intl.DisplayNames([navigator.language], { type: 'region' })
    : null;

  function labelForLang(tag: string, primaryOnly: boolean): string {
    const [lang, region] = tag.split('-');
    const langName = langDisplay?.of(lang) ?? lang;
    if (primaryOnly || !region) return langName;
    const regionName = regionDisplay?.of(region.toUpperCase()) ?? region;
    return `${langName} (${regionName})`;
  }

  const options = $derived<VoiceOption[]>(
    voices
      .map((voice) => {
        const tierMatch = voice.name.match(TIER_RE);
        const tier = (tierMatch ? tierMatch[1] : null) as Tier;
        const displayName = tier ? voice.name.replace(TIER_RE, '').trim() : voice.name;
        const primaryLang = (voice.lang.split('-')[0] || voice.lang).toLowerCase();
        return {
          key: voice.voiceURI,
          voice,
          displayName,
          tier,
          lang: voice.lang,
          primaryLang,
          langLabel: labelForLang(voice.lang, false),
          primaryLangLabel: labelForLang(voice.lang, true)
        };
      })
      .sort((a, b) => {
        const byLang = a.primaryLangLabel.localeCompare(b.primaryLangLabel);
        return byLang === 0 ? a.displayName.localeCompare(b.displayName) : byLang;
      })
  );

  const filtered = $derived.by(() => {
    const q = search.trim().toLowerCase();
    return options.filter((o) => {
      if (localOnly && !o.voice.localService) return false;
      if (myLangOnly && myLang && o.primaryLang !== myLang) return false;
      if (!q) return true;
      return (
        o.displayName.toLowerCase().includes(q) ||
        o.lang.toLowerCase().includes(q) ||
        o.langLabel.toLowerCase().includes(q) ||
        o.primaryLangLabel.toLowerCase().includes(q) ||
        (o.tier?.toLowerCase().includes(q) ?? false)
      );
    });
  });

  const grouped = $derived.by<Group[]>(() => {
    const byLang: Record<string, Group> = {};
    for (const o of filtered) {
      let g = byLang[o.primaryLang];
      if (!g) {
        g = { lang: o.primaryLang, label: o.primaryLangLabel, options: [] };
        byLang[o.primaryLang] = g;
      }
      g.options.push(o);
    }
    const groups = Object.values(byLang);
    for (const g of groups) {
      g.options.sort((a, b) => a.displayName.localeCompare(b.displayName));
    }
    return groups.sort((a, b) => a.label.localeCompare(b.label));
  });

  let isDisabled = $derived(options.length === 0);

  let userPicked = false;
  $effect(() => {
    if (options.length === 0) {
      selectedKey = '';
      return;
    }
    if (userPicked) {
      if (options.some((o) => o.key === selectedKey)) return;
      const fallback = options.find((o) => o.voice.default) ?? options[0];
      selectedKey = fallback.key;
      onchange?.(fallback.voice);
      return;
    }
    let stored: string | null = null;
    if (browser) {
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
    }
    const fromStorage = stored ? options.find((o) => o.key === stored) : undefined;
    const fallback = options.find((o) => o.voice.default) ?? options[0];
    const pick = fromStorage ?? fallback;
    if (pick.key === selectedKey) return;
    selectedKey = pick.key;
    onchange?.(pick.voice);
  });

  $effect(() => {
    onenabledchanged?.(isDisabled);
  });

  function persist(key: string) {
    if (!browser) return;
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {
      /* quota / privacy mode — ignore */
    }
  }

  function handleSelect(option: VoiceOption) {
    userPicked = true;
    selectedKey = option.key;
    persist(option.key);
    onchange?.(option.voice);
  }

  function jumpToDefault() {
    const def = options.find((o) => o.voice.default);
    if (def) handleSelect(def);
  }
</script>

<div class="voice-select">
  <div class="toolbar">
    <input
      type="search"
      class="search"
      placeholder="Search voices…"
      bind:value={search}
      disabled={isDisabled}
      aria-label="Search voices"
    />
    <div class="chips" role="group" aria-label="Voice filters">
      <label class="chip" class:active={localOnly}>
        <input type="checkbox" bind:checked={localOnly} disabled={isDisabled} />
        Local only
      </label>
      <label class="chip" class:active={myLangOnly} class:hidden={!myLang}>
        <input type="checkbox" bind:checked={myLangOnly} disabled={isDisabled} />
        My language
      </label>
      <button type="button" class="chip" onclick={jumpToDefault} disabled={isDisabled}>
        ★ Default
      </button>
    </div>
  </div>

  {#if options.length === 0}
    <p class="empty">No voices available on your system.</p>
  {:else if grouped.length === 0}
    <p class="empty">No voices match the current filters.</p>
  {:else}
    <div class="list" role="radiogroup" aria-label="Voice">
      {#each grouped as group (group.lang)}
        <fieldset>
          <legend>{group.label}</legend>
          {#each group.options as option (option.key)}
            <label class="row" class:selected={selectedKey === option.key}>
              <input
                type="radio"
                name="voice"
                value={option.key}
                checked={selectedKey === option.key}
                onchange={() => handleSelect(option)}
              />
              <span class="name">{option.displayName}</span>
              {#if option.voice.default}
                <span class="badge default" title="System default" aria-label="System default">★</span>
              {/if}
              {#if option.tier}
                <span class="badge tier">{option.tier}</span>
              {/if}
              {#if !option.voice.localService}
                <span class="badge net" title="Network voice">network</span>
              {/if}
              <span class="lang">{option.lang}</span>
            </label>
          {/each}
        </fieldset>
      {/each}
    </div>
  {/if}
</div>

<style>
  .voice-select {
    flex: 1 1 100%;
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    color: var(--amber);
    min-width: 0;
  }

  .toolbar {
    display: flex;
    flex-flow: row wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .search {
    flex: 1 1 12rem;
    min-width: 0;
    height: 2rem;
    padding: 0 0.5rem;
    color: var(--amber);
    background: var(--background);
    border: 1px solid var(--amber);
    border-radius: 4px;
    font-family: var(--font-family);
  }
  .search:focus-visible {
    outline: 2px solid var(--amber);
    outline-offset: 2px;
  }
  .search:disabled {
    color: var(--disabled);
    border-color: var(--disabled);
    border-style: dashed;
  }

  .chips {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.1rem 0.6rem;
    border: 1px solid var(--amber);
    border-radius: 999px;
    background: var(--background);
    color: var(--amber);
    font-family: var(--font-family);
    font-size: 0.85rem;
    line-height: 1.6;
    cursor: pointer;
    user-select: none;
  }
  .chip.active {
    background: color-mix(in srgb, var(--amber) 25%, transparent);
  }
  .chip input[type="checkbox"] {
    accent-color: var(--amber);
    margin: 0;
  }
  .chip:disabled,
  .chip:has(input:disabled) {
    color: var(--disabled);
    border-color: var(--disabled);
    border-style: dashed;
    cursor: default;
  }

  .list {
    max-height: 18rem;
    overflow-y: auto;
    border: 1px solid var(--amber);
    border-radius: 4px;
    padding: 0.25rem;
  }

  fieldset {
    border: none;
    border-top: 1px dashed var(--amber);
    margin: 0;
    padding: 0.25rem 0;
    min-width: 0;
  }
  fieldset:first-of-type { border-top: none; }
  legend {
    padding: 0 0.25rem;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.05em;
  }

  .row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto auto auto auto;
    gap: 0.5rem;
    align-items: center;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    border-radius: 2px;
  }
  .row:hover { background: color-mix(in srgb, var(--amber) 12%, transparent); }
  .row.selected { background: color-mix(in srgb, var(--amber) 22%, transparent); }
  .row input[type="radio"] { accent-color: var(--amber); margin: 0; }

  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lang {
    opacity: 0.7;
    font-size: 0.8rem;
    justify-self: end;
    font-variant-numeric: tabular-nums;
  }
  .badge {
    border: 1px solid var(--amber);
    border-radius: 3px;
    padding: 0 0.3rem;
    font-size: 0.7rem;
    line-height: 1.4;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .badge.default {
    border: none;
    padding: 0;
    font-size: 1rem;
    line-height: 1;
  }
  .badge.net {
    opacity: 0.7;
  }

  .empty {
    opacity: 0.7;
    padding: 0.5rem;
    margin: 0;
  }
</style>
