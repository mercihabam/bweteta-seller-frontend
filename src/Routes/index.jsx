import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Nav from "../Containers/Nav";
import { HomaPage } from "../Containers/Pages/home";
import { protectedRoutes, protectedRoutesWithoutNav, unProtectedRoutes } from "../helpers/getRoutes";
import { getCurrentUser } from "../Redux/actions/users";
import { LoadingComponent } from "../Utils/loaders";


function Routes(){
    const dispatch = useDispatch();
    const { loading, isAuth, error } = useSelector(({ users: { currentUser } }) =>currentUser);
    const oldVisitor = localStorage.getItem("old-visitor");
    
    useEffect(() =>{
        getCurrentUser(dispatch);
    }, [dispatch]);

    return(
        <Router>
            <Switch>
                <Route key="home-page" exact path="/" render={() =>(
                    oldVisitor ? <Redirect to="/overview" />:
                    <HomaPage />
                )} />
                {
                    unProtectedRoutes.map(route =>(
                        <Route key={route.name} exact={route.exact} path={route.path} component={route.component} />
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
                {loading ?
                    <LoadingComponent />:
                        <Nav>
                            {protectedRoutes.map(route =>(
                                <Route path={route.path} exact={route.exact} key={route.name} render={() =>(
                                    isAuth === false ? <Redirect to={{ pathname: "/login", state: {
                                        next: route.path,
                                        error: error
                                    } }} />:
                                    isAuth === true && 
                                        <route.component />
                                )} />
                            ))}
                        </Nav>
                }
            </Switch>
        </Router>
    );
};

export default Routes;