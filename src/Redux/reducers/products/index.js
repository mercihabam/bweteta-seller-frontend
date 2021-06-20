import initialStates from "../../initialStates";
import createProduct from "./createProduct";
import getAll from "./getAll";
import getById from "./getById";
import updateProduct from "./updateProduct";


export default ( state = initialStates.products, action={} ) =>({
    ...state,
    ...createProduct(state, action),
    ...getAll(state, action),
    ...getById(state, action),
    ...updateProduct(state, action)
});