<script lang="ts">
    import axios from "axios";
  import BarcodeScanner from "./components/BarcodeScanner.svelte";
  import Sidebar from "./components/Sidebar.svelte";

  function onSubmit(e: SubmitEvent)
  {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData);

    axios.post('http://127.0.0.1:3000/api/products', formData)
    .then(({data}) => console.log(data))
    .catch((e) => console.log(e))
  }
</script>


<div class="flex h-screen">
  <Sidebar/>

  <main class="w-full">
    <h1>Création d'un produit</h1>

    <form onsubmit={onSubmit}>
      <BarcodeScanner/>

      <label class="flex flex-col">
        <span class="label">Nom</span>
        <input class="input" type="text" name="name"/>
      </label>

      <label class="flex flex-col">
        <span class="label">Libellé de vente</span>
        <input class="input" type="text" name="sales_label"/>
      </label>

      <label class="flex flex-col">
        <span class="label">Libellé (étiquette)</span>
        <input class="input" type="text" name="tag_label"/>
      </label>

      <button class="btn btn-primary" type="submit">Enregistrer</button>
    </form>
  </main>
</div>