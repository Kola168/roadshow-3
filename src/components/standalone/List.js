/**
 * @file test/List.js
 * @author maoquan(maoquan@htsc.com)
 */
import React, { PropTypes, PureComponent } from 'react';
import { Table } from 'antd';

import columns from './columns';
import './list.css';

export default class TestList extends PureComponent {

  static propTypes = {
    data: PropTypes.array.isRequired,
  }

  render() {
    const { data } = this.props;
    return (
      <Table
        className="table"
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    );
  }
}
