import { HomaPage } from "../Containers/Pages/home";

export const routes = [
    {
        name: "Home page",
        path: "/",
        component: HomaPage,
        protected: false,
        exact: true
    }
]