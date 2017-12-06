import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.less';
import { switchNavMenu } from '../redux/actions/nav';
import { Steps, Button, message } from 'antd';

const Step = Steps.Step;

const steps = [
    {
        title: 'First',
        content: 'First-content',
    }, {
        title: 'Second',
        content: 'Second-content',
    }, {
        title: 'Last',
        content: 'Last-content',
    }
];

class StepsContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    componentDidMount() {
        this.props.switchNavMenu('3');
    }
    next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        return (
            <div className="steps-wrap">
                <Steps current={this.state.current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
                <div className="steps-action">
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        this.state.current === steps.length - 1
                        &&
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                    }
                    {
                        this.state.current > 0
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                        Previous
                        </Button>
                    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StepsContent));