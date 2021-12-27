import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import MapPage from './pages/map-page';

function Localties() {
    let { path } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <h3>Please select a rural.</h3>
                </Route>
                <Route path={`${path}/:localtiesId`}>
                    <MapPage />
                </Route>
            </Switch>
        </div>
    );
}

export default Localties;

