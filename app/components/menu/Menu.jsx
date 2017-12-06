import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.less';
import { switchNavMenu } from '../redux/actions/nav';
import { Icon, Menu } from 'antd';

const SubMenu = Menu.SubMenu;

class MenuContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            collapsed: false,
        };
    }

    componentDidMount() {
        this.props.switchNavMenu('3');
        this.props.router.push('/menu/form');
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    menuClick = (menuitem) => {
        this.props.router.push(`/menu/${menuitem.key}`);
    }
    render() {
        return (
            <div className="page-content">
                <div className="left-nav">
                    <Menu
                        defaultSelectedKeys={['form']}
                        mode="inline"
                        inlineCollapsed={this.state.collapsed}
                        onClick={this.menuClick}
                    >
                        <Menu.Item key="form">
                            <Icon type="pie-chart" />
                            <span>form</span>
                        </Menu.Item>
                        <Menu.Item key="steps">
                            <Icon type="desktop" />
                            <span>steps</span>
                        </Menu.Item>
                        <Menu.Item key="calendar">
                            <Icon type="inbox" />
                            <span>calendar</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                    </Menu>
                    <div className={this.state.collapsed ? 'collapsed-wrap collapsed' : 'collapsed-wrap'} onClick={this.toggleCollapsed}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </div>
                </div>
                <div className={this.state.collapsed ? 'right-content collapsed' : 'right-content'}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
  
const mapStateToProps = state => ({ 

});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    switchNavMenu
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuContent));