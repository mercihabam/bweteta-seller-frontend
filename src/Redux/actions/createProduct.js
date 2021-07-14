import { message } from "antd";
import axios from "axios";
import { loadingMsg, sendNotif } from "../../Utils/notification";
import { CREATE_PRODUCT_ERROR, CREATE_PRODUCT_START, CREATE_PRODUCT_SUCCESS } from "../actions-types/products"


const createProduct = (data) => async(dispatch, history) =>{
    dispatch({
        type: CREATE_PRODUCT_START
    });
    loadingMsg("Patientez...");
    try {
        const res = await axios.post(`https://bwetetamarket.herokuapp.com/api/v1/products2/create-product`, data, {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token")
            }
        });
        if(res.data.status === 201){
            dispatch({
                type: CREATE_PRODUCT_SUCCESS,
                payload: res.data.data
            });
            history.push(`/product/detail/${res.data.data.id}`);
            message.destroy("load");
            sendNotif("success", res.data.msg)
        }else if(res.data.status === 401){
            dispatch({
                type: CREATE_PRODUCT_ERROR,
                payload: res.data.error
            });
            history.push("/login", { next: "/product/add" });
            message.destroy("load");
            sendNotif("error", "Veuilez d'abord vous connecter");
        }else if(res.data.error){
            dispatch({
                type: CREATE_PRODUCT_ERROR,
                payload: res.data.error
            });
            message.destroy("load")
            sendNotif("error", res.data.error)
        }
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_ERROR,
            payload: "Le serveur ne reponds pas"
        });
        message.destroy("load")
    }
};

export default createProduct;