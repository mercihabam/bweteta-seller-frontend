import initialStates from "../../initialStates";
import currentUser from "./currentUser";
import login from "./login";


export default (state = initialStates.users, action={}) =>({
    ...state,
    ...currentUser(state, action),
    ...login(state, action)
});