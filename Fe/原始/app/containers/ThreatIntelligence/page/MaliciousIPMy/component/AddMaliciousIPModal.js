import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { searchParams } from '@utils/searchParams';
import { Modal, Form, Input, Divider, Row, Col, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ScTag } from '../../../styled';
import { getMaliciousIPAdd, getMaliciousIPEdit, getLabelsPage } from '../api';
const { TextArea } = Input;
const { Option } = Select;
const tagType = [
    'HW攻击源',
    '钓鱼攻击',
    '拒绝服务攻击',
    '恶意扫描攻击',
    '命令执行',
    'sql注入',
    '暴力破解',
    'APT',
    '水坑攻击',
    '挖矿',
    '蜜罐捕获',
    '勒索软件',
    '账号窃密',
    '漏洞利用',
    '远程控制RAT',
    '僵尸网路Botnet',
];

const MaliciousIPPage = (props) => {
    const { threatId, unitName } = searchParams();
    const { checkFunc, buttonState, modalRecord, modalVisibleState } = props;
    const [form] = Form.useForm();
    //  添加标签的输入框是否可见的状态
    const [inputVisible, setInputVisible] = useState(false);
    // 标签的颜色
    const [tagColor, setTagColor] = useState();
    // 每个标签的标识
    const [indexTag, setIndexTag] = useState();
    // 要展示的标签类型
    const [tagTypeShow, setTypeShow] = useState([]);

    useEffect(() => {
        if (modalRecord) {
            if (modalRecord.tags) {
                setTypeShow(modalRecord.tags);
            }
            form.setFieldsValue({
                unitName,
                value: modalRecord.value,
            });
        }
    }, [modalVisibleState]);
    // 点击确定的回调函数
    const handleOk = () => {
        form.validateFields().then((values) => {
            if (buttonState === 1) {
                getMaliciousIPAdd({ ...values, labels: tagTypeShow }).then((res) => {
                    if (res.code === 200) {
                        message.success('提交成功');
                        checkFunc();
                    } else {
                        message.error(res.message);
                    }
                });
            } else {
                getMaliciousIPEdit({
                    oldValue: modalRecord ? modalRecord.value : '',
                    value: values.value,
                    labels: tagTypeShow,
                    threatId,
                    type: modalRecord && modalRecord.type,
                }).then((res) => {
                    if (res.code === 200) {
                        message.success('提交成功');
                        checkFunc();
                    } else {
                        message.error(res.message);
                    }
                });
            }
            props.setModalVisibleState(false);
            form.resetFields();
        });
    };
    // 点击取消的回调函数
    const handleCancel = () => {
        props.setModalVisibleState(false);
        form.resetFields();
    };
    const closeTag = (item) => {
        const tags = tagTypeShow.filter((tag) => tag !== item);
        setTypeShow(tags);
    };
    const showInput = () => {
        setInputVisible(true);
    };

    const [labelsParam, setLabelsParam] = useState({
        limit: 100,
        offset: 0,
        param: {
            name: '',
        },
    });
    const handleInputChange = (e) => {
        if (tagTypeShow.indexOf(e) === -1) {
            setTypeShow([...tagTypeShow, e[0]]);
        }
        setLabelsParam({ ...labelsParam, param: { name: e[0] } });
        setInputVisible(false);
    };
    const [labelsData, setLabelsData] = useState({});
    useEffect(() => {
        getLabelsPage(labelsParam).then((res) => {
            if (res.code === 200) {
                setLabelsData(res.data);
            }
        });
    }, [labelsParam]);
    const tagClick = (item, index) => {
        setTagColor('blue');
        setIndexTag(index);
        const tagArray = [];
        if (tagTypeShow.indexOf(item) === -1) {
            tagArray.push(item);
        }
        setTypeShow([...tagTypeShow, ...tagArray]);
    };
    return (
        <>
            <Modal
                title={props.buttonState === 1 ? '新增恶意IP' : '编辑恶意ip'}
                width="35%"
                visible={props.modalVisibleState}
                okText="确定"
                cancelText="取消"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} name="editIp" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <Row>
                        <Col span={21}>
                            <Form.Item
                                label="单位名称"
                                name="unitName"
                                rules={[
                                    {
                                        required: props.buttonState === 1 && true,
                                        message: '请输入单位名称',
                                    },
                                ]}
                            >
                                <Input disabled={props.buttonState === 2} placeholder="请输入" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={21}>
                            <Form.Item
                                label="攻击IP/域名"
                                name="value"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入攻击IP/域名',
                                    },
                                ]}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="如：1.1.1.1，输入多个IP请用分号；隔开输入"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={21}>
                            <Form.Item label="标签" style={{ margin: '0px' }}>
                                {tagTypeShow.map((item) => (
                                    <ScTag
                                        key={item}
                                        color={item === 'HW攻击源' ? 'red' : 'blue'}
                                        closable
                                        onClose={() => {
                                            closeTag(item);
                                        }}
                                    >
                                        {item}
                                    </ScTag>
                                ))}
                                {inputVisible ? (
                                    <Select
                                        mode="tags"
                                        showSearch
                                        style={{ width: '105px' }}
                                        onChange={handleInputChange}
                                        defaultActiveFirstOption={false}
                                        showArrow={false}
                                        filterOption={false}
                                        notFoundContent={null}
                                    >
                                        {labelsData.records.map((item) => (
                                            <Option key={item.id} value={item.name}>
                                                {item.name}
                                            </Option>
                                        ))}
                                    </Select>
                                ) : (
                                    <ScTag className="site-tag-plus" onClick={showInput}>
                                        <PlusOutlined />
                                        标签
                                    </ScTag>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center" style={{ paddingLeft: '48px' }}>
                        <Col span={17}>
                            <Divider style={{ margin: '10px 0px' }} />
                            {tagType.map((item, index) => {
                                if (item === 'HW攻击源') {
                                    return (
                                        <ScTag
                                            onClick={() => {
                                                tagClick(item, index);
                                            }}
                                            color="red"
                                            key={item}
                                        >
                                            {item}
                                        </ScTag>
                                    );
                                }
                                return (
                                    <ScTag
                                        onClick={() => {
                                            tagClick(item, index);
                                        }}
                                        color={index === indexTag ? tagColor : ''}
                                        key={item}
                                    >
                                        {item}
                                    </ScTag>
                                );
                            })}
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

MaliciousIPPage.propTypes = {
    buttonState: PropTypes.number,
    modalVisibleState: PropTypes.bool,
    setModalVisibleState: PropTypes.func,
    checkFunc: PropTypes.func,
    modalRecord: PropTypes.object,
};
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });
// const mapDispatchToProps = () => ({});

const withConnect = connect(null, null);

export default compose(withConnect, memo)(MaliciousIPPage);
