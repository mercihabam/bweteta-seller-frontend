import axios from "axios";
import { sendNotif } from "../../Utils/notification";
import { GET_CATEGORYS_ERROR, GET_CATEGORYS_START, GET_CATEGORYS_SUCCESS } from "../actions-types/categorys";


export async function getCategorys(dispatch){
    dispatch({
        type: GET_CATEGORYS_START
    });

    try {
        const res = await axios.get(`https://seller-backend.herokuapp.com/api/v1/categorys/all-categorys`);
        if(res.data.status === 200){
            dispatch({
                type: GET_CATEGORYS_SUCCESS,
                payload: res.data.data
            })
        }else{
            dispatch({
                type: GET_CATEGORYS_ERROR,
                payload: "Impossible de trouver les categories"
            })
        }
    } catch (error) {
        dispatch({
            type: GET_CATEGORYS_ERROR,
            payload: "Impossible de trouver les categories"
        });
        sendNotif("error", "Impossible de trouver les categories")
    }
}