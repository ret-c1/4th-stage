import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import {
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Select,
    Button,
    Alert,
    // Modal,
    Tooltip,
    Radio,
    Card,
    Space,
    Result,
    // message,
} from 'antd';
import { QuestionCircleOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
import { Title, ScCard, ScFooterToolbar } from './styled';
const { Option } = Select;
const { TextArea } = Input;

const CreateProjectPage = (props) => {
    const history = useHistory();
    const { id, stage } = searchParams();
    const [form] = Form.useForm();
    const { rxInfo } = props;
    const [isShowMore] = useState(true);
    const [detail] = useState({});
    const [startTime] = useState('');

    const [operateDone] = useState(false);
    const [proId] = useState('');
    // 城市选择
    const [topCity] = useState([]);
    const [bottomCity] = useState([]);

    // 提示框
    const [showStatus] = useState(false);
    const [showMsg] = useState('');
    const handleAfterCallback = () => {
        // setShowStatus(false);
    };
    const [isDisabled] = useState(true);
    const [repeatMessage] = useState(false);
    return (
        <>
            <Card>
                <Title>
                    {stage === 'add' && '新增'}
                    {stage === 'edit' && '编辑'}
                    {stage === 'detail' && '查看'}
                    项目
                </Title>
            </Card>
            {!id && operateDone ? (
                <ScCard style={{ height: '52%' }}>
                    <Result
                        status="success"
                        title="新增成功"
                        subTitle={
                            <>
                                你已成功创建“{form.getFieldValue('projectName')}
                                ”项目，可点击下方“成员设置”按钮跳转至成员设置页面为该项目添加成员。
                            </>
                        }
                        extra={[
                            <Button
                                type="primary"
                                key="buy"
                                onClick={() => history.push(`/project/memberSet?id=${proId}`)}
                            >
                                成员设置
                            </Button>,
                            <Button key="console" onClick={() => history.goBack()}>
                                返回
                            </Button>,
                        ]}
                    />
                </ScCard>
            ) : (
                <Form
                    name="basic"
                    initialValues={{ remember: true, managerId: rxInfo.name }}
                    style={{ marginTop: '20px', paddingBottom: 60 }}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 13 }}
                    form={form}
                >
                    <ScCard title="基本信息">
                        {showStatus && (
                            <Alert
                                message={showMsg}
                                type="error"
                                showIcon
                                closable
                                afterClose={handleAfterCallback}
                            />
                        )}
                        <Row>
                            <Col span={12}>
                                <Form.Item label="合同编号">
                                    {stage && stage === 'detail' ? (
                                        detail.contractNo
                                    ) : (
                                        <Row>
                                            <Col span={14}>
                                                <Form.Item name="contractNo">
                                                    <Input placeholder="如：AH20-S03-027" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6} offset={1}>
                                                <Button>导入项目信息</Button>
                                            </Col>
                                        </Row>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="提前实施编号" name="no">
                                    {stage && stage === 'detail' ? (
                                        detail.no
                                    ) : (
                                        <Input placeholder="如：AH20-S03-027" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="项目名称"
                                    name="projectName"
                                    rules={[{ required: true, message: '请输入项目名称!' }]}
                                >
                                    {stage && stage === 'detail' ? (
                                        detail.projectName
                                    ) : (
                                        <Input placeholder="请输入项目名称" />
                                    )}
                                </Form.Item>
                                {repeatMessage && (
                                    <div
                                        style={{
                                            color: '#F52222',
                                            fontSize: 14,
                                            margin: '-20px 0 0 80px',
                                        }}
                                    >
                                        项目名称重复
                                    </div>
                                )}
                            </Col>
                            <Col span={12}>
                                <Form.Item label="客户全称" name="clientName">
                                    {stage && stage === 'detail' ? (
                                        detail.clientName
                                    ) : (
                                        <Input placeholder="请输入" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="服务名称"
                                    name="serviceName"
                                    rules={[{ required: true, message: '请输入服务名称!' }]}
                                >
                                    {stage && stage === 'detail' ? (
                                        detail.serviceName
                                    ) : (
                                        <Input placeholder="请输入服务名称" />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="合同类型" name="contractType">
                                    {stage && stage === 'detail' ? (
                                        detail.contractType
                                    ) : (
                                        <Select placeholder="请选择合同类型">
                                            <Option value="合同">合同</Option>
                                            <Option value="非合同">非合同</Option>
                                            <Option value="提前实施">提前实施</Option>
                                            <Option value="合同外支持">合同外支持</Option>
                                            <Option value="战略支持">战略支持</Option>
                                            <Option value="日常工作">日常工作</Option>
                                            <Option value="其他">其他</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
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
                                    {stage && stage === 'detail' ? (
                                        detail.serviceStartTime &&
                                        moment(detail.serviceStartTime).format('YYYY-MM-DD')
                                    ) : (
                                        <DatePicker
                                            placeholder="请选择服务开始时间"
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="服务结束时间" name="serviceEndTime">
                                    {stage && stage === 'detail' ? (
                                        detail.serviceEndTime &&
                                        moment(detail.serviceEndTime).format('YYYY-MM-DD')
                                    ) : (
                                        <DatePicker
                                            disabledDate={(current) =>
                                                current && current < startTime
                                            }
                                            placeholder="请选择服务结束时间"
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="项目当前阶段" name="current">
                                    <Input disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="项目级别" name="level">
                                    {stage && stage === 'detail' ? (
                                        detail.level
                                    ) : (
                                        <Select placeholder="请选择">
                                            <Option value="A">A</Option>
                                            <Option value="B">B</Option>
                                            <Option value="C">C</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="是否暂停" name="status">
                                    <Radio.Group disabled={isDisabled}>
                                        <Radio value={null}>否</Radio>
                                        <Radio value={3}>是</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
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
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="项目经理" name="managerId">
                                    <Input value={rxInfo.name} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="负责销售" name="responsibleSeller">
                                    {stage && stage === 'detail' ? (
                                        detail.responsibleSeller
                                    ) : (
                                        <Input placeholder="请输入" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="是否护网"
                                    name="hwStatus"
                                    rules={[{ required: true, message: '请选择是否护网' }]}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                    </ScCard>
                    <ScCard
                        title={
                            <>
                                更多信息
                                <span style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.45)' }}>
                                    <Button type="text">
                                        {isShowMore ? <UpOutlined /> : <DownOutlined />}
                                    </Button>
                                    服务数量、实施城市、标准验收条款、客户信息、联系人信息等
                                </span>
                            </>
                        }
                    >
                        {isShowMore && (
                            <>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="服务数量" name="serviceQuantity">
                                            {stage && stage === 'detail' ? (
                                                detail.serviceQuantity
                                            ) : (
                                                <Input placeholder="请输入" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="实施城市"
                                            name="implementationProvince"
                                            style={{ marginBottom: 0 }}
                                        >
                                            {stage && stage === 'detail' ? (
                                                detail.implementationProvince
                                            ) : (
                                                <Row gutter={24}>
                                                    <Col span={12}>
                                                        <Form.Item name="TopCity">
                                                            <Select>
                                                                {topCity.map((item) => (
                                                                    <Option
                                                                        value={item.name}
                                                                        key={item.sort}
                                                                    >
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
                                                                    <Option
                                                                        value={item.name}
                                                                        key={item.sort}
                                                                    >
                                                                        {item.name}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="服务联系人" name="businessAttention">
                                            {stage && stage === 'detail' ? (
                                                detail.businessAttention
                                            ) : (
                                                <Input placeholder="请输入服务联系人" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="技术联系人" name="technicalAttention">
                                            {stage && stage === 'detail' ? (
                                                detail.technicalAttention
                                            ) : (
                                                <Input placeholder="请输入技术联系人" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="实施情况" name="progressStatus">
                                            {stage && stage === 'detail' ? (
                                                detail.progressStatus
                                            ) : (
                                                <Input placeholder="请输入实施情况" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="集成情况" name="integratedStatus">
                                            {stage && stage === 'detail' ? (
                                                detail.integratedStatus
                                            ) : (
                                                <Input placeholder="请输入集成情况" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="条款比例" name="collectionRatio">
                                            {stage && stage === 'detail' ? (
                                                detail.collectionRatio
                                            ) : (
                                                <Input placeholder="请输入条款比例" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="评审结束时间" name="reviewEndTime">
                                            {stage && stage === 'detail' ? (
                                                detail.reviewEndTime &&
                                                moment(detail.reviewEndTime).format('YYYY-MM-DD')
                                            ) : (
                                                <DatePicker
                                                    placeholder="请选择评审结束时间"
                                                    style={{ width: '100%' }}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label="标准验收条款"
                                            name="standardAcceptanceClause"
                                        >
                                            {stage && stage === 'detail' ? (
                                                detail.standardAcceptanceClause
                                            ) : (
                                                <TextArea
                                                    rows={4}
                                                    placeholder="请输入标准验收条款"
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="非标准验收条款"
                                            name="nonStandardAcceptanceClause"
                                        >
                                            {stage && stage === 'detail' ? (
                                                detail.nonStandardAcceptanceClause
                                            ) : (
                                                <TextArea
                                                    rows={4}
                                                    placeholder="请输入非标准验收条款"
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="客户英文简称" name="clientEnName">
                                            {stage && stage === 'detail' ? (
                                                detail.clientEnName
                                            ) : (
                                                <Input placeholder="请输入最终客户英文简称" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="客户中文简称" name="clientNameAbb">
                                            {stage && stage === 'detail' ? (
                                                detail.clientNameAbb
                                            ) : (
                                                <Input placeholder="请输入最终客户中文简称" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="客户所属行业分类" name="clientCategory">
                                            <Select
                                                placeholder="请选择客户所属行业分类"
                                                disabled={stage && stage === 'detail'}
                                            >
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
                                    <Col span={12}>
                                        <Form.Item label="客户省份" name="clientProvince">
                                            {stage && stage === 'detail' ? (
                                                detail.clientProvince
                                            ) : (
                                                <Select placeholder="请选择客户省份">
                                                    {topCity.map((item) => (
                                                        <Option value={item.name} key={item.sort}>
                                                            {item.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="客户联系人" name="clientAttention">
                                            {stage && stage === 'detail' ? (
                                                detail.clientAttention
                                            ) : (
                                                <Input placeholder="请输入客户联系人" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="客户邮箱" name="clientEmail">
                                            {stage && stage === 'detail' ? (
                                                detail.clientEmail
                                            ) : (
                                                <Input placeholder="请输入客户邮箱" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="客户办公电话" name="clientOfficePhone">
                                            {stage && stage === 'detail' ? (
                                                detail.clientOfficePhone
                                            ) : (
                                                <Input placeholder="请输入客户办公电话" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="客户手机电话" name="clientMobilePhone">
                                            {stage && stage === 'detail' ? (
                                                detail.clientMobilePhone
                                            ) : (
                                                <Input placeholder="请输入客户手机电话" />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="销售部门" name="salesDepartment">
                                            <Select
                                                placeholder="请选择销售部门"
                                                disabled={stage && stage === 'detail'}
                                            >
                                                <Option value="1">营销中心-销售管理部</Option>
                                                <Option value="2">营销中心-行业销售</Option>
                                                <Option value="3">营销中心-区域销售</Option>
                                                <Option value="4">营销中心-商业渠道事业部</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </ScCard>
                    {(stage === 'add' || stage === 'edit') && (
                        <ScFooterToolbar>
                            <Row justify="end" style={{ padding: '10px 24px 0 0' }}>
                                <Col>
                                    <Space>
                                        <Button onClick={() => history.goBack()}>
                                            {id ? '返回' : '取消'}
                                        </Button>
                                        <Button type="primary" htmlType="submit">
                                            {id ? '保存' : '提交'}
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </ScFooterToolbar>
                    )}
                </Form>
            )}
        </>
    );
};

CreateProjectPage.propTypes = {
    rxInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(CreateProjectPage);
