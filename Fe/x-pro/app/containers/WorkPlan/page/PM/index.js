import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
// import moment from 'moment';
import { Button, Col, Divider, Form, Input, Row, Tag, Pagination, Checkbox } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { searchParams } from '@utils/searchParams';
// import { ScCard } from '../../styled';
// import { getDaliyList, getDaliyStatistic, deleteDaliy } from './api';
import PlanList from '../../componments/PlanList';

const { CheckableTag } = Tag;
const tagsData = ['全部', '待认领', '待完成', '已完成'];
// 项目进来的路由要拼source=project
const PMPage = () => {
    console.log('项目经理 - 工作计划');
    const { source } = searchParams();
    const history = useHistory();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);
    const [selectedTags, setSelectedTags] = useState(['全部']);
    const plainOptions = ['Apple', 'Pear', 'Orange'];

    const getFields = () => {
        const count = expand ? 5 : 2;
        const children = [
            <Col span={8} key="任务类型">
                <Form.Item name="任务类型" label="任务类型">
                    <Input placeholder="请输入" />
                </Form.Item>
            </Col>,
            <Col span={8} key="任务编号">
                <Form.Item name="任务编号" label="任务编号">
                    <Input placeholder="请输入" />
                </Form.Item>
            </Col>,
            <Col span={8} key="计划状态">
                <Form.Item name="计划状态" label="计划状态">
                    <Checkbox.Group options={plainOptions} defaultValue={['Apple']} />
                </Form.Item>
            </Col>,
            <Col span={8} key="预计起止时间">
                <Form.Item name="预计起止时间" label="预计起止时间">
                    <Input placeholder="请输入" />
                </Form.Item>
            </Col>,
            <Col span={8} key="执行人">
                <Form.Item name="执行人" label="执行人">
                    <Input placeholder="请输入" />
                </Form.Item>
            </Col>,
        ];
        return children.slice(0, count);
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked
            ? [...selectedTags, tag]
            : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };
    return (
        <>
            {!source && (
                <>
                    <Row>
                        <Col span={22}>
                            <span style={{ marginRight: 8 }}>计划类型:</span>
                            {tagsData.map((tag) => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags.indexOf(tag) > -1}
                                    onChange={(checked) => handleChange(tag, checked)}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Col>
                        <Col span={2}>
                            <Button type="primary">新建任务</Button>
                        </Col>
                    </Row>
                    <Divider />
                </>
            )}
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    {getFields()}
                    <Col span={8} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            重置
                        </Button>
                        <Button
                            type="link"
                            style={{ fontSize: 12 }}
                            onClick={() => {
                                setExpand(!expand);
                            }}
                        >
                            {expand ? '收起' : '展开'}
                            {expand ? <UpOutlined /> : <DownOutlined />}
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Button type="primary" onClick={() => history.push('/workplan/create')}>
                新增计划
            </Button>
            <PlanList />
            <div style={{ textAlign: 'right' }}>
                <Pagination
                    showSizeChanger
                    // onShowSizeChange={onShowSizeChange}
                    defaultCurrent={3}
                    total={500}
                />
            </div>
        </>
    );
};

// PMPage.propTypes = {
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

export default compose(withConnect, memo)(PMPage);
