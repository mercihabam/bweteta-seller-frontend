import { GET_CURRENT_SHOP_ERROR, GET_CURRENT_SHOP_START, GET_CURRENT_SHOP_SUCCESS } from "../../actions-types/shops";


export default (state, { type, payload }) =>{
    switch (type) {
        case GET_CURRENT_SHOP_START:
            return {
                ...state,
                currentShop: {
                    ...state.currentShop,
                    loadingShop: true,
                    error: null
                }
            }
            break;
        
        case GET_CURRENT_SHOP_SUCCESS:
            return {
                ...state,
                currentShop: {
                    ...state.currentShop,
                    loadingShop: false,
                    error: null,
                    dataShop: payload
                }
            }
            break;
        case GET_CURRENT_SHOP_ERROR:
            return {
                ...state,
                currentShop: {
                    ...state.currentShop,
                    loadingShop: false,
                    error: payload
                }
            }
    }
};