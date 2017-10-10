import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Accordion } from 'antd-mobile';
import { autobind } from 'core-decorators';

import service from './service';
import styles from './style.less';
import List from '../../common/list-view';
import Table from '../../common/table';
import Navigator from '../../../utils/navigator'

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
             <div className={styles[`lv${lvId}Container`]} key={con.title ? con.title.children : ''}>
                {con.title ? con.title : null}
                {con.content ? con.content : null}
                {con.children ? con.children : null}
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
            <div className={styles.lv2Container} key={con.title ? con.title.children : ''}>
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
        if (!title) return null
        return (
            <h1 className={styles.lv1Title} key={title}>{title}</h1>
        )
    }

    renderLv2Title(title) {
        if (!title) return null
        return (
            <h2 className={styles.lv2Title} key={title}>{title}</h2>
        )
    }
    renderLv3Title(title) {
        if (!title) return null
        return (
            <h3 className={classnames(styles.lv3Title, styles.lv3Title_expand)} key={title}>{title}</h3>
        )
    }
    renderLv4Title(title) {
        if (!title) return null
        return (
            <span className={styles.lv4Title} key={title}>{title}</span>
        )
    }

    renderMainText(textList) {
        if (!textList || textList.length <= 0) return null
        
        return textList.map(item => {
            if (typeof(item) == 'string') {
                return this.renderText(item)
            } else if(item.type === 'list') {
                return this.renderList(item)
            } else if(item.type === 'table') {
                return this.renderTable(item)
            } else if(item.type === 'case') {
                return this.renderCase(item)
            } else if(item.type === 'image') {
                return this.renderImage(item)
            }
        })
    }
    
    renderText(text) {
        if(!text) return null
        return (
            <p className={styles.text} key={text}>{text}</p>
        )
    }
    renderList(item) {
        const listData = service.getListByName(item.resource)

        if (listData) {
            return (
                <List data={listData.Row} header={listData.Header}/>
            )
        }
        return null
    }
    renderTable(item) {
        const tableData = service.getTableByName(item.resource)
        if (tableData) {
            return (
                <Table data={tableData} className={item.className || ''}/>
            )
        }
        return null
    }

    renderImage(item) {
        if (!item) return 
        return (
            <div className={styles.image}>
                <img src={item.resource} alt={item.alt} />
            </div>
        )
    }

    renderCase(item) {
        if (!item) return 
        const { text, id } = item
        let onClick = () => {
            Navigator.goTo(`/handbook/case/${id}`);
        }
        return (
              <p className={styles.text} key={text} onClick={onClick}>
                {text}
                <span className={styles.caseAnchor}>查看案例</span>
              </p>
        )
       
    }
    

    render() {
        if (!this.state) return

        let { content } = this.state
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