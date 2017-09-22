import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { WingBlank, WhiteSpace  } from 'antd-mobile';
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
                <Row>
                    <WingBlank size="lg">
                        <Col className={styles.title}>{caseDetail.title}</Col>
                    </WingBlank>
                </Row>
                <Row>
                    <WingBlank size="lg">
                        <Col className={styles.source}>{caseDetail.source}</Col>
                    </WingBlank>
                </Row>
                <WhiteSpace size="lg" />
                <Row>
                    <Col><img src="../../../../static/img/handbook/label.png"  alt="label" /> </Col>
                </Row>
                <Row>
                    <WingBlank size="md">
                        <Col className={styles.subTitle}> 【违规行为】 </Col>
                    </WingBlank>
                </Row>
                <Row>
                    <WingBlank size="lg">
                        <Col className={styles.text}>{caseDetail.behavior}</Col>
                    </WingBlank>
                </Row>
                <WhiteSpace size="lg" />
                <Row>
                     <Col><img src="../../../../static/img/handbook/label.png"  alt="label" /> </Col>
                </Row>
                <Row>
                    <WingBlank size="md">
                        <Col className={styles.subTitle}> 【违反规定】 </Col>
                    </WingBlank>
                </Row>
                <Row>
                    <WingBlank size="lg">
                        <Col className={styles.text}>{caseDetail.rules}</Col>
                    </WingBlank>
                </Row>
            </div>
        );
    }
}

CaseAnalysis.propTypes = {

};

export default CaseAnalysis;