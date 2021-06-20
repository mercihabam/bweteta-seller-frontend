import { UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_START, UPDATE_PRODUCT_SUCCESS } from "../../actions-types/products";


export default (state, { type, payload }) =>{
    switch (type) {
        case UPDATE_PRODUCT_START:
            return {
                ...state, 
                updateProduct: {
                    ...state.updateProduct,
                    loadingUpdate: true,
                    error: null,
                    msg: null
                }
            }
            break;
        
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state, 
                updateProduct: {
                    ...state.updateProduct,
                    loadingUpdate: false,
                    data: payload,
                    error: null,
                }
            }
        
        case UPDATE_PRODUCT_ERROR:
            return {
                ...state, 
                updateProduct: {
                    ...state.updateProduct,
                    loadingUpdate: false,
                    error: payload,
                    data: {},
                    msg: null
                }
            }
    }
}