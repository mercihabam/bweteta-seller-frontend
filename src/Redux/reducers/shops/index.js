import initialStates from "../../initialStates";
import createShop from "./createShop";
import currentShop from "./currentShop";
import shopsByUser from "./shopsByUser";
import updateShop from "./updateShop";

export default (state = initialStates.shops, action={}) =>({
    ...state,
    ...createShop(state, action),
    ...shopsByUser(state, action),
    ...currentShop(state, action),
    ...updateShop(state, action),
});