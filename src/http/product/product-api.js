import api from '../api';
// it will return a function that will return the categories of the product and the producs for the specific page

const productAndExtrasData = (product) => {

    const resource = `products/${product}/product_with_group_of_extra`;
    return api.get(resource)
}

export default productAndExtrasData;
