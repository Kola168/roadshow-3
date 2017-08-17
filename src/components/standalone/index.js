/**
 * @file standalone/index.js
 * @author maoquan(maoquan@htsc.com)
 */
import React, { PureComponent } from 'react';

import api from './api';
import List from './List';

export default class Standalone extends PureComponent {

  state = {}

  componentWillMount() {
    api.getList.then(
      (response) => {
        this.setState({
          list: response.data.data,
        });
      },
    );
  }

  render() {
    const { list } = this.state;
    if (!list) {
      return null;
    }
    return (
      <List data={list} />
    );
  }
}
