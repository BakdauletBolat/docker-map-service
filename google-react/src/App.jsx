import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import Rurals from './Rurals';
import './scss/style.scss';
import MainPage from './pages/main';
import Localties from "./Localties";

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

