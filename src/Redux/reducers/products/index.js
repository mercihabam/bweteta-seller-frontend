import initialStates from "../../initialStates";
import createProduct from "./createProduct";


export default ( state = initialStates.products, action={} ) =>({
    ...state,
    ...createProduct(state, action)
});