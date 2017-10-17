import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.less';
import _ from 'lodash';
import ProgressArc from './ProgressArc';
import { switchNavMenu } from '../redux/actions/nav';

const data = {
    北京: Math.random(),
    上海: Math.random(),
    广州: Math.random(),
    深圳: Math.random(),
    杭州: Math.random()
};
 
class Visualization extends Component {
    componentDidMount() {
        this.props.switchNavMenu('2');
    }
    getStyles = () => {
        return {
            width: 180,
            height: 180,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 5px rgba(25, 25, 25, 0.25)',
        };
    };
    render() {
        return (
            <div className="summary">
                {_.map(data, (value, key) => {
                    let percentage;
                    if (value > 1) {
                        percentage = 1;
                    } else if (value < 0) {
                        percentage = 0;
                    } else {
                        percentage = value;
                    }
                    return (
                        <div className="titeItem" style={this.getStyles()} key={key}>
                            <ProgressArc
                                data={{
                                    value: percentage,
                                    text: key
                                }}
                                arcID={`test--svg--${key}`}
                                height={140}
                                width={140}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}
  
const mapStateToProps = state => ({ 

});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    switchNavMenu
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));