import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd-mobile';

class HomePage extends Component {
    render() {
        return (
            <div>
                <Button className='btn' loading>Start</Button>
            </div>
        );
    }
}

HomePage.propTypes = {

};

export default HomePage;