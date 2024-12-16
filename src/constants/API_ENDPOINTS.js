

const BASE_URL = "http://localhost:5173/";

const PRODUCT = {
    GET_PRODUCTS : 'api/product/getproducts',
    GET_IMAGES: 'api/uploads/products',
    POST_ADD_NEW_PRODUCT: "api/product/addnewproduct",
    DELETE_PRODUCT : 'api/product/deleteproduct',
    PUT_UPDATE_PRODUCT : 'api/product/updateproduct',
    GET_CATEGORIES : 'api/product/getcategories',
} 

const AUTH = {

    POST_LOGIN :'api/auth/login',
    GET_LOGOUT: "api/auth/logout",
    POST_SIGNUP : 'api/auth/signup',
    POST_REFRESH_TOKEN : 'api/auth/refresh-token',

}

export { 
    BASE_URL,
    PRODUCT,
    AUTH,
}