import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { autobind } from 'core-decorators';
import styles from './style.less';
import service from './service.js';

class CaseAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caseDetail: {}
        }
    }

    componentWillMount() {
        let caseId = this.props.params.id - 1;
        this.setState({
            caseDetail: service.getCase(caseId)
        })
    }

    render() {
        let caseDetail = this.state.caseDetail
        return (
            <div className={styles.container}>
                <p className={styles.title}>{caseDetail.title}</p>
                <p className={styles.source}>{caseDetail.source}</p>
                <p className={styles.subTitle}> 【违规行为】 </p>
                <p className={styles.text}>{caseDetail.behavior}</p>
                <p className={styles.subTitle}> 【违反规定】 </p>
                <p className={styles.text}>{caseDetail.rules}</p>
            </div>
        );
    }
}

CaseAnalysis.propTypes = {

};

export default CaseAnalysis;