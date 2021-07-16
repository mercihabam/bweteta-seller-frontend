import { APPROVE_ORDER_ERROR, APPROVE_ORDER_START, APPROVE_ORDER_SUCCESS, GET_ORDERS_ERROR, GET_ORDERS_START, GET_ORDERS_SUCCESS } from "../actions-types/orders";
import axios from "axios";
import { sendNotif } from "../../Utils/notification";


export async function getOrders(dispatch, history, shopId){
    dispatch({
        type: GET_ORDERS_START
    });

    try {
        const res = await axios.get(`https://bwetetamarket.herokuapp.com/api/v1/shops/${shopId}/orders`, {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token")
            }
        });
        if(res.status === 200){
            dispatch({
                type: GET_ORDERS_SUCCESS,
                payload: res.data.data
            })
        }
    } catch (error) {
        const res = error.response;
        if(res && res.status === 401){
            dispatch({
                type: GET_ORDERS_ERROR,
                payload: "Vous devez vous connecter"
            });
            history.push("/login", { next: "/orders" });
            sendNotif("error", "Vous devez vous connecter");
        }else{
            dispatch({
                type: GET_ORDERS_ERROR,
                payload: "Impossible d'obtenir les commandes"
            });
            sendNotif("error", "Impossible d'obtenir les commandes")
        }
    }
};


export async function approveOrder(dispatch, history, orderId, shopId){
    dispatch({
        type: APPROVE_ORDER_START
    });

    try {
        const res = await axios.patch(`https://bwetetamarket.herokuapp.com/api/v1/orders/${orderId}/confirm`, {}, {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token")
            }
        });
        if(res.status === 200){
            dispatch({
                type: APPROVE_ORDER_SUCCESS,
                payload: res.data.data
            });
            sendNotif("success", "Commande approuvée");
            getOrders(dispatch, history, shopId)
        }
    } catch (error) {
        const res = error.response;
        if(res && res.status === 401){
            dispatch({
                type: APPROVE_ORDER_ERROR,
                payload: "Vous devez vous connecter"
            });
            history.push("/login", { next: "/orders" });
            sendNotif("error", "Vous devez vous connecter");
        }else{
            dispatch({
                type: APPROVE_ORDER_ERROR,
                payload: "Impossible d'approuver la commande"
            });
            sendNotif("error", "Impossible d'approuver la commande")
        }
    }
}