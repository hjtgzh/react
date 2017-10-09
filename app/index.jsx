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

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Home}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);