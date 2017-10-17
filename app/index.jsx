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
import Login from './components/login/Login';
import Visualization from './components/visualization/Visualization';
import Test from './components/visualization/Test';

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
                <Route path="visualization" component={Visualization} />
                <Route path="test" component={Test} />
            </Route>
            <Route path="login" component={Login} />
        </Router>
    </Provider>,
    document.getElementById('app')
);