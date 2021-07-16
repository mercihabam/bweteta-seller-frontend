import initialStates from "../../initialStates";
import approve from "./approve";
import getAll from "./getAll";

export default (state = initialStates.orders, action = {}) =>({
    ...state,
    ...getAll(state, action),
    ...approve(state, action)
})