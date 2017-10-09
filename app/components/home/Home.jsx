import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { fetchHomeList } from '../redux/actions/home';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchHomeList();
    }
    render() {
        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }];
          
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }];
        return (
            <div className="home-content">
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    homeListData: state.homeQuery.homeListData,
 });

const mapDispatchToProps = dispatch => bindActionCreators({ 
    fetchHomeList,
 }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));