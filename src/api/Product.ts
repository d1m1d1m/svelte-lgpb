import axiosConfig from "./config";

class LGPBProduct
{
  public static create( newProductData : any) {
    axiosConfig.post('/products', newProductData)
    .then(({data}) => {
      alert('Nouveau produit ajouté en base de donnée !');
    })
    .catch((e) => {
      if(e.response.data.code === 'P2002') {
        const product = e.response.data.product;
        alert(`Un produit avec le code ${product.sku} existe déjà dans la base de donnée !`);
      }
    })
  }
}

export default LGPBProduct;