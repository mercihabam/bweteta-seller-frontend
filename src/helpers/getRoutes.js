import routes from "../Routes/routes";

export const protectedRoutes = routes.filter(route =>route.protected);
export const unProtectedRoutes = routes.filter(route =>!route.protected);