import { View, ListView, Text } from 'antd-mobile';

import React from 'react';
import styles from './style.less';
import service from './service.js';


class listView extends React.Component {
    constructor(props) {
        super(props);

        var ds =new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows(service.getListData())
        }

    }

  
    renderRow(rowData, rowID) {
        console.log(rowID);
        return(
            <View>
                <Text>{rowData}</Text>
            </View>
        );
    }
  
    render() {
        return(
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderHeader={service.getListHeader}
                    renderRow={this.renderRow}
                    useBodyScroll               
                />
            </View>
        );
    }


}


export default listView;