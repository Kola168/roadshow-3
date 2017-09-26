import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Accordion } from 'antd-mobile';
import { autobind } from 'core-decorators';

import service from './service';
import styles from './style.less';

class Generator extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            content: ''
        }
    }

    
    componentDidMount() {
        const chapter = this.props.params.id
        const content = service.getContentById(chapter)
        this.setState({
            content
        })
    }

    //render content
    renderContent (content, lvId) {
        if (!content) return {}
        const { title, text, children} = content
        const rendetTitleMethod = this.getTitleMethod(lvId)
        const renderChildrenMethod = this.getChildrenMethod(lvId+1)

        const contentTitle = rendetTitleMethod(title);
        const mainText = this.renderMainText(text)
        const childrenContent = children ? children.map(item => {
            return renderChildrenMethod(item)
        }) : null

        return {
            title: contentTitle,
            content: mainText,
            children: childrenContent
        }
    }

    renderBasicContentStyle (content, lvId) {
        const con = this.renderContent(content, lvId)
        return (
             <div className={styles[`lv${lvId}Container`]} >
                {con.title}
                {con.content}
                {con.children}
            </div>
        )
    }

    @autobind
    renderLv1 (content) {
        return this.renderBasicContentStyle(content, 1)
    }

    @autobind
    renderLv2 (content) {
        const con = this.renderContent(content, 2)
        return (
            <div className={styles.lv2Container}>
                {con.title}
                {con.content}
                <Accordion>
                    {con.children}
                </Accordion>
            </div>
        )
    }

    @autobind
    renderLv3 (content) {
        const con = this.renderContent(content, 3)
        return (
            <Accordion.Panel header={con.title} className={styles.lv3Container}>
                {con.content}
                {con.children}
            </Accordion.Panel>
        )
    }

    @autobind
    renderLv4 (content) {
        return this.renderBasicContentStyle(content, 4)
    }

    getTitleMethod (lvId) {
        switch(lvId) {
            case 1: 
                return this.renderLv1Title
            case 2: 
                return this.renderLv2Title
            case 3: 
                return this.renderLv3Title
            case 4: 
                return this.renderLv4Title
            default:
                return this.renderMainText
        }
    }

    getChildrenMethod (lvId) {
         switch(lvId) {
            case 1: 
                return this.renderLv1
            case 2: 
                return this.renderLv2
            case 3: 
                return this.renderLv3
            case 4: 
                return this.renderLv4
            default:
                return this.renderLv4
        }
    }

    renderLv1Title(title) {
        return (
            <h1 className={styles.lv1Title}>{title}</h1>
        )
    }

    renderLv2Title(title) {
        return (
            <h2 className={styles.lv2Title}>{title}</h2>
        )
    }
    renderLv3Title(title) {
        return (
            <h3 className={classnames(styles.lv3Title, styles.lv3Title_expand)}>{title}</h3>
        )
    }
    renderLv4Title(title) {
        return (
            <span className={styles.lv4Title}>{title}</span>
        )
    }

    renderMainText(textList) {
        if (!textList || textList.length <= 0) return 
        return textList.map(item => {
            if (typeof(item) == 'string') {
                return this.renderText(item)
            } else if(item.type === 'list') {
                return this.renderList(item.resource)
            } else if(item.type === 'table') {
                return this.renderTable(item.resource)
            }
        })
    }
    
    renderText(text) {
        return (
            <p className={styles.text}>{text}</p>
        )
    }
    renderList(source) {
        console.log('list source', source)
        return null
    }
    renderTable(source) {
        console.log('table source', source)
        return null
    }
    

    render() {
        if (!this.state) return

        let { content } = this.state
        let initLv = 1
        return (
            <div className={styles.container}>
                {this.renderLv1(content)}
            </div>
        );
    }
}

Generator.propTypes = {

};

export default Generator;