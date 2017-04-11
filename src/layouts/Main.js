/**
 * @file layouts/Main.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component, PropTypes } from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import { constants } from '../config';

import Header from './Header';
import Bread from './Bread';
import Footer from './Footer';
import Sider from './Sider';

import styles from './main.less';
import '../css/skin.less';

const mapStateToProps = state => ({
  ...state.app,
});

const mapDispatchToProps = {
  switchMenuPopover: () => ({
    type: 'app/switchMenuPopover',
  }),
  switchSider: () => ({
    type: 'app/switchSider',
  }),
  changeOpenKeys: openKeys => ({
    type: 'app/changeOpenKeys',
    payload: { navOpenKeys: openKeys },
  }),
  changeTheme: () => ({
    type: 'app/changeTheme',
  }),
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    menuPopoverVisible: PropTypes.bool.isRequired,
    // 侧栏折叠
    siderFold: PropTypes.bool.isRequired,
    // 是否深色主题
    darkTheme: PropTypes.bool.isRequired,
    isNavbar: PropTypes.bool.isRequired,
    navOpenKeys: PropTypes.array.isRequired,

  }

  static defaultProps = {
  }

  render() {
    const {
      children,
      location,
      siderFold,
      darkTheme,
      isNavbar,
      menuPopoverVisible,
      navOpenKeys,
      // 方法
      switchMenuPopover,
      switchSider,
      changeOpenKeys,
      changeTheme,
    } = this.props;

    const headerProps = {
      siderFold,
      location,
      isNavbar,
      menuPopoverVisible,
      navOpenKeys,
      switchMenuPopover,
      switchSider,
      changeOpenKeys,
      logout() {
        console.log('logout...');
      },
    };

    const siderProps = {
      siderFold,
      darkTheme,
      location,
      navOpenKeys,
      changeTheme,
      changeOpenKeys,
    };

    return (
      <div>
        <Helmet>
          <title>ANTD ADMIN</title>
          <link rel="icon" href={constants.logoSrc} type="image/x-icon" />
        </Helmet>
        <div
          className={
            classnames(
              styles.layout,
              {
                [styles.fold]: isNavbar ? false : siderFold,
              },
              {
                [styles.withnavbar]: isNavbar,
              },
            )
          }
        >
          {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
            <Sider {...siderProps} />
          </aside> : ''}
          <div className={styles.main}>
            <Header {...headerProps} />
            <Bread location={location} />
            <div className={styles.container}>
              <div className={styles.content}>
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}


// export default connect(({ app, loading }) => ({ app, loading: loading.models.app }))(App)
