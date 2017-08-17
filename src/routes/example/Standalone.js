/**
 * @file example/Standalone.js
 *  xx首页
 * @author maoquan(maoquan@htsc.com)
 */

import React from 'react';
// 引入华泰私有源上的公共模块
import StandaloneDemo from 'ht-standalone-demo';

import styles from './standalone.less';

export default function () {
  return (
    <div className="page-example-standalone content-inner">
      <div className={styles.desc}>
        关于公共模块介绍，参考<a href="http://gitlab.htzq.htsc.com.cn/mcrm/react-pc-seed/wikis/%E5%85%AC%E5%85%B1%E6%A8%A1%E5%9D%97%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97">这里</a>
      </div>
      <StandaloneDemo />
    </div>
  );
}

