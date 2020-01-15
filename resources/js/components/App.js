import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Groups from "./Groups";
import Group from "./Group";

export default class App extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Groups} />
                        <Route exact path="/group/:id" component={Group} />
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
