import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import {
    PageHeader,
    Button,
    Card,
    Form,
    Row,
    Col,
    Space,
    Select,
    Input,
    DatePicker,
    InputNumber,
    Drawer,
    Descriptions,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ScCard } from '../../styled';
import { ScFooterToolbar } from './styled';
import PlanList from '../../componments/PlanList';
import AssetDrawer from '../../componments/AssetDrawer';
// import { getDaliyList, getDaliyStatistic, deleteDaliy } from './api';
const { Option } = Select;
let id = 0;
const WorkOrderPage = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const [key, setKey] = useState([0]);
    return (
        <>
            <PageHeader ghost={false} title="添加工单" />
            <ScCard>
                <Form form={form} layout="vertical" wrapperCol={{ span: 18 }}>
                    <PlanList isShowAction={false} />
                    {key.map((item) => (
                        <Card
                            key={item}
                            style={
                                item === 0
                                    ? { background: 'rgba(0,0,0,0.02)', marginTop: '-13px' }
                                    : { background: 'rgba(0,0,0,0.02)' }
                            }
                        >
                            <Row style={{ paddingLeft: '56px' }}>
                                <Col span={7}>
                                    <Form.Item label="任务工单类型">
                                        <Select>
                                            <Option>WEB扫描</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="备注">
                                        <Input.TextArea />
                                    </Form.Item>
                                </Col>
                                <Col span={4} style={{ marginTop: '30px' }}>
                                    <Form.Item>
                                        <DatePicker showTime />
                                    </Form.Item>
                                    <p>~</p>
                                    <Form.Item>
                                        <DatePicker showTime />
                                    </Form.Item>
                                </Col>
                                <Col
                                    span={3}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        marginTop: '30px',
                                    }}
                                >
                                    <Form.Item>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={2} style={{ marginTop: '30px' }}>
                                    <Form.Item>
                                        <InputNumber />
                                    </Form.Item>
                                    人日
                                </Col>
                                <Col
                                    span={3}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginTop: '30px',
                                    }}
                                >
                                    <Button type="link" onClick={showDrawer}>
                                        关联
                                    </Button>
                                </Col>
                                <Col span={2} style={{ marginTop: '30px' }}>
                                    -
                                </Col>
                                <Col span={2} style={{ marginTop: '30px' }}>
                                    <Button>复制</Button>
                                    <Button style={{ marginTop: 8 }}>删除</Button>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    <Card>
                        <Button
                            type="dashed"
                            block
                            onClick={() => {
                                setKey([...key, (id += 1)]);
                            }}
                        >
                            <PlusOutlined /> 添加工单
                        </Button>
                    </Card>
                    <ScFooterToolbar>
                        <Row justify="end" style={{ paddingTop: 10 }}>
                            <Col>
                                <Space>
                                    <Button onClick={() => history.goBack()}>取消</Button>
                                    <Button type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </ScFooterToolbar>
                </Form>
            </ScCard>
            <Drawer
                title="关联资产"
                placement="right"
                onClose={onClose}
                visible={visible}
                width={800}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            取消
                        </Button>
                        <Button onClick={onClose} type="primary">
                            提交
                        </Button>
                    </div>
                }
            >
                <div
                    style={{
                        background: 'rgba(0, 0, 0, 0.04)',
                        margin: '-25px 0 10px 0',
                        padding: '0 -20px',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Descriptions column={2}>
                        <Descriptions.Item label="任务类型">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="任务编号">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="执行人">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="执行起始时间">Zhou Maomao</Descriptions.Item>
                    </Descriptions>
                    <Button type="link">收起</Button>
                </div>
                <AssetDrawer />
            </Drawer>
        </>
    );
};

// WorkOrderPage.propTypes = {
//     rxRole: PropTypes.array,
// };

// const mapStateToProps = (state) => ({
//     rxRole: state.global.role,
//     rxChecked: state.intelligence.checked,
// });
//
// const mapDispatchToProps = (dispatch) => ({
//     rxTabelcheck: (id) => {
//         dispatch(tabelcheckAction(id));
//     },
//     rxTabelcheckall: (ids) => {
//         dispatch(tabelallcheckAction(ids));
//     },
// });

const withConnect = connect(null, null);

export default compose(withConnect, memo)(WorkOrderPage);
