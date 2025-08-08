<script lang="ts">
  import { Search } from "@lucide/svelte";
  import axios from "axios";

  let skuValue = $state(null);
  let modal : HTMLDialogElement

  function onSkuSubmit(e : SubmitEvent)
  {
    e.preventDefault();
    axios.get(`http://127.0.0.1:3000/api/products/${skuValue}`)
      .then(({data}) => {
        console.log(data);
      })
      .catch((e) => {
        if(e.response.status === 404) {
          modal.showModal();
        }
      });
  }
</script>

<label class="input">
  <Search class="h-[1.25em] opacity-50"/>
  <input bind:value={skuValue} type="search" placeholder="Scannez pour chercher" required/>
</label>

<dialog bind:this={modal} id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Le produit n'existe pas dans votre base de données !</h3>
    <p class="py-4">Voulez-vous créer ce nouveau produit ? (avant toute chose vérifiez si le produit n'a pas changé de code ou de référence !)</p>
    <div class="modal-action">
      <button onclick={(e) => {
        e.preventDefault();
        modal.close();
      }} class="btn btn-primary">Ajouter un nouveau produit !</button>
      <button onclick={(e) => {
        e.preventDefault();
        modal.close();
        skuValue = null;
      }} class="btn btn-error">Annuler</button>
    </div>
  </div>
</dialog>