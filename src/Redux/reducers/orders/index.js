import initialStates from "../../initialStates";
import getAll from "./getAll";

export default (state = initialStates.orders, action = {}) =>({
    ...state,
    ...getAll(state, action),
})