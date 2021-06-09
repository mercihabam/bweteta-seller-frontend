import axios from "axios"
import { GET_CURRENT_USER_ERROR, GET_CURRENT_USER_START, GET_CURRENT_USER_SUCCESS, LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS } from "../actions-types/users"


export async function getCurrentUser(dispatch){
    dispatch({
        type: GET_CURRENT_USER_START
    })
    try {
        const res = await axios.get(`https://seller-backend.herokuapp.com/api/v1/users/current-user`, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        });
        if(res.data.status === 200){
            dispatch({
                type: GET_CURRENT_USER_SUCCESS,
                paylaod: res.data.data
            })
        }else if(res.data.status === 401){
            dispatch({
                type: GET_CURRENT_USER_ERROR,
                payload: "Vous devez vous connecter"
            })
        }
    } catch (error) {
        dispatch({
            type: GET_CURRENT_USER_ERROR,
            payload: "Le serveur ne reponds pas"
        })
    }
};

export async function login(data, next, dispatch, history){
    dispatch({
        type: LOGIN_START
    });

    try {
        const res = await axios.post(`https://seller-backend.herokuapp.com/api/v1/users/login`, data);
        if(res.data.status === 200){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.data.user
            });
            localStorage.setItem("auth-token", res.data.data.token);
            history.push(next);
        }else if(res.data.error){
            dispatch({
                type: LOGIN_ERROR,
                payload: res.data.error
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: "Le serveur ne reponds pas"
        })
    }
}