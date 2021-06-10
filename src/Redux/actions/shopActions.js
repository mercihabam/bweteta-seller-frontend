import axios from "axios";
import { sendNotif } from "../../Utils/notification";
import { GET_SHOPS_BY_USER_ERROR, GET_SHOPS_BY_USER_START, GET_SHOPS_BY_USER_SUCCESS } from "../actions-types/shops";

export async function getUserShops(id, dispatch, history){
    dispatch({
        type: GET_SHOPS_BY_USER_START
    });
    try {
        const res = await axios.get(`https://seller-backend.herokuapp.com/api/v1/shops/get-by-admin/${id}`, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
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
        console.error(error);
    }
}