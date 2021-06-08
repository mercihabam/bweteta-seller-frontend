import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "../Containers/Nav";
import { protectedRoutes, unProtectedRoutes } from "../helpers/getRoutes";


function Routes(){

    return(
        <Router>
            <Switch>
                {
                    unProtectedRoutes.map(route =>(
                        <Route key={route.name} exact={route.exact} path={route.path} component={route.component} />
                    ))
                }
                <Nav>
                    {
                        protectedRoutes.map(route =>(
                            <Route path={route.path} exact={route.exact} component={route.component} key={route.name} />
                        ))
                    }
                </Nav>
            </Switch>
        </Router>
    );
};

export default Routes;