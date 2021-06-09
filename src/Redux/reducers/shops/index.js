import initialStates from "../../initialStates";
import createShop from "./createShop";

export default (state = initialStates.shops, action={}) =>({
    ...state,
    ...createShop(state, action)
});