import { UPDATE_USER_ERROR, UPDATE_USER_START, UPDATE_USER_SUCCESS } from "../../actions-types/users";


export default (state, {type, payload}) =>{
    switch (type) {
        case UPDATE_USER_START:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    loading: true,
                    error: null
                }
            }
        
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    loading: false,
                    data: payload
                }
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    loading: false,
                    error: payload
                }
            }
    }
}