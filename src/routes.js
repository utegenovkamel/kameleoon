import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Finalize from "./pages/Finalize";
import Results from "./pages/Results";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/results/:id" component={Results} />
                <Route path="/finalize/:id" component={Finalize} />
                <Redirect to="/dashboard" />
            </Switch>
        </Router>
    );
};

export default Routes;
