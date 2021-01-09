import React, { useCallback, useState, memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Table, Form, Input, Button, DatePicker, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import { ScItWrapper } from '../styled';
import useTableParam from '../../hooks/useTableParam';
import { getEngineerCase } from '../api';

const { RangePicker } = DatePicker;

const columns = [
    {
        title: '事件关键字',
        dataIndex: 'keyword',
    },
    {
        title: '事件等级',
        dataIndex: 'level',
        filters: [
            { text: '一级', value: '一级', key: '一级' },
            { text: '二级', value: '二级', key: '二级' },
            { text: '三级', value: '三级', key: '三级' },
            { text: '四级', value: '四级', key: '四级' },
            { text: '五级', value: '五级', key: '五级' },
        ],
        onFilter: (text, record) => record.level.indexOf(text) === 0,
        render: (level) => {
            let node = null;
            switch (level) {
                case '一级':
                    node = <Tag color="green">{level}</Tag>;
                    break;
                case '二级':
                    node = <Tag color="blue">{level}</Tag>;
                    break;
                case '三级':
                    node = <Tag color="orange">{level}</Tag>;
                    break;
                case '四级':
                    node = <Tag color="red">{level}</Tag>;
                    break;
                case '五级':
                    node = <Tag color="purple">{level}</Tag>;
                    break;
                default:
                    break;
            }
            return node;
        },
    },
    {
        title: '应急人员',
        dataIndex: 'emergencyPerson',
    },
    {
        title: '发生时间',
        dataIndex: 'happenTime',
    },
];

const CasePage = () => {
    const history = useHistory();
    // 吊起查询状态，作为是否查询的依赖
    const [searchFlag, setSearchFlag] = useState(false);
    // 表单数据更改
    const [form] = Form.useForm();
    const [formdata, setFormdata] = useState({});
    const handleFormChange = (fields) => {
        // 日期单独处理
        if (fields.rangeTime) {
            setFormdata({
                ...formdata,
                startTime: fields.rangeTime[0].valueOf(),
                endTime: fields.rangeTime[1].valueOf(),
            });
        } else {
            setFormdata({
                ...formdata,
                ...fields,
            });
        }
    };

    // 获取列表数据
    const fetchSyncList = useCallback((params) => getEngineerCase(params), [searchFlag]);
    const tableParam = useTableParam(fetchSyncList, { param: formdata });
    const { dataSource, loading, pagination } = tableParam;
    const { onChange: onPageChange } = pagination;

    const action = {
        title: '操作',
        width: 200,
        align: 'center',
        render: (text, record) => (
            <>
                <Button
                    type="link"
                    onClick={() => {
                        history.push(`/incident/assess?id=${record.id}&type=check&source=engineer`);
                    }}
                >
                    查看
                </Button>
                {/* {rxRole.indexOf('项目经理') !== -1 ? ( */}
                {/* <Button */}
                {/* type="link" */}
                {/* onClick={() => { */}
                {/* history.push( */}
                {/* `/incident/engineerCase/caseAssess?id=${record.id}&type=edit`, */}
                {/* ); */}
                {/* }} */}
                {/* > */}
                {/* 编辑 */}
                {/* </Button> */}
                {/* ) : ( */}
                {/* <Button */}
                {/* type="link" */}
                {/* onClick={() => { */}
                {/* history.push(`/incident/assess?id=${record.id}&type=check`); */}
                {/* }} */}
                {/* > */}
                {/* 查看 */}
                {/* </Button> */}
                {/* )} */}
            </>
        ),
    };

    return (
        <>
            <ScItWrapper>
                <Form
                    form={form}
                    layout="inline"
                    style={{ marginBottom: '16px' }}
                    onValuesChange={(fields) => {
                        handleFormChange(fields);
                    }}
                >
                    <Form.Item label="事件关键字" name="keyword">
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="事件等级" name="level">
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="起止时间" name="rangeTime">
                        <RangePicker placeholder={['开始时间', '结束时间']} />
                    </Form.Item>
                    <Form.Item style={{ marginLeft: 'auto' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                onPageChange(1, 10);
                                setSearchFlag(!searchFlag);
                            }}
                        >
                            查询
                        </Button>
                        <Button
                            style={{ marginLeft: '8px' }}
                            onClick={() => {
                                form.resetFields();
                                setFormdata({});
                                onPageChange(1, 10);
                                setSearchFlag(!searchFlag);
                            }}
                        >
                            重置
                        </Button>
                    </Form.Item>
                </Form>
                <Table
                    dataSource={dataSource}
                    columns={columns.concat(action)}
                    pagination={pagination}
                    loading={loading}
                    rowKey={(record) => record.id}
                />
            </ScItWrapper>
        </>
    );
};
//
// CasePage.propTypes = {
//     rxRole: PropTypes.array,
// };

const mapStateToProps = (state) => ({
    rxRole: state.global.role,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(CasePage);
