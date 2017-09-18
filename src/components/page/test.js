import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd-mobile';

class TestComp extends Component {
    render() {
        return (
            <div>
                <Button className='btn' loading>Start</Button>
            </div>
        );
    }
}


export default TestComp;