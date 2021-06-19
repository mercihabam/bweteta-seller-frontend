import { GET_PRODUCTS_ERROR, GET_PRODUCTS_START, GET_PRODUCTS_SUCCESS } from "../../actions-types/products";


export default (state, { type, payload }) =>{
    switch (type) {
        case GET_PRODUCTS_START:
            return {
                ...state, 
                allProducts: {
                    ...state.allProducts,
                    loadingProducts: true,
                    error: null,
                    msg: null
                }
            }
        
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state, 
                allProducts: {
                    ...state.allProducts,
                    loadingProducts: false,
                    data: payload,
                    rowsProducts: payload.rows,
                    countProducts: payload.count,
                    error: null,
                }
            }
        
        case GET_PRODUCTS_ERROR:
            return {
                ...state, 
                allProducts: {
                    ...state.allProducts,
                    loadingProducts: false,
                    error: payload,
                    msg: null
                }
            }
    }
}