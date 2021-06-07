import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { unProtectedRoutes } from "../helpers/getRoutes";


function Routes(){

    return(
        <Router>
            <Switch>
                {
                    unProtectedRoutes.map((route) =>(
                        <Route key={route.name} exact={route.exact} component={route.component} />
                    ))
                }
            </Switch>
        </Router>
    );
};

export default Routes;