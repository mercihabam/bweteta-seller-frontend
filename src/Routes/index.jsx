import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Nav from "../Containers/Nav";
import { protectedRoutes, protectedRoutesWithoutNav, unProtectedRoutes } from "../helpers/getRoutes";
import { getCurrentUser } from "../Redux/actions/users";
import { LoadingComponent } from "../Utils/loaders";


function Routes(){
    const dispatch = useDispatch();
    const { loading, isAuth, error } = useSelector(({ users: { currentUser } }) =>currentUser);
    
    useEffect(() =>{
        getCurrentUser(dispatch);
    }, [dispatch]);

    return(
        <Router>
            <Switch>
                {
                    unProtectedRoutes.map(route =>(
                        <Route key={route.name} exact={route.exact} path={route.path} component={route.component} />
                    ))
                }
                {loading ?
                    <LoadingComponent />:
                            protectedRoutes.map(route =>(
                                <Route path={route.path} exact={route.exact} key={route.name} render={() =>(
                                    isAuth === false ? <Redirect to={{ pathname: "/login", state: {
                                        next: route.path,
                                        error: error
                                    } }} />:
                                    isAuth === true && 
                                    <Nav>
                                        <route.component />
                                    </Nav>
                                )} />
                            ))
                }
                {loading ?
                    <LoadingComponent />:
                            protectedRoutesWithoutNav.map(route =>(
                                <Route path={route.path} exact={route.exact} key={route.name} render={() =>(
                                    isAuth === false ? <Redirect to={{ pathname: "/login", state: {
                                        next: route.path,
                                        error: error
                                    } }} />:
                                    isAuth === true && 
                                    <route.component />
                                )} />
                            ))
                }
            </Switch>
        </Router>
    );
};

export default Routes;