// import { HomaPage } from "../Containers/Pages/home";
import Orders from "../Views/Orders";
import OverView from "../Views/Overview";
import Products from "../Views/Products";
import { ProductForm } from "../Views/Products/addProduct";
import { ProductDetail } from "../Views/Products/productDetail";
import { UserShops } from "../Views/Shops/allByUser";
import { CreateShop } from "../Views/Shops/createShop";
import { ShopProfile } from "../Views/Shops/profile";
import { Login } from "../Views/User/login";
import { UserProfile } from "../Views/User/profile";
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
    {
        name: "add product",
        path: "/product/add",
        component: ProductForm,
        protected: true,
        exact: true,
        nav: true
    },
    {
        name: "product detail",
        path: "/product/detail/:id",
        component: ProductDetail,
        protected: true,
        exact: true,
        nav: true
    },
    {
        name: "user profile",
        path: "/me/profile",
        component: UserProfile,
        protected: true,
        exact: true,
        nav: true
    },
    {
        name: "shop profile",
        path: "/myshop",
        component: ShopProfile,
        protected: true,
        exact: true,
        nav: true
    },
    {
        name: "shops orders",
        path: "/orders",
        component: Orders,
        protected: true,
        exact: true,
        nav: true
    },
];

export default routes;