import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import RuralInfo from './pages/rural-info';

function Rural() {
    let { path } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <h3>Please select a rural.</h3>
                </Route>
                <Route path={`${path}/:ruralId`}>
                    <RuralInfo />
                </Route>
            </Switch>
        </div>
    );
}

export default Rural;

