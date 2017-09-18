/**
 * @file routes.js
 * @author maoquan(maoquan@htsc.com)
 */

import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  IndexRedirect,
} from 'dva/router';
import _ from 'lodash';

// 可独立发布的公共模块开发示例
// import Main from './layouts/Main';
import TestComp from './components/page/test';

// 默认index,从菜单配置中取

const routes = ({ history }) => (// eslint-disable-line
  <Router history={history}>
    {/*<Route path="/" component={Main}>*/}
    <Route path="/">
      <IndexRedirect to="/example" />
      <Route path="example">
        <IndexRoute component={TestComp} />
        <Route path="detail/:id" component={TestComp} />
      </Route>
    </Route>
  </Router>
);

export default routes;
