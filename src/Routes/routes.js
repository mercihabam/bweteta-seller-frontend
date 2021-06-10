// import { HomaPage } from "../Containers/Pages/home";
import OverView from "../Views/Overview";
import Products from "../Views/Products";
import { UserShops } from "../Views/Shops/allByUser";
import { CreateShop } from "../Views/Shops/createShop";
import { Login } from "../Views/User/login";
import { Signup } from "../Views/User/signup";

const routes = [
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
        exact: true,
        nav: false
    },
    {
        name: "overview",
        path: "/overview",
        component: OverView,
        protected: true,
        exact: true,
        nav: true
    },
    {
        name: "create-shop",
        path: "/create-shop",
        component: CreateShop,
        protected: true,
        exact: true,
        nav: false
    },
    {
        name: "view shops",
        path: "/me/shops",
        component: UserShops,
        protected: true,
        exact: true,
        nav: false
    },
    {
        name: "view products",
        path: "/products",
        component: Products,
        protected: true,
        exact: true,
        nav: true
    },
];

export default routes;