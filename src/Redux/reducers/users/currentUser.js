import { GET_CURRENT_USER_ERROR, GET_CURRENT_USER_START, GET_CURRENT_USER_SUCCESS } from "../../actions-types/users";


export default (state, {type, payload}) =>{
    switch (type) {
        case GET_CURRENT_USER_START:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: true,
                    isAuth: undefined,
                }
            }
        
        case GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    isAuth: true,
                    data: payload
                }
            }
        case GET_CURRENT_USER_ERROR:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    loading: false,
                    isAuth: false,
                    error: payload
                }
            }
    }
}