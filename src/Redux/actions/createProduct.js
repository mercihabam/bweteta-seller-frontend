import axios from "axios";
import { sendNotif } from "../../Utils/notification";
import { CREATE_PRODUCT_ERROR, CREATE_PRODUCT_START, CREATE_PRODUCT_SUCCESS } from "../actions-types/products"


const createProduct = (data) => async(dispatch, history) =>{
    dispatch({
        type: CREATE_PRODUCT_START
    });
    try {
        const res = await axios.post(`http://localhost:5000/api/v1/products/create-product`, data, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        if(res.data.status === 201){
            dispatch({
                type: CREATE_PRODUCT_SUCCESS,
                payload: res.data.data
            });
            history.push(`/product/detail/${res.data.data.id}`);
            sendNotif("success", res.data.msg)
        }else if(res.data.status === 401){
            dispatch({
                type: CREATE_PRODUCT_ERROR,
                payload: res.data.error
            });
            history.push("/login", { next: "/product/add" });
            sendNotif("error", "Veuilez d'abord vous connecter");
        }else if(res.data.error){
            dispatch({
                type: CREATE_PRODUCT_ERROR,
                payload: res.data.error
            });
            sendNotif("error", res.data.error)
        }
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_ERROR,
            payload: "Le serveur ne reponds pas"
        });
        console.error(error);
    }
};

export default createProduct;