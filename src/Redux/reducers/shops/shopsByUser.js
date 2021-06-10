import { GET_SHOPS_BY_USER_ERROR, GET_SHOPS_BY_USER_START, GET_SHOPS_BY_USER_SUCCESS } from "../../actions-types/shops";


export default (state, { type, payload }) =>{
    switch (type) {
        case GET_SHOPS_BY_USER_START:
            return {
                ...state,
                shopsByUser: {
                    ...state.shopsByUser,
                    loading: true,
                    error: null
                }
            }
            break;
        
        case GET_SHOPS_BY_USER_SUCCESS:
            return {
                ...state,
                shopsByUser: {
                    ...state.shopsByUser,
                    loading: false,
                    error: null,
                    data: payload,
                    shopsRows: payload.rows,
                    shopsCount: payload.count
                }
            }
            break;
        case GET_SHOPS_BY_USER_ERROR:
            return {
                ...state,
                shopsByUser: {
                    ...state.shopsByUser,
                    loading: false,
                    error: payload
                }
            }
    }
};