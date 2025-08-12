<script lang="ts">
  import { ChevronDown } from "@lucide/svelte";
  import { useComboBox } from "./ComboBoxState.svelte.js";

  interface Props {
    name: string;
    options: { value: number; label: string }[];
    value?: number;
    disabled?: boolean;

    onSelect?: (value : number) => void;
  }

  let {
    value = $bindable(0),
    name,
    options,
    disabled = false,
    onSelect
  }: Props = $props();

  let comboBoxItemsRef: HTMLDivElement;

  let combo = useComboBox(options);

  // Open handling
  let isOpen = $state(false);
  
  function toggleOpen() {
    isOpen = !isOpen;
  }

  function close() {
    isOpen = false;
  }

  // Filters for names
  let selectedFilterOptions = $derived(
    options.find((opt) => opt.value === value)?.label || 'Sélectionner une catégorie'
  );
  let searchFilterOptions = $derived(
    options.filter((opt) =>
      opt.label.toLowerCase().includes(combo.searchQuery.toLowerCase())
    )
  );

  function selectOption(newValue: number) {
    value = newValue;
    combo.searchQuery = '';
    close();

    if(!onSelect) return;

    onSelect(newValue);
  }

  // Ferme au clic à l’extérieur
  $effect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (isOpen && !comboBoxItemsRef?.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  });
</script>

<div class="relative w-full" bind:this={comboBoxItemsRef}>
  <input type="hidden" value={value} name={name}>
  <label
    class="input input-sm cursor-pointer focus-within:outline-none"
  >
    <input
      class="cursor-pointer placeholder:text-current"
      type="text"
      placeholder={selectedFilterOptions}
      bind:value={combo.searchQuery}
      readonly={!isOpen}
      onfocus={toggleOpen}
      disabled={disabled}
    />
    <ChevronDown class="h-[1.25em] opacity-50" />
  </label>

  {#if isOpen}
    <div
      class="menu menu-sm absolute bg-base-100 border-base-300 w-full mt-2 border shadow-xs rounded-box max-h-48 overflow-auto z-10"
    >
      <ul>
        {#each searchFilterOptions as opt (opt.value)}
          {@render ComboBoxItem(opt)}
        {:else}
          <li>
            <span>Pas de correspondances</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

{#snippet ComboBoxItem(option : { value: number, label: string })}
  <li>
    <label class="has-checked:bg-black/10">
      <input
        hidden
        type="radio"
        value={option.value}
        name={name}
        checked={value === option.value}
        onclick={() => selectOption(option.value)}
      />
      <span>{option.label}</span>
    </label>
  </li>
{/snippet}