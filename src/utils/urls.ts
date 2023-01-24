// Admin
export const adminLogin = '/auth/login'
export const adminRefresh = '/auth/refresh'
// category
export const categoryList = '/category/list'
export const deleteCategoryUrl = (id:number) => `/category/${id}`
// products
export const allproduct = '/product/list'
export const addproduct = '/product/add'
export const deleteproduct = (id:number) => `/product/${id}`
// brands
export const barndsList = '/brand/list'
export const addbrands = '/brand/add'
// media
export const postMedia = '/api/v1/aws'

// orders
export const orderList = '/order/list'
// domain
export const App_ver = '/v1'
export const domain = 'https://ecommerce.main-gate.appx.uz/dev/adminka'
export const mediaApi = 'https://media-api.main-gate.appx.uz'