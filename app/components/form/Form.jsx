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
        };
    }

    componentDidMount() {
        this.props.switchNavMenu('3');
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
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
            <div className="page-content">
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
                                    <Button>获取验证码</Button>
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