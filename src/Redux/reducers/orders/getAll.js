import { GET_ORDERS_ERROR, GET_ORDERS_START, GET_ORDERS_SUCCESS } from "../../actions-types/orders";


export default (state, { type, payload }) =>{
    switch (type) {
        case GET_ORDERS_START:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    loading: true,
                    error: null
                }
            }
    
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    loading: false,
                    error: null,
                    data: payload,
                    rows: payload.rows,
                    count: payload.count
                }
            };
        case GET_ORDERS_ERROR:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    loading: false,
                    error: payload
                }
            }
    }
}