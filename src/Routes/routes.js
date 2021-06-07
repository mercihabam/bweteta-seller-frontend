import { HomaPage } from "../Containers/Pages/home";
import { Login } from "../Views/User/login";

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
    }
];

export default routes;