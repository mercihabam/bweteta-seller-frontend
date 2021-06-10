import initialStates from "../../initialStates";
import createShop from "./createShop";
import shopsByUser from "./shopsByUser";

export default (state = initialStates.shops, action={}) =>({
    ...state,
    ...createShop(state, action),
    ...shopsByUser(state, action)
});