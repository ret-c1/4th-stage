import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Select,
    Button,
    Alert,
    Modal,
    Tooltip,
    Radio,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const AddNewProject = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const { prev, rxInfo } = props;
    const handleFinish = (values) => {
        const data = `${values.TopCity}${values.BottomCity}`;
        getNewProject({
            ...values,
            implementationProvince: data,
        }).then((res) => {
            if (res.code === 200) {
                history.push(`/project/add?id=${res.data.id}`);
                prev();
            } else {
                Modal.warning({
                    title: '提示',
                    content: res.message,
                });
            }
        });
    };
    const [topCity, setTopCity] = useState([]);
    const [bottomCity, setBottomCity] = useState([]);
    const handleChangeTop = (value) => {
        let id;
        topCity.forEach((item) => {
            if (item.name === value) id = item.sort;
        });
        getBottomCity({ parentId: id }).then((res) => {
            if (res.code === 200) {
                setBottomCity(res.data);
            } else {
                console.log('获取数据失败');
            }
        });
    };
    useEffect(() => {
        getTopCity().then((res) => {
            if (res.code === 200) {
                setTopCity(res.data);
            } else {
                console.log('获取数据失败');
            }
        });
    }, []);

    // 提示框
    const [showStatus, setShowStatus] = useState(false);
    const [showMsg, setShowMsg] = useState('');
    const handleAfterCallback = () => {
        setShowStatus(false);
    };
    // 导入项目信息
    const handleImportPro = () => {
        const val = form.getFieldValue('contractNo');
        importProject({ contractNo: val.toUpperCase() }).then((res) => {
            if (res.code === 200) {
                setShowStatus(false);
                // form.setFieldsValue({ clientName: res.data.clientName });
                const keys = Object.keys(res.data);
                keys.forEach((item) => {
                    console.log(item, res.data[item]);
                    form.setFieldsValue({ [`${item}`]: res.data[item] });
                });
            } else {
                setShowMsg(res.message);
                setShowStatus(true);
            }
        });
    };

    return (
        <>
            {showStatus ? (
                <Alert
                    message={showMsg}
                    type="error"
                    showIcon
                    closable
                    afterClose={handleAfterCallback}
                />
            ) : null}
            <Form
                name="basic"
                initialValues={{ remember: true }}
                style={{ marginTop: '20px' }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form}
            >
                <Row>
                    <Col span={8}>
                        <Form.Item label="合同编号" name="contractNo">
                            <Row gutter={12}>
                                <Col span={15}>
                                    <Input placeholder="请输入合同编号" />
                                </Col>
                                <Col span={8}>
                                    <Button>导入项目信息</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item labelCol={{ span: 9 }} label="提前实施编号" name="no">
                            <Input placeholder="请输入提前实施编号" />
                        </Form.Item>
                    </Col>
                </Row>
                <h1>
                    <strong>项目信息</strong>
                </h1>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="项目名称"
                            name="projectName"
                            rules={[{ required: true, message: '请输入项目名称!' }]}
                        >
                            <Input placeholder="请输入项目名称" />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item
                            label="实施城市"
                            name="implementationProvince"
                            style={{ marginBottom: 0 }}
                        >
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item name="TopCity">
                                        <Select onChange={handleChangeTop}>
                                            {topCity.map((item) => (
                                                <Option value={item.name} key={item.sort}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="BottomCity">
                                        <Select>
                                            {bottomCity.map((item) => (
                                                <Option value={item.name} key={item.sort}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="是否暂停" name="status">
                            <Radio.Group>
                                <Radio value={null}>否</Radio>
                                <Radio value={3}>是</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item
                            label={
                                <span>
                                    是否主导&nbsp;
                                    <Tooltip title="1">
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </span>
                            }
                            name="ahMasterServiceProvider"
                        >
                            <Radio.Group>
                                <Radio value="1">是</Radio>
                                <Radio value="0">否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="服务联系人" name="businessAttention">
                            <Input placeholder="请输入服务联系人" />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="技术联系人" name="technicalAttention">
                            <Input placeholder="请输入技术联系人" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="服务开始时间"
                            name="serviceStartTime"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择服务开始时间!',
                                },
                            ]}
                        >
                            <DatePicker
                                placeholder="请选择服务开始时间"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="服务结束时间" name="serviceEndTime">
                            <DatePicker
                                placeholder="请选择服务结束时间"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="服务名称"
                            name="serviceName"
                            rules={[{ required: true, message: '请输入服务名称!' }]}
                        >
                            <Input placeholder="请输入服务名称" />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="服务数量" name="serviceQuantity">
                            <Input placeholder="请输入服务数量" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="实施情况" name="progressStatus">
                            <Input placeholder="请输入实施情况" />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="集成情况" name="integratedStatus">
                            <Input placeholder="请输入集成情况" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="合同类型" name="contractType">
                            <Select placeholder="请选择合同类型">
                                <Option value="合同">合同</Option>
                                <Option value="非合同">非合同</Option>
                                <Option value="提前实施">提前实施</Option>
                                <Option value="合同外支持">合同外支持</Option>
                                <Option value="战略支持">战略支持</Option>
                                <Option value="日常工作">日常工作</Option>
                                <Option value="其他">其他</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="评审结束时间" name="reviewEndTime">
                            <DatePicker
                                placeholder="请选择评审结束时间"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="条款比例" name="collectionRatio">
                            <Input placeholder="请输入条款比例" />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="项目经理" name="managerId">
                            <Input value={rxInfo.id} placeholder={rxInfo.name} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="标准验收条款" name="standardAcceptanceClause">
                            <TextArea rows={4} placeholder="请输入标准验收条款" />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="非标准验收条款" name="nonStandardAcceptanceClause:">
                            <TextArea rows={4} placeholder="请输入非标准验收条款" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={17}>
                        <Form.Item
                            label="备注"
                            name="remark"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                        >
                            <TextArea rows={4} placeholder="备注" />
                        </Form.Item>
                    </Col>
                </Row>
                <h1>
                    <strong>客户信息</strong>
                </h1>
                <Row>
                    <Col span={16}>
                        <Form.Item
                            label="最终客户全称"
                            name="clientName"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 8 }}
                            rules={[{ required: true, message: '请输入最终客户全称!' }]}
                        >
                            <Input placeholder="请输入最终客户全称" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="最终客户英文简称：" name="clientEnName">
                            <Input placeholder="请输入最终客户英文简称" />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="最终客户中文简称：" name="clientNameAbb">
                            <Input placeholder="请输入最终客户中文简称" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="客户所属行业分类：" name="clientCategory">
                            <Select placeholder="请选择客户所属行业分类">
                                <Option value="1">金融</Option>
                                <Option value="2">教育</Option>
                                <Option value="3">运营商</Option>
                                <Option value="4">能源与企业</Option>
                                <Option value="5">互联网</Option>
                                <Option value="6">渠道</Option>
                                <Option value="7">农业</Option>
                                <Option value="8">建筑业</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="销售部门：" name="salesDepartment">
                            <Select placeholder="请选择销售部门">
                                <Option value="1">营销中心-销售管理部</Option>
                                <Option value="2">营销中心-行业销售</Option>
                                <Option value="3">营销中心-区域销售</Option>
                                <Option value="4">营销中心-商业渠道事业部</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="负责销售：" name="responsibleSeller">
                            <Input placeholder="请输入负责销售" />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="客户联系人" name="clientAttention">
                            <Input placeholder="请输入客户联系人" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="客户办公电话：" name="clientOfficePhone">
                            <Input placeholder="请输入客户办公电话" />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="客户手机电话" name="clientMobilePhone">
                            <Input placeholder="请输入客户手机电话" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="客户邮箱：" name="clientEmail">
                            <Input placeholder="请输入客户邮箱" />
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={1}>
                        <Form.Item label="客户省份:" name="clientProvince">
                            <Select placeholder="请选择客户省份">
                                {topCity.map((item) => (
                                    <Option value={item.name} key={item.sort}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="space-between">
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => {
                                history.push(`/project/list`);
                            }}
                        >
                            返回
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" htmlType="submit">
                            继续录入资产信息
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

AddNewProject.propTypes = {
    prev: PropTypes.func,
    rxInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(AddNewProject);
