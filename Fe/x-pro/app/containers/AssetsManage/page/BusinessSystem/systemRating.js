import React, { useState } from 'react';
import {
    Modal,
    Row,
    Col,
    Button,
    Form,
    Typography,
    Radio,
    Select,
    Checkbox,
    Tag,
    Descriptions,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Paragraph } = Typography;
const { Option } = Select;
const ranks = ['rank1', 'rank2', 'rank3', 'rank4', 'rank5'];
const initDisabled = {
    rank1: true,
    rank2: true,
    rank3: true,
    rank4: true,
    rank5: true,
};

const SystemRating = (props) => {
    const [expand, setExpand] = useState(false);
    /* const [mes, setMes] = useState({}); */
    const [data, setData] = useState({
        value: 0,
        selectValue: 0,
        safeRankA: 0,
        safeRankB: 0,
        boxStateB: true,
        buttonState: true,
    });
    // 保存checkboxA的选中值
    const [boxA, setBoxA] = useState([]);
    // 保存checkboxA选择框的禁止状态
    const [disabledA, setDisabledA] = useState({
        rank1: true,
        rank2: true,
        rank3: true,
        rank4: true,
        rank5: true,
    });
    // 保存checkboxB的选中值
    const [boxB, setBoxB] = useState([]);
    // 保存checkboxB选择框的禁止状态
    const [disabledB, setDisabledB] = useState({
        rank1: true,
        rank2: true,
        rank3: true,
        rank4: true,
        rank5: true,
    });

    /*  const fetchRank = () => {
        getRank(params).then((res) => {
            if (res.code === 200) {
                setMes({ ...res.data });
            }
        });
    };

    useEffect(() => {
        fetchRank();
        if (mes.id && !(mes.informationLevel || mes.systemLevel)) {
            setData({
                ...data,
                value: 1,
            })
        } else {
            setData({
                ...data,
                value: 2,
            })
        }
    }, [params]); */

    const onChange = (e) => {
        setData({
            ...data,
            buttonState: true,
            value: e.target.value,
        });
    };

    const selectChange = (v) => {
        console.log(v);
        setData({
            ...data,
            selectValue: v,
            buttonState: false,
        });
    };

    // 以下四个函数用于渲染描述文本
    const toggleForm = () => {
        setExpand(!expand);
    };

    const renderAll = () => (
        <>
            <Descriptions column={4}>
                <Descriptions.Item label="业务系统名称" style={{ paddingLeft: 122 }} span={2}>
                    OA系统
                </Descriptions.Item>
                <Descriptions.Item label="业务类型" style={{ paddingLeft: 73.5 }} span={1}>
                    生产作业
                </Descriptions.Item>
                <Descriptions.Item span={1} style={{ paddingLeft: 147 }}>
                    <Button type="link" onClick={toggleForm}>
                        收起
                        <UpOutlined />
                    </Button>
                </Descriptions.Item>
                <Descriptions span={4} style={{ paddingLeft: '150px' }} label="业务描述">
                    这是业务系统
                </Descriptions>
                <Descriptions label="服务范围" span={2} style={{ paddingLeft: '150px' }}>
                    全国
                </Descriptions>
                <Descriptions label="服务对象" span={2} style={{ paddingLeft: 73.5 }}>
                    单位内部人员、社会闲散人员
                </Descriptions>
                <Descriptions label="覆盖范围" span={2} style={{ paddingLeft: '150px' }}>
                    局域网
                </Descriptions>
                <Descriptions label="网络性质" span={2} style={{ paddingLeft: '73.5px' }}>
                    业务专用
                </Descriptions>
            </Descriptions>
            <Row height="22px">
                <Col span={14}>
                    <div
                        style={{ marginLeft: '122px', float: 'left', color: 'rgba(0, 0, 0, 0.85)' }}
                    >
                        系统互联情况：
                    </div>
                    <div>与本行业其他单位系统连接</div>
                </Col>
                <Col span={10} style={{ marginBottom: 12 }}>
                    <div style={{ marginLeft: '28px' }}>
                        <div style={{ float: 'left', color: 'rgba(0, 0, 0, 0.85)' }}>备注:</div>
                        <Paragraph
                            ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
                            style={{ marginLeft: 42 }}
                        >
                            这是其他信息这是其他信息这是其他信息这是其他信息这是其他信息这是其他信息这是其他信息这是其他信息这是其他信息
                            这是其他信息这是其他信息这是其他信息
                        </Paragraph>
                    </div>
                </Col>
            </Row>
        </>
    );

    const renderSimple = () => (
        <Descriptions column={4}>
            <Descriptions.Item label="业务系统名称" style={{ paddingLeft: 122 }} span={2}>
                OA系统
            </Descriptions.Item>
            <Descriptions.Item label="业务类型" style={{ paddingLeft: 73.5 }} span={1}>
                生产作业
            </Descriptions.Item>
            <Descriptions.Item span={1} style={{ paddingLeft: 147 }}>
                <Button type="link" onClick={toggleForm}>
                    展开
                    <DownOutlined />
                </Button>
            </Descriptions.Item>
        </Descriptions>
    );

    const renderMessage = () => (expand ? renderAll() : renderSimple());

    // 渲染等保备案为是时的表单
    const simpleForm = () => (
        <Form.Item label="系统消息安全等级" name="safeRank" rules={[{ required: true }]}>
            <Select
                placeholder="请选择"
                allowClear
                style={{ width: '332px' }}
                value={data.selectValue}
                onSelect={selectChange}
            >
                <Option value={1}>第一级</Option>
                <Option value={2}>第二级</Option>
                <Option value={3}>第三级</Option>
                <Option value={4}>第四级</Option>
                <Option value={5}>第五级</Option>
            </Select>
        </Form.Item>
    );

    // 渲染等保备案为否时的表单
    const allForm = () => {
        // 检查boxA是否已填写
        const changeFinishedA = () => {
            if (boxA.length) {
                setData({
                    ...data,
                    buttonState: false,
                });
            }
        };
        // 检查boxB是否已填写
        const changeFinishedB = () => {
            if (boxB.length) {
                setData({
                    ...data,
                    buttonState: false,
                });
            }
        };

        // radioA事件处理函数
        const onRankAChange = (e) => {
            setData({
                ...data,
                safeRankA: e.target.value,
            });
            setBoxA([]);
            setDisabledA({
                ...initDisabled,
                [ranks[e.target.value - 1]]: false,
            });
        };

        // checkBoxA事件处理函数
        const onBoxAChange = (checkedValue) => {
            /* console.log(checkedValue); */
            setBoxA(checkedValue);
            /* console.log(boxA); */
            changeFinishedB();
        };

        // radioB事件处理函数
        const onRankBChange = (e) => {
            setData({
                ...data,
                safeRankB: e.target.value,
            });
            setBoxB([]);
            setDisabledB({
                ...initDisabled,
                [ranks[e.target.value - 1]]: false,
            });
        };

        // checkBoxB事件处理函数
        const onBoxBChange = (checkedValue) => {
            /* console.log(checkedValue); */
            setBoxB(checkedValue);
            /* console.log(boxB); */
            changeFinishedA();
        };

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            marginTop: 55,
        };

        const checkboxUpStyle = {
            display: 'block',
            marginTop: 29,
            marginLeft: '8px',
        };

        const checkboxDownStyle = {
            display: 'block',
            marginTop: 12,
        };

        return (
            <>
                <Form.Item rules={[{ required: true }]}>
                    <Form.Item
                        label="选择业务信息安全保护等级"
                        name="safeA"
                        rules={[{ required: true }]}
                        style={{ float: 'left' }}
                    >
                        <Radio.Group onChange={onRankAChange} value={data.safeRankA}>
                            <Radio
                                style={{ display: 'block', height: '30px', lineHeight: '30px' }}
                                value={1}
                            >
                                第一级
                            </Radio>
                            <Radio
                                style={{
                                    display: 'block',
                                    height: '30px',
                                    lineHeight: '30px',
                                    marginTop: '20px',
                                }}
                                value={2}
                            >
                                第二级
                            </Radio>
                            <Radio style={radioStyle} value={3}>
                                第三级
                            </Radio>
                            <Radio style={radioStyle} value={4}>
                                第四级
                            </Radio>
                            <Radio style={radioStyle} value={5}>
                                第五级
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Checkbox.Group onChange={onBoxAChange} disabled={disabledA.rank1}>
                        <Checkbox
                            style={{ display: 'block', marginTop: '4px', marginLeft: '8px' }}
                            value={1}
                        >
                            仅对公民、法人和其他组织的合法权益造成损害
                        </Checkbox>
                    </Checkbox.Group>
                    <Checkbox.Group key="A" disabled={disabledA.rank2} onChange={onBoxAChange}>
                        <Checkbox style={checkboxUpStyle} value={2}>
                            仅对公民、法人和其他组织的合法权益造成严重损害
                        </Checkbox>
                        <Checkbox style={checkboxDownStyle} value={3}>
                            对社会利益和公众秩序造成损害
                        </Checkbox>
                    </Checkbox.Group>
                    <Checkbox.Group disabled={disabledA.rank3} onChange={onBoxAChange}>
                        <Checkbox style={checkboxUpStyle} value={4}>
                            对社会利益和公众秩序造成严重损害
                        </Checkbox>
                        <Checkbox style={checkboxDownStyle} value={5}>
                            对国家安全造成损害
                        </Checkbox>
                    </Checkbox.Group>
                    <Checkbox.Group disabled={disabledA.rank4} onChange={onBoxAChange}>
                        <Checkbox style={checkboxUpStyle} value={6}>
                            对社会利益和公众秩序造成特别严重损害
                        </Checkbox>
                        <Checkbox style={checkboxDownStyle} value={7}>
                            对国家安全造成严重损害
                        </Checkbox>
                    </Checkbox.Group>
                    <Checkbox.Group onChange={onBoxAChange} disabled={disabledA.rank5}>
                        <Checkbox style={checkboxUpStyle} value={8}>
                            对国家安全造成特别严重损害
                        </Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item rules={[{ required: true }]}>
                    <Form.Item
                        label="选择业务信息安全保护等级"
                        name="safeB"
                        rules={[{ required: true }]}
                        style={{ float: 'left' }}
                    >
                        <Radio.Group onChange={onRankBChange} value={data.safeRankB}>
                            <Radio
                                style={{ display: 'block', height: '30px', lineHeight: '30px' }}
                                value={1}
                            >
                                第一级
                            </Radio>
                            <Radio
                                style={{
                                    display: 'block',
                                    height: '30px',
                                    lineHeight: '30px',
                                    marginTop: '20px',
                                }}
                                value={2}
                            >
                                第二级
                            </Radio>
                            <Radio style={radioStyle} value={3}>
                                第三级
                            </Radio>
                            <Radio style={radioStyle} value={4}>
                                第四级
                            </Radio>
                            <Radio style={radioStyle} value={5}>
                                第五级
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Checkbox.Group onChange={onBoxBChange} disabled={disabledB.rank1}>
                        <Checkbox
                            style={{ display: 'block', marginTop: '4px', marginLeft: '8px' }}
                            value={1}
                        >
                            仅对公民、法人和其他组织的合法权益造成损害
                        </Checkbox>
                    </Checkbox.Group>
                    <Checkbox.Group disabled={disabledB.rank2} onChange={onBoxBChange}>
                        <Checkbox style={checkboxUpStyle} value={2}>
                            仅对公民、法人和其他组织的合法权益造成严重损害
                        </Checkbox>
                        <Checkbox style={checkboxDownStyle} value={3}>
                            对社会利益和公众秩序造成损害
                        </Checkbox>
                    </Checkbox.Group>
                    <Checkbox.Group disabled={disabledB.rank3} onChange={onBoxBChange}>
                        <Checkbox style={checkboxUpStyle} value={4}>
                            对社会利益和公众秩序造成严重损害
                        </Checkbox>
                        <Checkbox style={checkboxDownStyle} value={5}>
                            对国家安全造成损害
                        </Checkbox>
                    </Checkbox.Group>
                    <Checkbox.Group disabled={disabledB.rank4} onChange={onBoxBChange}>
                        <Checkbox style={checkboxUpStyle} value={6}>
                            对社会利益和公众秩序造成特别严重损害
                        </Checkbox>
                        <Checkbox style={checkboxDownStyle} value={7}>
                            对国家安全造成严重损害
                        </Checkbox>
                    </Checkbox.Group>
                    <Checkbox.Group onChange={onBoxBChange} disabled={disabledB.rank5}>
                        <Checkbox style={checkboxUpStyle} value={8}>
                            对国家安全造成特别严重损害
                        </Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item label="系统信息安全等级">
                    <Tag color="blue">第二级</Tag>
                </Form.Item>
            </>
        );
    };

    // 决定渲染哪个表单
    const renderForm = () => {
        if (data.value === 1) {
            return simpleForm();
        }
        if (data.value === 2) {
            return allForm();
        }
        return <></>;
    };

    return (
        <Modal
            title="系统定级"
            visible={props.visible}
            width="880px"
            onCancel={props.onCancel}
            okText="提交"
            okButtonProps={{ disabled: data.buttonState }}
            cancelText="取消"
        >
            <div
                style={{
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    width: 880,
                    marginLeft: -24,
                    marginTop: -24,
                    paddingTop: 12,
                }}
            >
                {renderMessage()}
            </div>
            <Form style={{ marginLeft: '134px' }}>
                <Form.Item label="资产是否等保备案" name="backup" rules={[{ required: true }]}>
                    <Radio.Group onChange={onChange} value={data.value}>
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </Radio.Group>
                </Form.Item>
                {renderForm()}
            </Form>
        </Modal>
    );
};

SystemRating.propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
};

export default SystemRating;
