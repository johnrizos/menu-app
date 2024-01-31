import api from '../api';
// it will return a function that will return the categories of the product and the producs for the specific page

const allProductCategories = (productCategoryId) => {

    const resource = `pages/${productCategoryId}/product_categories`;
    console.log("api", api);
    return api.get(resource)
}

export default allProductCategories;
