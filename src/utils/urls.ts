// Admin
export const adminLogin = "/auth/login";
export const adminRefresh = "/auth/refresh";
// category
export const categoryList = "/category/list";
export const deleteCategoryUrl = (id: number) => `/category/${id}`;
export const addCategoryUrl = "/category/add";
export const editCategoryUrl = (id: number) => `/category/edit/${id}`;
// products
export const allproduct = "/product/list";
export const addproduct = "/product/add";
export const deleteproductUrl = (id: number) => `/product/${id}`;
// brands
export const barndsList = "/brand/list";
export const addbrands = "/brand/add";
export const deleteBrands = (id: number) => `/brand/delete/${id}`;
export const editBrands = (id: number) => `/brand/update/${id}`;
// attribute
export const attributeList = "/attribute/list";
export const attributeAdd = "/attribute/add";
export const attributeDelete = (id:number) => `/attribute/delete/${id}`
export const attributeUpdate = (id:number) => `/attribute/update/${id}`
// media
export const postMedia = "/api/v1/aws";

// orders
export const orderList = "/order/list";
// media
export const mediaAdd = "/api/v1/aws";
export const mediaDelete = "/api/v1/aws/delete";
// domain
export const App_ver = "/v1";
export const domain = "https://ecommerce.main-gate.appx.uz/dev/adminka";
export const mediaApi = "https://media-api.main-gate.appx.uz";
