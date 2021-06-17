import { CREATE_PRODUCT_ERROR, CREATE_PRODUCT_START, CREATE_PRODUCT_SUCCESS } from "../../actions-types/products";


export default (state, { type, payload }) =>{
    switch (type) {
        case CREATE_PRODUCT_START:
            return {
                ...state, 
                createProduct: {
                    ...state.createProduct,
                    loadingAdd: true,
                    error: null,
                    msg: null
                }
            }
            break;
        
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state, 
                createProduct: {
                    ...state.createProduct,
                    loadingAdd: false,
                    data: payload,
                    error: null,
                }
            }
        
        case CREATE_PRODUCT_ERROR:
            return {
                ...state, 
                createProduct: {
                    ...state.createProduct,
                    loadingAdd: false,
                    error: payload,
                    data: {},
                    msg: null
                }
            }
    }
}