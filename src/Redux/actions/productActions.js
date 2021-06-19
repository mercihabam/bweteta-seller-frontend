import axios from "axios";
import { sendNotif } from "../../Utils/notification";
import { GET_PRODUCTS_ERROR, GET_PRODUCTS_START, GET_PRODUCTS_SUCCESS } from "../actions-types/products"


export const getProducts = (shopId, limit, offset) => async(dispatch, history) =>{
    dispatch({
        type: GET_PRODUCTS_START
    });
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/products/products-by-shop/${shopId}?limit=${limit}&offset=${offset}`, {
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