import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.less';
import { switchNavMenu } from '../redux/actions/nav';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

// 地区联动
const residences = [
    {
        value: '浙江',
        label: '浙江',
        children: [{
            value: '杭州',
            label: '杭州',
            children: [{
                value: '西湖',
                label: '西湖',
            }],
        }],
    }, {
        value: '江苏',
        label: '江苏',
        children: [{
            value: '南京',
            label: '南京',
            children: [{
                value: '中华门',
                label: '中华门',
            }],
        }],
    }
];

class FormContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            collapsed: false,
            activeMenu: 'form',
            captchaTime: 60
        };
        this.captchaBT = false;
        this.intervalId = null;
    }

    componentDidMount() {
        this.props.switchNavMenu('3');
    }

    // 获取表单数据
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    // 确认密码失去焦点后的操作
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    // 确认密码的检测操作
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    }

    // 填写密码的检测操作
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    // 网站类型的选择
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    menuClick = (item) => {
        this.setState({
            activeMenu: item.key
        });
    }

    // 获取验证码效果处理
    getCaptcha = () => {
        this.captchaBT = true;
        clearInterval(this.intervalId);
        // 用setInterval方法
        this.intervalId = setInterval(() => {
            this.setState({
                captchaTime: this.state.captchaTime - 1
            });
            if (this.state.captchaTime <= 0) {
                clearInterval(this.intervalId);
                this.captchaBT = false;
                this.setState({
                    captchaTime: 60
                });
            }
        }, 1000);

        // 用setTimeout方法
        // const _this = this;
        // this.intervalId = setTimeout(function fn() {
        //     if (_this.state.captchaTime >= 0) {
        //         _this.setState({
        //             captchaTime: _this.state.captchaTime - 1
        //         });
        //         setTimeout(fn, 1000);
        //     } else {
        //         clearInterval(_this.intervalId);
        //         _this.captchaBT = false;
        //         _this.setState({
        //             captchaTime: 60
        //         });
        //     }
        // }, 1000);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        // 手机号前面的区号选择
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <div className="form-wrap">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '邮箱格式不正确',
                            }, {
                                required: true, message: '请输入邮箱',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码',
                            }, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请确认密码',
                            }, {
                                validator: this.checkPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                昵称&nbsp;
                                <Tooltip title="别人对你的称呼?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="户籍所在地"
                    >
                        {getFieldDecorator('residence', {
                            initialValue: ['浙江', '杭州', '西湖'],
                            rules: [{ type: 'array', required: true, message: '请输入户籍所在地!' }],
                        })(
                            <Cascader options={residences} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="电话号码"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入手机号!' }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="网站"
                    >
                        {getFieldDecorator('website', {
                            rules: [{ required: true, message: '请输入网站!' }],
                        })(
                            <AutoComplete
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                                placeholder="请输入网站"
                            >
                                <Input />
                            </AutoComplete>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="验证码"
                        extra="确保你是人"
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('captcha', {
                                    rules: [{ required: true, message: '请输入获得的验证码!' }],
                                })(
                                    <Input />
                                )}
                            </Col>
                            <Col span={12}>
                                <Button disabled={this.captchaBT} onClick={this.getCaptcha}>{this.state.captchaTime < 60 && this.state.captchaTime > 0 ? `${this.state.captchaTime}后重新获取验证码` : '获取验证码'}</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>我已经阅读了<a href="">相关条例</a></Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">注册</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
  
const mapStateToProps = state => ({ 

});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    switchNavMenu
}, dispatch);

const handleForm = Form.create()(FormContent);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(handleForm));