import axios from "axios";
import { sendNotif } from "../../Utils/notification";
import { GET_CURRENT_SHOP_ERROR, GET_CURRENT_SHOP_START, GET_CURRENT_SHOP_SUCCESS, GET_SHOPS_BY_USER_ERROR, GET_SHOPS_BY_USER_START, GET_SHOPS_BY_USER_SUCCESS, UPDATE_SHOP_ERROR, UPDATE_SHOP_START, UPDATE_SHOP_SUCCESS } from "../actions-types/shops";

export async function getUserShops(id, dispatch, history){
    dispatch({
        type: GET_SHOPS_BY_USER_START
    });
    try {
        const res = await axios.get(`https://bwetetamarket.herokuapp.com/api/v1/shops2/get-by-admin/${id}`, {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token")
            }
        });
        if(res.data.status === 200){
            dispatch({
                type: GET_SHOPS_BY_USER_SUCCESS,
                payload: res.data.data
            });
        }else if(res.data.status === 401){
            dispatch({
                type: GET_SHOPS_BY_USER_ERROR,
                payload: res.data.error
            });
            history.push("/login", { next: "/me/shops" });
            sendNotif("error", "Veuilez d'abord vous connecter");
        }else if(res.data.status){
            dispatch({
                type: GET_SHOPS_BY_USER_ERROR,
                payload: res.data.error
            })
        }
    } catch (error) {
        dispatch({
            type: GET_SHOPS_BY_USER_ERROR,
            payload: "Le serveur ne reponds pas"
        });
    }
};

export async function getCurrentShop(id, dispatch, history){
    dispatch({
        type: GET_CURRENT_SHOP_START
    });
    try {
        const res = await axios.get(`https://bwetetamarket.herokuapp.com/api/v1/shops2/get-actvated-by-id/${id}`, {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token")
            }
        });
        if(res.data.status === 200){
            dispatch({
                type: GET_CURRENT_SHOP_SUCCESS,
                payload: res.data.data
            });
            localStorage.setItem("active-shop", res.data.data.id);
            history.push("/overview");
        }else if(res.data.status === 401){
            dispatch({
                type: GET_SHOPS_BY_USER_ERROR,
                payload: res.data.error
            });
            history.push("/login", { next: "/me/shops" });
            sendNotif("error", "Veuilez d'abord vous connecter");
        }else if(res.data.status === 404){
            dispatch({
                type: GET_CURRENT_SHOP_ERROR,
                payload: res.data.error
            });
            history.push("/me/shops");
            sendNotif("error", "La boutique  à la quelle vous voulez acceder n'a pas encore été approuvé");
        }
    } catch (error) {
        dispatch({
            type: GET_CURRENT_SHOP_ERROR,
            payload: "Le serveur ne reponds pas"
        });
    }
}


export const updateShop = (data, shopId) => async(dispatch, history) =>{
    dispatch({
        type: UPDATE_SHOP_START
    });

    try {
        const res = await axios.post(`https://bwetetamarket.herokuapp.com/api/v1/shops2/update-shop/${shopId}`, data, {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token")
            }
        });
        if(res.data.status === 200){
            dispatch({
                type: UPDATE_SHOP_SUCCESS,
                payload: res.data.data
            });
            getCurrentShop(shopId, dispatch, history);
            sendNotif("success", res.data.msg)
        }else if(res.data.status === 401){
            dispatch({
                type: UPDATE_SHOP_ERROR,
                payload: res.data.error
            });
            history.push("/login", { next: "/myshop" });
            sendNotif("error", "Veuilez d'abord vous connecter");
        }else if(res.data.status){
            dispatch({
                type: UPDATE_SHOP_ERROR,
                payload: res.data.error
            })
        }
    } catch (error) {
        dispatch({
            type: UPDATE_SHOP_ERROR,
            payload: "Le serveur ne reponds pas, veuillez ressayer"
        });
        console.error(error);
    }
};