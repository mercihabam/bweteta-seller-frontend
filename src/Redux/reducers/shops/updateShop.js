import { UPDATE_SHOP_ERROR, UPDATE_SHOP_START, UPDATE_SHOP_SUCCESS } from "../../actions-types/shops";


export default (state, { type, payload }) =>{
    switch (type) {
        case UPDATE_SHOP_START:
            return {
                ...state,
                updateShop: {
                    ...state.updateShop,
                    loading: true,
                    error: null
                }
            }
            break;
        
        case UPDATE_SHOP_SUCCESS:
            return {
                ...state,
                updateShop: {
                    ...state.updateShop,
                    loading: false,
                    error: null,
                    data: payload
                }
            }
            break;
        case UPDATE_SHOP_ERROR:
            return {
                ...state,
                updateShop: {
                    ...state.updateShop,
                    loading: false,
                    error: payload
                }
            }
    }
};