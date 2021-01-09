import React, { useState, memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Row, Table, Button, Col, Popconfirm, Tabs, Tag, Form, Input, Upload } from 'antd';
import PubModal from '@components/PubModal';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import ResourceTabs from '@containers/ProjectManager/components/ResourceTabs';
import { ScWrapper, ScTagWrapper, ScTagLeft, ScTagMiddle, ScDivider } from './styled';
import CircleDot from '../../components/CircleDot';
// import AddTaskModal from './AddTaskModal';
// import CheckTask from './CheckTask';
import { allTagdata } from './data';

// const { Option } = Select;
const { TabPane } = Tabs;
const { CheckableTag } = Tag;

const columns = [
    {
        title: '任务名称',
        dataIndex: 'taskName',
    },
    {
        title: '预计开始时间',
        dataIndex: 'scheduledStartDate',
        render: (text, record) => (
            <div>
                <span>{moment(text).format('YYYY-MM-DD') || '暂无'}</span>
                <span>{record.startSchedulePeriod}</span>
            </div>
        ),
        sorter: (a, b) =>
            moment(a.scheduledStartDate).valueOf() - moment(b.scheduledStartDate).valueOf(),
    },
    {
        title: '预计结束时间',
        dataIndex: 'scheduledEndDate',
        render: (text, record) => (
            <div>
                <span>{moment(text).format('YYYY-MM-DD') || '暂无'}</span>
                <span>{record.endSchedulePeriod}</span>
            </div>
        ),
        sorter: (a, b) =>
            moment(a.scheduledEndDate).valueOf() - moment(b.scheduledEndDate).valueOf(),
    },
    {
        title: '计划工作量',
        dataIndex: 'estimateWorkTime',
        render: (text) => (
            <div>
                <span>{text}</span>
                <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', marginLeft: '8px' }}>
                    人日
                </span>
            </div>
        ),
        sorter: (a, b) => a.estimateWorkTime - b.estimateWorkTime,
    },
    {
        title: '项目经理',
        dataIndex: 'managerName',
    },
    {
        title: '执行人',
        dataIndex: 'executorName',
    },
    {
        title: '评审人',
        dataIndex: 'reviewExpertName',
    },
    {
        title: '任务优先级',
        dataIndex: 'priority',
        filters: [
            { text: '重要且紧急', value: '重要且紧急', key: '重要且紧急' },
            { text: '不重要且紧急', value: '不重要且紧急', key: '不重要且紧急' },
            { text: '重要且不紧急', value: '重要且不紧急', key: '重要且不紧急' },
            { text: '不重要且不紧急', value: '不重要且不紧急', key: '不重要且不紧急' },
        ],
        onFilter: (text, record) => record.priority && record.priority.indexOf(text) === 0,
        render: (level) => {
            let node = null;
            switch (level) {
                case '重要且紧急':
                    node = (
                        <div>
                            <CircleDot size={8} backgroundColor="#F5222D" />
                            <span style={{ marginLeft: '8px' }}>{level}</span>
                        </div>
                    );
                    break;
                case '不重要且紧急':
                    node = (
                        <div>
                            <CircleDot size={8} backgroundColor="#2FC25B" />
                            <span style={{ marginLeft: '8px' }}>{level}</span>
                        </div>
                    );
                    break;
                case '重要且不紧急':
                    node = (
                        <div>
                            <CircleDot size={8} backgroundColor="#FAAD14" />
                            <span style={{ marginLeft: '8px' }}>{level}</span>
                        </div>
                    );
                    break;
                case '不重要且不紧急':
                    node = (
                        <div>
                            <CircleDot size={8} backgroundColor="rgba(0,0,0,0.45)" />
                            <span style={{ marginLeft: '8px' }}>{level}</span>
                        </div>
                    );
                    break;
                default:
                    node = (
                        <div>
                            {/* <CircleDot size={8} backgroundColor="rgba(0,0,0,0.45)" /> */}
                            <span style={{ marginLeft: '8px' }}>暂无填写</span>
                        </div>
                    );
                    break;
            }
            return node;
        },
    },
];

/**
 * 处理树结构的函数,返回包含name和id的对象数组
 * @param {*} data 传入树结构
 * @param {*} fatherStage 传入当前stage
 * @param {*} fatherId 传入当前父类id
 */
const pickTree = (data, stage, fatherId) => {
    let arr = [];
    data.forEach((item) => {
        if (item.stage === stage) arr.push({ name: item.name, id: item.id });
        // 如果有父类id,说明拾取子类
        if (fatherId && item.id === Number(fatherId)) {
            const childArr = pickTree(item.children, stage, fatherId);
            arr = [...childArr, ...arr];
        }
    });
    return arr;
};

const ProjectTask = () => {
    // const { rxInfo } = props;

    // 操作类型 默认新增
    // const [type] = useState('add');

    // Tag选中
    const [selectedTags, setSelectedTags] = useState([]);
    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked ? [tag.id] : selectedTags.filter((t) => t !== tag.id);
        setSelectedTags(nextSelectedTags);
    };

    // 改变tab栏
    const [tab, setTab] = useState('2');
    const changeTab = (tabIndex) => {
        setTab(tabIndex);
    };

    // 表格操作项
    const action = {
        title: '操作',
        width: 250,
        align: 'center',
        render: () => (
            <div>
                <Button
                    type="link"
                    onClick={() => {
                        // setRecord(record);
                        // setType('edit');
                        // setVisible(true);
                    }}
                    size="small"
                >
                    编辑
                </Button>
                <ScDivider type="vertical" />
                <Button
                    type="link"
                    onClick={() => {
                        // setCheckVisible(true);
                        // setCheckRecord(record);
                    }}
                    size="small"
                >
                    查看
                </Button>
                <ScDivider type="vertical" />
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        // setTaskId(record.id);
                        // setFileVisible(true);
                    }}
                >
                    上传
                </Button>
                <ScDivider type="vertical" />
                <Popconfirm
                    title="是否要删除此行？"
                    // onConfirm={() => handleDelete(record.id)}
                    okText="删除"
                    cancelText="取消"
                >
                    <Button type="link" size="small">
                        删除
                    </Button>
                </Popconfirm>
            </div>
        ),
    };

    // 查看信息模态框相关
    // const [checkRecord] = useState({});
    // const [checkVisible] = useState(false);

    // 上传资源模态框
    const [fileInfo] = useState({});

    // 计划类型树
    // 计划类型所有类型
    const [typeTree, setTypeTree] = useState([]);
    // 实施阶段所有阶段
    const [allStage] = useState(allTagdata);
    useEffect(() => {
        setTypeTree(pickTree(allTagdata, 4, tab));
    }, [tab]);

    return (
        <>
            <ResourceTabs keys="1" />
            <ScWrapper>
                <Row>
                    <Col span={24}>
                        <Tabs
                            onChange={changeTab}
                            type="card"
                            activeKey={tab}
                            tabBarExtraContent={
                                <Button
                                    type="primary"
                                    style={{ marginLeft: 'auto' }}
                                    onClick={() => {
                                        // setVisible(true);
                                    }}
                                >
                                    添加计划
                                </Button>
                            }
                        >
                            {allStage.map((item) => (
                                <TabPane tab={item.name} key={item.id} />
                            ))}
                        </Tabs>
                    </Col>
                </Row>
                <ScTagWrapper>
                    <ScTagLeft>
                        <span style={{ marginRight: 8 }}>任务类型：</span>
                    </ScTagLeft>
                    <ScTagMiddle>
                        {typeTree.map((tagObj) => (
                            <CheckableTag
                                key={tagObj.id}
                                checked={selectedTags.indexOf(tagObj.id) > -1}
                                onChange={(checked) => handleChange(tagObj, checked)}
                            >
                                {tagObj.name}
                            </CheckableTag>
                        ))}
                    </ScTagMiddle>
                </ScTagWrapper>
                <Table
                    size="small"
                    dataSource={[]}
                    columns={columns.concat(action)}
                    rowKey={(record) => record.id}
                />
            </ScWrapper>
            <PubModal title="上传资源" okText="导入" cancelText="取消">
                <Form name="filesubmit">
                    <Form.Item
                        label="文件上传"
                        name="file"
                        rules={[{ required: true, message: '请选择你要上传的文件' }]}
                    >
                        <Row>
                            <Col>
                                <Input placeholder="未选择任何文件" value={fileInfo.name} />
                            </Col>
                            <Col>
                                <Upload beforeUpload={() => false} showUploadList={false}>
                                    <Button style={{ marginLeft: '10px' }}>选择文件</Button>
                                </Upload>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </PubModal>
        </>
    );
};
// ProjectTask.propTypes = {
//     rxInfo: PropTypes.object,
//     id: PropTypes.string,
// };
// const mapStateToProps = (state) => ({
//     rxInfo: state.global.useinfo,
// });

const withConnect = connect(null, null);

export default compose(withConnect, memo)(ProjectTask);
