import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'antd-mobile';
import { autobind } from 'core-decorators';

import ChapterArray from '../../../consts/homepage.json';
import Navigator from '../../../utils/navigator'

const data = ChapterArray;

class HomePage extends Component {

    linkTo(e){
        Navigator.goTo('/handbook/chapter/'+(e.id-1))
    }

    render() {
        return (
            <div>
            <img src="../../../../static/img/handbook/banner.png"  alt="handbook" width="100%" />  

            <Grid data={data}
                columnNum={3}
                onClick={_el => this.linkTo(_el)}
                renderItem={dataItem => (
                <div>
                    <img src={dataItem.icon} style={{ width: '2.5rem', height: '2rem', marginTop: '1.7rem' }} alt="icon" />
                    <div style={{ color: '#333', fontSize: '0.6rem', margin: '0.5rem' }}>
                    <span>{dataItem.text}</span>
                    </div>
                </div>
                )}
            />

            </div>
        );
    }
}

HomePage.propTypes = {

};

export default HomePage;