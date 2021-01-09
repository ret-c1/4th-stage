import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { PageHeader, Form, Select, Radio, Input, Button } from 'antd';
import { ScCard } from '../../styled';
// import { getDaliyList, getDaliyStatistic, deleteDaliy } from './api';
const { Option } = Select;
const ModifyPage = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    return (
        <>
            <PageHeader ghost={false} title="新增工作计划" />
            <ScCard style={{ height: '85%' }}>
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 7 }}>
                    <Form.Item label="计划类型" name="type">
                        <Select>
                            <Option value="主机扫描">主机扫描</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="是否复测" name="retest">
                        <Radio.Group>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginLeft: '-11%',
                        }}
                    >
                        <Form.Item label="客户联系人" wrapperCol={{ span: 12 }}>
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 23 }}>
                            <Input style={{ marginRight: '-11%' }} />
                        </Form.Item>
                    </div>
                    <Form.Item label="客户地址" name="customerAddress">
                        <Input />
                    </Form.Item>
                    <Form.Item label="备注" name="remark">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => history.goBack()}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </ScCard>
        </>
    );
};

// ModifyPage.propTypes = {
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

export default compose(withConnect, memo)(ModifyPage);
