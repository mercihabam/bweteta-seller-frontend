import axios from "axios"
import { sendNotif } from "../../Utils/notification";
import { GET_CURRENT_USER_ERROR, GET_CURRENT_USER_START, GET_CURRENT_USER_SUCCESS, LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS, SIGNUP_ERROR, SIGNUP_START, SIGNUP_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_START, UPDATE_USER_SUCCESS } from "../actions-types/users"


export async function getCurrentUser(dispatch){
    dispatch({
        type: GET_CURRENT_USER_START
    })
    try {
        const res = await axios.get(`https://bwetetamarket.herokuapp.com/api/v1/users2/current-user`, {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token")
            }
        });
        if(res.data.status === 200){
            dispatch({
                type: GET_CURRENT_USER_SUCCESS,
                payload: res.data.data
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
        const res = await axios.post(`https://bwetetamarket.herokuapp.com/api/v1/users2/login`, data);
        if(res.data.status === 200){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.data.user
            });
            localStorage.setItem("old-visitor", true);
            localStorage.setItem("x-access-token", res.data.data.token);
            window.location = next;
        }else if(res.data.error){
            dispatch({
                type: LOGIN_ERROR,
                payload: res.data.error
            });
        }
    } catch (error) {
        const res = error.response;
        if(res && res.data.msg){
            dispatch({
                type: LOGIN_ERROR,
                payload: res.data.msg
            })
        }else{
            dispatch({
                type: LOGIN_ERROR,
                payload: "Veuillez reessayer"
            })
        }
    }
};


export async function signup(data, dispatch){
    dispatch({
        type: SIGNUP_START
    });

    try {
        const res = await axios.post(`https://bwetetamarket.herokuapp.com/api/v1/users2/signup`, data);
        if(res.data.status === 201){
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data.data.user
            });
            localStorage.setItem("x-access-token", res.data.data.token);
            sendNotif("success", res.data.msg);
            window.location = "/me/shops";
        }else if(res.data.error){
            dispatch({
                type: SIGNUP_ERROR,
                payload: res.data.error
            })
        }
    } catch (error) {
        const res = error.response;
        if(res && res.data.msg){
            dispatch({
                type: SIGNUP_ERROR,
                payload: res.data.msg
            });
        }else{
            dispatch({
                type: SIGNUP_ERROR,
                payload: "Veuillez reessayer"
            });
        }
        console.error(error);
    }
}


export async function updateUser(data, userId, dispatch, history){
    dispatch({
        type: UPDATE_USER_START
    });

    try {
        const res = await axios.post(`https://bwetetamarket.herokuapp.com/api/v1/users2/update-user/${userId}`, data, {
            headers: {
                "x-access-token": localStorage.getItem("x-access-token")
            }
        });
        if(res.data.status === 200){
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: res.data.data.user
            });
            sendNotif("success", res.data.msg);
            getCurrentUser(dispatch);
        }else if(res.data.status === 401){
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: res.data.error
            });
            history.push("/login");
            sendNotif("error", res.data.error);
        }else if(res.data.error){
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: res.data.error
            })
            sendNotif("error", res.data.error);
        }
    } catch (error) {
        dispatch({
            type: UPDATE_USER_ERROR,
            payload: "Le serveur ne reponds pas,veuillez ressayer"
        });
        console.error(error);
    }
}