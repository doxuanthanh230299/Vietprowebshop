import Http from './Http';

export const getProducts = (config) => Http.get('products', config);

export const getProduct = (id, config) => Http.get(`products/${id}`, config);

export const getCategories = (config) => Http.get('categories', config);

export const getProductsCategory = (id, config) => Http.get(`categories/${id}/products`, config);

export const getCategoryInfoId = (id, config) => Http.get(`categories/${id}`, config);

export const getCommentsProduct = (id, config) => Http.get(`products/${id}/comments`, config);

export const createCommentProduct = (id, data, config) => {
  return Http.post(`products/${id}/comments`, data, config);
};

export const order = (data, config) => Http.post('/order', data, config);
