<script lang="ts">
  import { onMount } from "svelte";
  import axiosConfig from "../api/config";

  import ComboBox from "./combobox/ComboBox.svelte";

  let categories = $state<any[]>([]);

  let selectedCategoryId = $state<number>(0);
  let selectedSubCategoryId = $state<number>(0);
  let selectedSubSubCategoryId = $state<number>(0);

  onMount(() => {
    axiosConfig.get('categories').then(({data}) => {
      categories = data.categories;
    });
  });

  // Sous-catégories liées à la catégorie sélectionnée
  let subCategories = $derived(
    categories.find((c) => c.id === selectedCategoryId)?.subCategories ?? []
  );

  // Sous-sous-catégories liées à la sous-catégorie sélectionnée
  let subSubCategories = $derived(
    subCategories.find((sc : any) => sc.id === selectedSubCategoryId)?.subSubCategories ?? []
  );
</script>

<fieldset class="flex flex-col gap-2 py-2">
  <!-- CATEGORIES -->
  <ComboBox
    name="categoryId"
    options={[
      { value: 0, label: "Aucune catégorie" },
      ...categories.map((cat) => { return { value: cat.id, label: cat.name }})
    ]}
    onSelect={() => {
      selectedSubCategoryId = 0;
      selectedSubSubCategoryId = 0;
    }}

    bind:value={selectedCategoryId}
  />

  <!-- SOUS-CATEGORIES -->
  <ComboBox
    name="subCategoryId"
    options={[
      { value: 0, label: "Aucune sous-catégorie" },
      ...subCategories.map((subCat : any) => { return { value: subCat.id, label: subCat.name }})
    ]}
    onSelect={() => {
      selectedSubSubCategoryId = 0;
    }}
    disabled={selectedCategoryId === 0}

    bind:value={selectedSubCategoryId}
  />

  <!-- SOUS-SOUS-CATEGORIES -->
  <ComboBox
    name="subSubCategoryId"
    options={[
      { value: 0, label: "Aucune sous-catégorie" },
      ...subSubCategories.map((subSubCat : any) => { return { value: subSubCat.id, label: subSubCat.name }})
    ]}
    disabled={selectedSubCategoryId === 0}

    bind:value={selectedSubSubCategoryId}
  />
</fieldset>