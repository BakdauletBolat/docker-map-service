//react
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

//style
import './static/scss/style.scss';

//routes
import MainPage from './pages/main';
import Localties from "./Localties";
import Rurals from './Rurals';


function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <MainPage></MainPage>
                    </Route>
                    <Route path="/rural">
                        <Rurals></Rurals>
                    </Route>
                    <Route path="/localties">
                        <Localties></Localties>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

