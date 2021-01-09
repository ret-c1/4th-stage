import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { PageHeader, Button, Form, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FormItem from '@components/FormItem';
import { basicFormconfigStep1, basicFormconfigStep3 } from './config';
import { ScCardDetail, ScFooterToolbar } from '../../styled';

const WechatChangePage = () => {
    const history = useHistory();
    const [form] = Form.useForm();

    const finish = (values) => {
        console.log('values', values);
    };
    return (
        <Form
            form={form}
            name="change"
            labelCol={{ span: 18 }}
            wrapperCol={{ span: 16 }}
            layout="vertical"
            onFinish={finish}
        >
            <PageHeader ghost={false} title="变更Wechat资产" />
            <div
                style={{
                    height: 'calc(100vh - 64px - 54px - 72px - 56px)',
                    marginTop: '8px',
                    overflow: 'auto',
                }}
            >
                <ScCardDetail title="Wechat信息" bordered={false}>
                    <Row gutter={24}>
                        {basicFormconfigStep1.map((item) => (
                            <Col span={8}>
                                <FormItem
                                    key={item.label}
                                    label={item.label}
                                    name={item.name}
                                    type={item.type}
                                    options={item.options}
                                    placeholder={item.placeholder}
                                    rules={item.rules}
                                />
                            </Col>
                        ))}
                    </Row>
                </ScCardDetail>
                <ScCardDetail title="责任人信息" bordered={false}>
                    <Row gutter={24}>
                        {basicFormconfigStep3.map((item) => (
                            <Col span={8}>
                                <FormItem
                                    key={item.label}
                                    label={item.label}
                                    name={item.name}
                                    type={item.type}
                                    options={item.options}
                                    placeholder={item.placeholder}
                                    rules={item.rules}
                                />
                            </Col>
                        ))}
                    </Row>
                </ScCardDetail>
            </div>
            <ScFooterToolbar>
                <Row style={{ float: 'right', marginTop: '10px' }}>
                    <Col>
                        <Button style={{ marginRight: '10px' }} onClick={() => history.go(-1)}>
                            取消
                        </Button>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{ marginRight: '10px' }}
                            >
                                保存
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </ScFooterToolbar>
        </Form>
    );
};

// OperationPage.propTypes = {
//     rxInfo: PropTypes.object,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(WechatChangePage);
