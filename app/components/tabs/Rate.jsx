import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Rate } from 'antd';
import { switchNavMenu } from '../redux/actions/nav';
import './style.less';

class RateContent extends Component {
    componentDidMount() {
        this.props.switchNavMenu('5');
    }
    render() {
        return (
            <div className="rate-content">
                <Rate />
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    switchNavMenu
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RateContent));