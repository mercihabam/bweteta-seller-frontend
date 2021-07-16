import { APPROVE_ORDER_ERROR, APPROVE_ORDER_START, APPROVE_ORDER_SUCCESS } from "../../actions-types/orders";


export default (state, { type, payload }) =>{
    switch (type) {
        case APPROVE_ORDER_START:
            return {
                ...state,
                approveOrder: {
                    ...state.approveOrder,
                    loading: true,
                    error: null
                }
            }
    
        case APPROVE_ORDER_SUCCESS:
            return {
                ...state,
                approveOrder: {
                    ...state.approveOrder,
                    loading: false,
                    error: null,
                }
            };
        case APPROVE_ORDER_ERROR:
            return {
                ...state,
                approveOrder: {
                    ...state.approveOrder,
                    loading: false,
                    error: payload
                }
            }
    }
}