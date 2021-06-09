import { CREATE_SHOP_ERROR, CREATE_SHOP_START, CREATE_SHOP_SUCCESS } from "../../actions-types/shops";


export default (state, { type, payload }) =>{
    switch (type) {
        case CREATE_SHOP_START:
            return {
                ...state,
                createShop: {
                    ...state.createShop,
                    loading: true,
                    error: null
                }
            }
            break;
        
        case CREATE_SHOP_SUCCESS:
            return {
                ...state,
                createShop: {
                    ...state.createShop,
                    loading: false,
                    error: null,
                    data: payload
                }
            }
            break;
        case CREATE_SHOP_ERROR:
            return {
                ...state,
                createShop: {
                    ...state.createShop,
                    loading: false,
                    error: payload
                }
            }
    }
};