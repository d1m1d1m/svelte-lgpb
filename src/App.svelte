<script lang="ts">
  import CategorySelect from "./components/CategorySelect.svelte";
  import Sidebar from "./components/Sidebar.svelte";

  let product = $state<any>({
    sku: '',
    name: '',
    sales_label: '',
    tag_label: ''
  });

  function onSubmit(e: SubmitEvent)
  {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    console.log(formData);
  }
</script>


<div class="flex h-screen">
  <Sidebar/>

  <main class="w-full">
    <h1>Fiche produit</h1>

    <div class="flex">
      <form class="flex flex-col" onsubmit={onSubmit}>
        <CategorySelect/>

        <fieldset>
          <label class="flex flex-col">
            <span class="label">Nom</span>
            <input class="input" type="text" name="name" bind:value={product.name}/>
          </label>

          <label class="flex flex-col">
            <span class="label">Libellé de vente</span>
            <input class="input" type="text" name="sales_label" bind:value={product.sales_label}/>
          </label>

          <label class="flex flex-col">
            <span class="label">Libellé (étiquette)</span>
            <input class="input" type="text" name="tag_label" bind:value={product.tag_label}/>
          </label>
        </fieldset>

        <button class="btn btn-primary" type="submit">Enregistrer</button>
      </form>
    </div>
  </main>
</div>