import { HomaPage } from "../Containers/Pages/home";
import { Login } from "../Views/User/login";
import { Signup } from "../Views/User/signup";

const routes = [
    {
        name: "Home page",
        path: "/",
        component: HomaPage,
        protected: false,
        exact: true
    },
    {
        name: "login page",
        path: "/login",
        component: Login,
        protected: false,
        exact: true
    },
    {
        name: "signup page",
        path: "/signup",
        component: Signup,
        protected: false,
        exact: true
    }
];

export default routes;