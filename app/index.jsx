/* eslint-disable spaced-comment */
import './index.html';
import './index.less';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
// import {BrowserRouter as Router, Route, Link, } from 'react-router-dom'

import store from './store';

// 引入主路由
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Grid from './components/grid/Grid';
import Login from './components/login/Login';
import Menu from './components/menu/Menu';
import Form from './components/menu/Form';
import Steps from './components/menu/Steps';
import Calendar from './components/menu/Calendar';
import Chart from './components/visualization/Chart';
import List from './components/list/List';

const requireAuth = (nextState, replace, cb) => {
    replace({
        pathname: '/login'
    });
    cb();
};

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                {/* <IndexRoute onEnter={requireAuth} component={Home}/> */}
                <IndexRoute component={Home}/>
                <Route path="home" component={Home} />
                <Route path="grid" component={Grid} />
                <Route path="menu" component={Menu}>
                    <Route path="form" component={Form} />
                    <Route path="steps" component={Steps} />
                    <Route path="calendar" component={Calendar} />
                </Route>
                <Route path="chart" component={Chart} />
                <Route path="list" component={List} />
            </Route>
            <Route path="login" component={Login} />
        </Router>
    </Provider>,
    document.getElementById('app')
);