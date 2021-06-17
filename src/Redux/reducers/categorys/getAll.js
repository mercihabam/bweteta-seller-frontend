import { GET_CATEGORYS_ERROR, GET_CATEGORYS_START, GET_CATEGORYS_SUCCESS } from "../../actions-types/categorys";


export default (state, { type, payload }) =>{
    switch (type) {
        case GET_CATEGORYS_START:
            return {
                ...state, 
                categorys: {
                    ...state.categorys,
                    loadingCategorys: true
                }
            }
    
        case GET_CATEGORYS_SUCCESS:
            return {
                ...state, 
                categorys: {
                    ...state.categorys,
                    loadingCategorys: false,
                    dataCategorys: payload,
                    rowsCategorys: payload.rows,
                    countCategorys: payload.count
                }
            }
        
        case GET_CATEGORYS_ERROR:
            return {
                ...state, 
                categorys: {
                    ...state.categorys,
                    loadingCategorys: false
                }
            }
    }
}