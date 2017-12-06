import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Icon } from 'antd';
import { switchNavMenu } from '../redux/actions/nav';
import './style.less';
import Card from './Card';
import Rate from './Rate';

const TabPane = Tabs.TabPane;

class TabsContent extends Component {
    componentDidMount() {
        this.props.switchNavMenu('5');
    }
    render() {
        return (
            <div className="tabs-content">
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
                        <Card />
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
                        <Rate />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    switchNavMenu
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabsContent));