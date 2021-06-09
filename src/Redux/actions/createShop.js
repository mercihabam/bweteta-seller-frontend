import axios from "axios";
import { sendNotif } from "../../Utils/notification";
import { CREATE_SHOP_ERROR, CREATE_SHOP_START, CREATE_SHOP_SUCCESS } from "../actions-types/shops";


const createShop = (data) => async(dispatch, history) =>{
    dispatch({
        type: CREATE_SHOP_START
    });

    try {
        const res = await axios.post(`https://seller-backend.herokuapp.com/api/v1/shops/create-shop`, data, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        if(res.data.status === 201){
            dispatch({
                type: CREATE_SHOP_SUCCESS,
                payload: res.data.data
            });
            sendNotif("success", res.data.msg)
        }else if(res.data.status === 401){
            dispatch({
                type: CREATE_SHOP_ERROR,
                payload: res.data.error
            });
            history.push("/login", { next: "/create-shop" });
            sendNotif("error", "Veuilez d'abord vous connecter");
        }else if(res.data.status){
            dispatch({
                type: CREATE_SHOP_ERROR,
                payload: res.data.error
            })
        }
    } catch (error) {
        dispatch({
            type: CREATE_SHOP_ERROR,
            payload: "Le serveur ne reponds pas"
        });
        console.error(error);
    }
};

export default createShop;