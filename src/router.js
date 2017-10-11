/**
 * @file routes.js
 * @author 
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
import HandbookHome from "./components/handbook/home";
import Chapter from './components/handbook/content';
import Case from './components/handbook/case-analysis';

// 默认index,从菜单配置中取
const routes = ({ history }) => (// eslint-disable-line
  <Router history={history}>
    {/*<Route path="/" component={Main}>*/}
    <Route path="financial">
      <IndexRedirect to="/handbook" />
      <Route path="handbook">
        <IndexRoute component={HandbookHome} />
        <Route path="chapter/:id" component={Chapter} />
        <Route path="case/:id" component={Case} />
      </Route>
    </Route>
  </Router>
);

export default routes;
