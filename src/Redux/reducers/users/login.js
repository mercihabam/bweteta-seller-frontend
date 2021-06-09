import { LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS } from "../../actions-types/users";


export default (state, {type, payload}) =>{
    switch (type) {
        case LOGIN_START:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: true,
                    error: null
                }
            }
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    data: payload
                }
            }
        case LOGIN_ERROR:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    error: payload
                }
            }
    }
}