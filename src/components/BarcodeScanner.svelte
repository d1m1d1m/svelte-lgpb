<script lang="ts">
  import { Search } from "@lucide/svelte";

  interface Props {
    inputName: string;
    bindTo: string;
  }

  let { inputName, bindTo } : Props = $props();
</script>

<label class="input">
  <Search class="h-[1.25em] opacity-50"/>
  <input
    name="{inputName}"
    type="search"
    placeholder="Scannez pour chercher"
    bind:value={bindTo}
    required
  />
</label>