import initialStates from "../../initialStates";
import createProduct from "./createProduct";
import getAll from "./getAll";
import getById from "./getById";


export default ( state = initialStates.products, action={} ) =>({
    ...state,
    ...createProduct(state, action),
    ...getAll(state, action),
    ...getById(state, action)
});