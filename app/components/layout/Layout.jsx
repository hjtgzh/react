import React from 'react';
import { withRouter, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, message } from 'antd';
import { NAV_MENU } from './layoutConstant';

const SubMenu = Menu.SubMenu;
class Layout extends React.Component {
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
    }
    render() {
        return (
            <div className="container-content">
                <div className="navbar">
                    <div className="navbar-wrapper">
                        <Menu 
                            className="nav-menu"
                            mode="horizontal"
                            onClick={this.handleClick}
                            defaultSelectedKeys={['10']}
                        >
                            <Menu.Item key={NAV_MENU.home}>首页</Menu.Item>
                            <Menu.Item key={NAV_MENU.risklevel}>风险等级</Menu.Item>
                            <Menu.Item key={NAV_MENU.suspicious}>可疑交易</Menu.Item>
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

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));