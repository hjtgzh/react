import './style.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Icon, Button } from 'antd';


const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: '',     // 表示验证码的内容
            validateInput: ''   // 表示用户输入
        };
    }

    componentDidMount() {
        this.renderCode();
        this.props.form.resetFields();
    }

    renderCode = () => {
        let result = '';
        const codeNormal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 字母库
        for (let i = 0; i < 4; i++) {
            result = result + codeNormal[Math.round(Math.random() * (codeNormal.length - 1))];
        } // 随机获取字母四个

        this.setState({
            expression: result.toLowerCase()
        });
    }

    handleChange = (e) => {
        this.setState({
            validateInput: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.userLogin(values.username, values.password);
            }
        });
    }

    validation = (rule, value, callback) => {
        if (value === undefined || value.trim() === '') {
            callback('请输入验证码');
        } else if (value.toLowerCase() !== this.state.expression.toLowerCase()) {
            callback('验证码不正确');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ height: '100%' }}>
                <div className="login-container">
                    <div className="login-content">
                        <div className="login-header">登录</div>
                        {this.props.loginStatus === 'failed' ? <div className="login-failed-content">用户名或密码错误</div> : null}
                        <Form className="login-form" onSubmit={this.handleSubmit}>
                            <FormItem hasFeedback>
                                {getFieldDecorator('username', {
                                    rules: [{ 
                                        required: true, 
                                        message: '请输入用户名' 
                                    }],
                                })(
                                    <Input 
                                        placeholder="请输入用户名" 
                                        prefix={<Icon type="user" />}
                                    />
                                )}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input 
                                        type="password" 
                                        placeholder="请输入密码" 
                                        prefix={<Icon type="lock" />}
                                    />
                                )}
                            </FormItem>
                            <FormItem hasFeedback className="captcha-wrapper">
                                {getFieldDecorator('validate', {
                                    rules: [{
                                        validator: this.validation
                                    }],
                                })(
                                    <Input 
                                        className="validate"
                                        maxLength="4"
                                        placeholder="请输入验证码"
                                    />
                                )}
                                <Button className="captcha" onClick={this.renderCode}>{this.state.expression}</Button>
                            </FormItem>
                            <FormItem>
                                <Button htmlType="submit">登录</Button>
                            </FormItem>
                            <div className="login-footer">
                                <div className="register">注册账号</div>
                                <div className="forget-password">忘记密码</div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const LoginForm = Form.create()(Login);
const mapStateToProps = state => ({
    
});
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));