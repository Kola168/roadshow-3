/**
 * @file layouts/Main.js
 * @author maoquan(maoquan@htsc.com)
 */

import React, { Component, PropTypes } from 'react';
import { withRouter, routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import Tab from '../components/common/Tab';
import { constants } from '../config';

import Header from './Header';
import Footer from './Footer';
import Sider from './Sider';

import styles from './main.less';
import '../css/skin.less';

const mapStateToProps = state => ({
  ...state.app,
  loading: state.loading.global,
});

const mapDispatchToProps = {
  push: routerRedux.push,
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
    loading: PropTypes.bool.isRequired,
    // 侧栏折叠
    siderFold: PropTypes.bool.isRequired,
    // 是否深色主题
    darkTheme: PropTypes.bool.isRequired,
    useMenuPopover: PropTypes.bool.isRequired,
    navOpenKeys: PropTypes.array.isRequired,

    switchMenuPopover: PropTypes.func.isRequired,
    switchSider: PropTypes.func.isRequired,
    changeOpenKeys: PropTypes.func.isRequired,
    changeTheme: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  render() {
    const {
      location,
      siderFold,
      darkTheme,
      useMenuPopover,
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
      useMenuPopover,
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
          <link rel="icon" href={constants.logoSrc} type="image/x-icon" />
        </Helmet>
        <div
          className={
            classnames(
              styles.layout,
              {
                [styles.fold]: useMenuPopover ? false : siderFold,
              },
              {
                [styles.withnavbar]: useMenuPopover,
              },
            )
          }
        >
          {!useMenuPopover
            ? (
              <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
                <Sider {...siderProps} />
              </aside>
            ) : null
          }
          <div className={styles.main}>
            <Header {...headerProps} />
            <div className={styles.content}>
              <Tab {...this.props} />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
