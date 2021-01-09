import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Card, Form, Row, Col, Radio, Select } from 'antd';
import FormItem from '@components/FormItem';
import { useHistory } from 'react-router-dom';
import { renderFromData } from '@components/FormItem/utils';
import PubMessage from '@components/PubMessage';
import { searchParams } from '@utils/searchParams';
import TableForm from './TableForm';
import { missionFormConfig, noticeFormConfig, assessPerson } from './formconfig';
import { getExpertsList, getOperatersList, getVulType, createThreat } from '../api';
import useExpertList from '../../hooks/useExpertList';
import useRemoteSelect from '../../hooks/useRemoteSelect';

const { Option } = Select;

const ScItWrapper = styled.div`
    margin: 20px 24px 80px 24px;
`;

const ScCustomCard = styled(Card)`
    margin-bottom: 16px;
    .ant-legacy-form-item .ant-legacy-form-item-control-wrapper {
        width: 100%;
    }
`;

const ScFooterWrapper = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 20;
    width: 100%;
    height: 56px;
    padding: 0 24px;
    line-height: 56px;
    background: #fff;
    border-top: 1px solid #e8e8e8;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
`;

// 初始化相关表单数据
const missionForm = renderFromData(missionFormConfig);
const noticeForm = renderFromData(noticeFormConfig);
// const assessForm = renderFromData(assessPerson);

const IntelligenceCreate = ({ rxInfo }) => {
    const history = useHistory();
    const params = searchParams();
    // 获取情报专家列表 和 运营专家列表 并设置到option
    const informationExp = useExpertList(getExpertsList);
    const operaterExp = useExpertList(getOperatersList);
    const filter = (item) => item.text !== rxInfo.name;
    assessPerson[0].options = informationExp.filter(filter);
    assessPerson[1].options = operaterExp.filter(filter);
    // 定义表单相关数据和改变方法
    const [form] = Form.useForm();
    const [formType, setFormType] = useState({ threatType: 1 });
    const [missionFormData, setMissionFormData] = useState(missionForm);
    const [noticeFormData, setNoticeFormData] = useState(noticeForm);
    const [assessFormData, setAssessForm] = useState(null);
    const [threatSoftwaresFormData, setThreatSoftwares] = useState({ threatSoftwares: [] });
    const handleFormChange = (changedFields, type) => {
        switch (type) {
            case 'type':
                setFormType({
                    ...formType,
                    ...changedFields,
                });
                break;
            case 'mission':
                setMissionFormData({
                    ...missionFormData,
                    ...changedFields,
                });
                break;
            case 'notice':
                setNoticeFormData({
                    ...noticeFormData,
                    ...changedFields,
                });
                break;
            case 'assess':
                setAssessForm({
                    ...assessFormData,
                    ...changedFields,
                });
                break;
            case 'threatSoftwares':
                setThreatSoftwares({ ...changedFields });
                break;
            default:
                setMissionFormData({
                    ...missionFormData,
                    ...changedFields,
                });
        }
    };

    // 远程搜索下拉框
    const remoteSelectParam = useRemoteSelect(getVulType);
    const { remoteData, handleSearch } = remoteSelectParam;
    const options = remoteData.map((d) => <Option key={d.value}>{d.text}</Option>);

    // 子表单提交失败
    const onFinishFailed = ({ errorFields }) => {
        PubMessage('error', '请填写完整的表单信息');
        form.scrollToField(errorFields[0].name);
    };

    const jumpBack = () => {
        const { enterBy } = params;
        if (enterBy === 'intelligence') {
            history.push('/intelligence/list');
        } else if (enterBy === 'infoExpertList') {
            history.push('/intelligence/infoexpertlist');
        } else if (enterBy === 'threat') {
            history.push('/intelligence/threatlist');
        } else if (enterBy === 'operaterList') {
            history.push('/intelligence/operaterlist');
        }
    };

    return (
        <>
            <Form.Provider
                onFormFinish={(name, { values }) => {
                    createThreat(values).then((res) => {
                        if (res.code === 200) {
                            PubMessage('success', '创建成功');
                            jumpBack();
                        }
                    });
                }}
            >
                <ScItWrapper>
                    <ScCustomCard bordered={false} style={{ height: '70px' }}>
                        <Form
                            form={form}
                            layout="horizontal"
                            name="type"
                            initialValues={{
                                threatType: 1,
                            }}
                            onValuesChange={(fields) => {
                                handleFormChange(fields, 'type');
                            }}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item label="情报类型">
                                <Radio.Group defaultValue={1}>
                                    <Radio value={1} style={{ marginRight: '68px' }}>
                                        常见漏洞
                                    </Radio>
                                    <Radio value={2} style={{ marginRight: '68px' }} disabled>
                                        0day
                                    </Radio>
                                    <Radio value={3} disabled>
                                        安全事件
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </ScCustomCard>
                    <ScCustomCard title="任务管理" bordered={false}>
                        <Form
                            form={form}
                            layout="vertical"
                            name="mission"
                            onValuesChange={(fields) => {
                                handleFormChange(fields, 'mission');
                            }}
                            onFinishFailed={onFinishFailed}
                        >
                            <Row>
                                {missionFormConfig.map((item, index) => {
                                    if (item.label === '漏洞类型') {
                                        return (
                                            <Col xl={{ span: 6 }} key={item.label}>
                                                <Form.Item label={item.label} name={item.name}>
                                                    <Select
                                                        showSearch
                                                        placeholder="如：远程代码执行漏洞"
                                                        defaultActiveFirstOption={false}
                                                        value={missionFormData.vulType}
                                                        showArrow={false}
                                                        filterOption={false}
                                                        onSearch={handleSearch}
                                                        notFoundContent={null}
                                                    >
                                                        {options}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        );
                                    }
                                    if (index % 3 === 0) {
                                        return (
                                            <Col xl={{ span: 6 }} key={item.label}>
                                                <FormItem
                                                    key={item.label}
                                                    label={item.label}
                                                    name={item.name}
                                                    type={item.type}
                                                    options={item.options}
                                                    placeholder={item.placeholder}
                                                    rules={item.rules}
                                                    labelCol={item.labelCol}
                                                    wrapperCol={item.wrapperCol}
                                                />
                                            </Col>
                                        );
                                    }
                                    return (
                                        <Col xl={{ span: 6, offset: 3 }} key={item.label}>
                                            <FormItem
                                                key={item.label}
                                                label={item.label}
                                                name={item.name}
                                                type={item.type}
                                                options={item.options}
                                                placeholder={item.placeholder}
                                                rules={item.rules}
                                                labelCol={item.labelCol}
                                                wrapperCol={item.wrapperCol}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Form>
                    </ScCustomCard>
                    <ScCustomCard title="软件信息" bordered={false} name="tableForm">
                        <Form
                            layout="vertical"
                            initialValues={{
                                threatSoftwares: threatSoftwaresFormData.threatSoftwares,
                            }}
                            onFinishFailed={onFinishFailed}
                            form={form}
                            name="threatSoftwares"
                            onValuesChange={(fields) => {
                                handleFormChange(fields, 'threatSoftwares');
                            }}
                        >
                            <Form.Item name="threatSoftwares">
                                <TableForm
                                    value={threatSoftwaresFormData.threatSoftwares}
                                    onChange={() => handleFormChange({}, 'threatSoftwares')}
                                />
                            </Form.Item>
                        </Form>
                    </ScCustomCard>
                    <ScCustomCard title="公告信息" bordered={false}>
                        <Form
                            layout="horizon"
                            style={{ marginLeft: '20px' }}
                            name="notice"
                            form={form}
                            onValuesChange={(fields) => {
                                handleFormChange(fields, 'mission');
                            }}
                            onFinishFailed={onFinishFailed}
                        >
                            {noticeFormConfig.map((item) => (
                                <FormItem
                                    key={item.label}
                                    label={item.label}
                                    name={item.name}
                                    type={item.type}
                                    options={item.options}
                                    placeholder={item.placeholder}
                                    rules={item.rules}
                                    labelCol={item.labelCol}
                                    wrapperCol={item.wrapperCol}
                                />
                            ))}
                        </Form>
                    </ScCustomCard>
                    <ScCustomCard title="审核人" bordered={false}>
                        <Form
                            layout="vertical"
                            onValuesChange={(fields) => {
                                handleFormChange(fields, 'assess');
                            }}
                            name="assess"
                            form={form}
                            onFinishFailed={onFinishFailed}
                        >
                            <Row>
                                {assessPerson.map((item, index) =>
                                    index % 3 === 0 ? (
                                        <Col xl={{ span: 6 }} key={item.label}>
                                            <FormItem
                                                key={item.label}
                                                label={item.label}
                                                name={item.name}
                                                type={item.type}
                                                options={item.options}
                                                placeholder={item.placeholder}
                                                rules={item.rules}
                                                labelCol={item.labelCol}
                                                wrapperCol={item.wrapperCol}
                                            />
                                        </Col>
                                    ) : (
                                        <Col xl={{ span: 6, offset: 3 }} key={item.label}>
                                            <FormItem
                                                key={item.label}
                                                label={item.label}
                                                name={item.name}
                                                type={item.type}
                                                options={item.options}
                                                placeholder={item.placeholder}
                                                rules={item.rules}
                                                labelCol={item.labelCol}
                                                wrapperCol={item.wrapperCol}
                                            />
                                        </Col>
                                    ),
                                )}
                            </Row>
                        </Form>
                    </ScCustomCard>
                </ScItWrapper>
                <ScFooterWrapper>
                    <div style={{ float: 'right' }}>
                        <Button
                            style={{ marginRight: '8px' }}
                            onClick={() => {
                                jumpBack();
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                form.submit();
                            }}
                        >
                            提交
                        </Button>
                    </div>
                </ScFooterWrapper>
            </Form.Provider>
        </>
    );
};

const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});

const withConnect = connect(mapStateToProps, null);

IntelligenceCreate.propTypes = {
    rxInfo: PropTypes.object,
};

export default compose(withConnect, memo)(IntelligenceCreate);
