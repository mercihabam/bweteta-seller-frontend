import initialStates from "../../initialStates";
import currentUser from "./currentUser";
import login from "./login";
import signup from "./signup";
import updateUser from "./updateUser";


export default (state = initialStates.users, action={}) =>({
    ...state,
    ...currentUser(state, action),
    ...login(state, action),
    ...signup(state, action),
    ...updateUser(state, action),
});