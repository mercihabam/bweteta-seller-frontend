import initialStates from "../../initialStates";
import getAll from "./getAll";


export default (state=initialStates.categorys, action={}) =>({
    ...state,
    ...getAll(state, action)
})