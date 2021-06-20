import axios from "axios";
import { sendNotif } from "../../Utils/notification";
import { GET_PRODUCTS_ERROR, GET_PRODUCTS_START, GET_PRODUCTS_SUCCESS,
    GET_PRODUCT_ERROR, GET_PRODUCT_START, GET_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_START, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR } from "../actions-types/products"


export const getProducts = (shopId, limit, offset) => async(dispatch, history) =>{
    dispatch({
        type: GET_PRODUCTS_START
    });
    try {
        const res = await axios.get(`https://seller-backend.herokuapp.com/api/v1/products/products-by-shop/${shopId}?limit=${limit}&offset=${offset}`, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        if(res.data.status === 200){
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data.data
            });
        }else if(res.data.status === 401){
            dispatch({
                type: GET_PRODUCTS_ERROR,
                payload: res.data.error
            });
            history.push("/login", { next: "/product/add" });
            sendNotif("error", "Veuilez d'abord vous connecter");
        }else if(res.data.error){
            dispatch({
                type: GET_PRODUCTS_ERROR,
                payload: res.data.error
            });
            sendNotif("error", res.data.error)
        }
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_ERROR,
            payload: "Le serveur ne reponds pas"
        });
        console.error(error);
    }
};


export const getProductDetail = (productId) => async(dispatch) =>{
    dispatch({
        type: GET_PRODUCT_START
    });
    try {
        const res = await axios.get(`https://seller-backend.herokuapp.com/api/v1/products/product-by-id/${productId}`, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        if(res.data.status === 200){
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data.data
            });
        }else if(res.data.error){
            dispatch({
                type: GET_PRODUCT_ERROR,
                payload: res.data.error
            });
            sendNotif("error", res.data.error)
        }
    } catch (error) {
        dispatch({
            type: GET_PRODUCT_ERROR,
            payload: "Le serveur ne reponds pas"
        });
        console.error(error);
    }
};

export const updateProduct = (data, productId) => async(dispatch) =>{
    dispatch({
        type: UPDATE_PRODUCT_START
    });
    try {
        const res = await axios.post(`https://seller-backend.herokuapp.com/api/v1/products/update-product/${productId}`, data, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        if(res.data.status === 200){
            dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                payload: res.data.data
            });
            sendNotif("success", res.data.msg);
            getProductDetail(productId)(dispatch);
        }else if(res.data.error){
            dispatch({
                type: UPDATE_PRODUCT_ERROR,
                payload: res.data.error
            });
            sendNotif("error", res.data.error)
        }
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_ERROR,
            payload: "Le serveur ne reponds pas"
        });
        console.error(error);
        sendNotif("success", "Le serveur ne reponds pas")
    }
};