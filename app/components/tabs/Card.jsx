import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { switchNavMenu } from '../redux/actions/nav';
import './style.less';

class CardContent extends Component {
    componentDidMount() {
        this.props.switchNavMenu('5');
    }
    render() {
        return (
            <div className="card-content">
                <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                    <div className="custom-image">
                        <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </div>
                    <div className="custom-card">
                        <h3>Europe Street beat</h3>
                        <p>www.instagram.com</p>
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    switchNavMenu
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardContent));