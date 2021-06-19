import { GET_PRODUCT_ERROR, GET_PRODUCT_START, GET_PRODUCT_SUCCESS } from "../../actions-types/products";


export default (state, { type, payload }) =>{
    switch (type) {
        case GET_PRODUCT_START:
            return {
                ...state, 
                productById: {
                    ...state.productById,
                    loadingProduct: true,
                    error: null,
                }
            }
        
        case GET_PRODUCT_SUCCESS:
            return {
                ...state, 
                productById: {
                    ...state.productById,
                    loadingProduct: false,
                    productData: payload,
                    error: null,
                }
            }
        
        case GET_PRODUCT_ERROR:
            return {
                ...state, 
                allProducts: {
                    ...state.allProducts,
                    loadingProduct: false,
                    error: payload,
                }
            }
    }
}