import { View, ListView, Text } from 'antd-mobile';

import React from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import styles from './style.less';
import ListContent from '../../../consts/list.json';

class listView extends React.Component {
    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows(this.props.listData)
        }

    }

    @autobind
    getHeader() {
        return this.props.listHeader;
    }
  
    renderRow(rowData) {
        return(
            <View>
                <Text>{rowData}</Text>
            </View>
        );
    }
  
    render() {
        return(
            <div className={styles.container}>
                <View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderHeader={this.getHeader}
                        renderRow={this.renderRow}
                        useBodyScroll               
                    />
                </View>
            </div>
        );
    }
}

listView.propTypes = {
    listData: PropTypes.array,
    listHeader: PropTypes.string
};

export default listView;