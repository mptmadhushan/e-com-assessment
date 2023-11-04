import { getRequest } from './utils';

export const getProducts = () => getRequest('/products.json');