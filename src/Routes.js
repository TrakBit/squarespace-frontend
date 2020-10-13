import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Configure from './Components/Configure/Configure';
import Account from './Components/Account';
import Widget from './Components/Widget';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route
                    exact={true}
                    path='/'
                    component={Home}
                />
                <Route
                    exact={true}
                    path='/widget'
                    component={Widget}
                />
                <Route
                    exact={true}
                    path='/register'
                    component={Register}
                />
                <Route
                    exact={true}
                    path='/dashboard'
                    component={Dashboard}
                />
                <Route
                    exact={true}
                    path='/login'
                    component={Login}
                />
                <Route
                    exact={true}
                    path='/configure'
                    component={Configure}
                />
                <Route
                    exact={true}
                    path='/account'
                    component={Account}
                />
            </Switch>
        </Router>
    );
}