import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './style.less';

class Table extends Component {
    renderTableHeader (data) {
        if (!data) return
        let rowKey = 1
        let header = data.map(row => {
            let cols = row.map(col => {
                return (
                    <th key={`th_${rowKey}_${col}`}>{col}</th>
                )
            })
            return (
                <tr key={`header_row_${rowKey++}`}>
                    {cols}
                </tr>
            )
        }) 

        return (
            <thead>
                {header}
            </thead>
        )
    }

    renderTableBody(data) {
        if (!data) return 
        let rowKey = 1
        let body = data.map(row => {
            let colKey = 1
            let cols = row.map(col => {
                return (
                    <td key={`td_${rowKey}_${colKey++}`}>{col}</td>
                )
            })
            return (
                <tr key={`row_${rowKey++}`}>
                    {cols}
                </tr>
            )
        })
        return (
            <tbody>
                {body}
            </tbody>
        )
    }


    render() {
        const { header:headerData, body:bodyData } = this.props.data
        let header = this.renderTableHeader(headerData)
        let body = this.renderTableBody(bodyData)
        return (
            <div className={classnames(styles.container,this.props.className)}>
                <table>
                    {header}
                    {body}
                </table>
            </div>
        );
    }
}

Table.propTypes = {
    data: PropTypes.object,
    className: PropTypes.string
};

export default Table;