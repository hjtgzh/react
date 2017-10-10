import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { fetchHomeList } from '../redux/actions/home';
import { switchNavMenu } from '../redux/actions/nav'

class Visualization extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.switchNavMenu('2');
    }
    render() {
        return (
            <div className="visualization-content">
                可视化页面
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    homeListData: state.homeQuery.homeListData,
 });

const mapDispatchToProps = dispatch => bindActionCreators({ 
    fetchHomeList,
    switchNavMenu
 }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));