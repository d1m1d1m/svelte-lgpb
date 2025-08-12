export interface Option<T = any>
{
  value: T;
  label: string;
}

export function useComboBox<T = any>(options: Option<T>[]) {
  let currentValue = $state<T | null>(null);
  let searchQuery = $state('');
  let isOpen = $state(false);

  const filteredOptions = $derived(
    options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const selectedLabel = $derived(
    options.find((opt) => opt.value === currentValue)?.label || ''
  );

  function toggle() {
    isOpen = !isOpen;
  }

  function open() {
    isOpen = true;
  }

  function close() {
    isOpen = false;
  }

  function select(value: T) {
    currentValue = value;
    searchQuery = '';
    close();
  }

  return {
    currentValue,
    searchQuery,
    isOpen,
    filteredOptions,
    selectedLabel,
    toggle,
    open,
    close,
    select
  };
}