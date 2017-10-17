import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, icon } from 'antd';
import { NAV_MENU } from './layoutConstant';
import { switchNavMenu } from '../redux/actions/nav';

const SubMenu = Menu.SubMenu;

class Layout extends Component {
    /**
     * 点击菜单时判断有无权限
     */
    handleClick = (e) => {
        // if (User.isLogin()) {
        //     User.refreshLoginTime();
        //     this.props.router.push(e.item.props.link);
        //     this.props.switchMenu(e.key);
        // } else {
        //     this.props.router.push('/login');
        // }
        this.props.switchNavMenu(e.key);
        this.props.router.push(e.item.props.link);
    }
    render() {
        const { current } = this.props;
        return (
            <div className="container-content">
                <div className="navbar">
                    <div className="navbar-wrapper">
                        <Menu 
                            className="nav-menu"
                            mode="horizontal"
                            onClick={this.handleClick}
                            selectedKeys={[current]}
                        >
                            <Menu.Item key={NAV_MENU.home} link="home">首页</Menu.Item>
                            <Menu.Item key={NAV_MENU.visualization} link="visualization">可视化</Menu.Item>
                            <Menu.Item key={NAV_MENU.test} link="test">测试</Menu.Item>
                            <Menu.Item key={NAV_MENU.identity}>身份识别</Menu.Item>
                            <Menu.Item key={NAV_MENU.todo}>待处理任务</Menu.Item>
                            <SubMenu title="查询">
                                <Menu.Item key={NAV_MENU.customer}>客户查询</Menu.Item>
                                <Menu.Item key={NAV_MENU.event}>事件查询</Menu.Item>
                                <Menu.Item key={NAV_MENU.task}>任务查询</Menu.Item>
                                <Menu.Item key={NAV_MENU.rule}>规则查询</Menu.Item>
                                <Menu.Item key={NAV_MENU.permission}>用户查询</Menu.Item>
                            </SubMenu>
                            <Menu.Item key={NAV_MENU.list} link="list">名单管理</Menu.Item>
                            <Menu.Item key={NAV_MENU.template} link="template">模板中心</Menu.Item>
                        </Menu>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    current: state.navQuery.current
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    switchNavMenu
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));