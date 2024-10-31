import api from "../api";
// it will return a function that will return the categories of the product and the producs for the specific page

export async function  productWithGroupOfExtra(product) {
    const resource = `products/${product}/product_with_group_of_extra`;
    const data = await  api.get(resource);
    console.log("productWithGroupOfExtra data:", data);
    return data.data.data[0];
  };

  // get the product and the extras for the specific product
  // it will return a function that will return the product and the extras for the specific product
  export async function  productGroupOfExtras(product) {
    const data = await productWithGroupOfExtra(product);
    console.log("productGroupOfExtras data:", data);
    return data.data.data[0];
  };

