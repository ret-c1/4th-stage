import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, Tabs, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import ScheduleList from '../../components/ScheduleList';
import {
    queryGroups,
    getNoDispatchTechnologyList,
    getDispatchTechnology,
    getOverTechnologyrList,
    getAlreadyTechnologyList,
} from '../../api';
import { ScSearch, ScSearchLeft, ScTabs } from '../../style';
const { TabPane } = Tabs;

const Schedule = (props) => {
    const [tabCardHeader, setTabCardHeader] = useState([]);
    const [isGroups, changeIsGroups] = useState(false);
    const [manager, changeManager] = useState();
    const [project, changeProject] = useState();
    const [activeKey, changeActiveKey] = useState('1');
    const [activeKeyChildren, changeActiveKeyChildren] = useState('10');
    const [tableList, setTableList] = useState({ records: [], total: 0 });
    const [params, changeParams] = useState({
        limit: 10,
        offset: 0,
        param: {},
    });
    useEffect(() => {
        queryGroups().then((res) => {
            if (res.code === 200) {
                changeIsGroups(true);
                setTabCardHeader(res.data);
            }
        });
    }, []);
    const getList = () => {
        if (activeKey === '1') {
            if (activeKeyChildren !== '10') {
                getDispatchTechnology({
                    ...params,
                    param: { ...params.param, groupId: parseInt(activeKeyChildren, 10) },
                }).then((res) => {
                    if (res.code === 200) {
                        setTableList(res.data);
                    }
                });
            } else {
                getNoDispatchTechnologyList(params).then((res) => {
                    if (res.code === 200) {
                        setTableList(res.data);
                    }
                });
            }
        }
        if (activeKey === '2') {
            getAlreadyTechnologyList(params).then((res) => {
                if (res.code === 200) {
                    setTableList(res.data);
                }
            });
        }
        if (activeKey === '3') {
            getOverTechnologyrList(params).then((res) => {
                if (res.code === 200) {
                    setTableList(res.data);
                }
            });
        }
    };
    useEffect(() => {
        getList();
    }, [activeKey, params, isGroups, activeKeyChildren]);

    const pageChange = (page, pageSize) => {
        changeParams({ ...params, offset: (page - 1) * pageSize });
    };

    const Search = (
        <ScSearch>
            <ScSearchLeft>
                <div>
                    项目名称：
                    <Input
                        style={{ width: 224 }}
                        placeholder="请输入"
                        onChange={(e) => changeProject(e.target.value)}
                    />
                </div>
                <div style={{ marginLeft: 10 }}>
                    项目经理：
                    <Input
                        style={{ width: 120 }}
                        placeholder="请输入"
                        onChange={(e) => changeManager(e.target.value)}
                    />
                </div>
            </ScSearchLeft>
            <Button
                type="primary"
                onClick={() =>
                    changeParams({
                        limit: 10,
                        offset: 0,
                        param: { ...params.param, manager, project },
                    })
                }
            >
                查询
            </Button>
        </ScSearch>
    );
    const changeTab = (keys) => {
        changeParams({
            ...params,
            param: { ...params.param, groupId: keys !== '10' ? parseInt(keys, 10) : undefined },
        });
    };
    return (
        <ScTabs
            onChange={(keys) => {
                changeParams({
                    ...params,
                    param: {},
                });
                changeActiveKey(keys);
            }}
        >
            <TabPane tab="待排期" key="1">
                <Card style={{ margin: 30 }}>
                    <Tabs
                        type="card"
                        onChange={(keys) => {
                            changeActiveKeyChildren(keys);
                            changeTab(keys);
                        }}
                    >
                        <TabPane tab="未转派" key="10">
                            {Search}
                            <ScheduleList
                                source="待排期-未转派"
                                dataSource={tableList.records || []}
                                getList={getList}
                                rxInfo={props.rxInfo}
                                pagination={{
                                    pageSize: 10,
                                    onChange: pageChange,
                                    total: tableList.total || 0,
                                    showSizeChanger: false,
                                    showTotal: () => `共 ${tableList.total} 条`,
                                }}
                            />
                        </TabPane>
                        {tabCardHeader.length > 0 &&
                            tabCardHeader.map((item1) => (
                                <TabPane tab={item1.name} key={item1.id}>
                                    {Search}
                                    <ScheduleList
                                        source={`待排期-${item1.name}`}
                                        rxInfo={props.rxInfo}
                                        dataSource={tableList.records || []}
                                        pagination={{
                                            pageSize: 10,
                                            onChange: pageChange,
                                            total: tableList.total || 0,
                                            showSizeChanger: false,
                                            showTotal: () => `共 ${tableList.total} 条`,
                                        }}
                                    />
                                </TabPane>
                            ))}
                    </Tabs>
                </Card>
            </TabPane>
            <TabPane tab="已排期" key="2">
                <Card style={{ margin: 30 }}>
                    <Tabs type="card" onChange={(keys) => changeTab(keys)}>
                        <TabPane tab="全部" key="10">
                            {Search}
                            <ScheduleList
                                source="已排期-全部"
                                dataSource={tableList.records || []}
                                pagination={{
                                    pageSize: 10,
                                    onChange: pageChange,
                                    total: tableList.total || 0,
                                    showSizeChanger: false,
                                    showTotal: () => `共 ${tableList.total} 条`,
                                }}
                            />
                        </TabPane>
                        {tabCardHeader.map((item1) => (
                            <TabPane tab={item1.name} key={item1.id}>
                                {Search}
                                <ScheduleList
                                    source={`已排期-${item1.name}`}
                                    dataSource={tableList.records || []}
                                    pagination={{
                                        pageSize: 10,
                                        onChange: pageChange,
                                        total: tableList.total || 0,
                                        showSizeChanger: false,
                                        showTotal: () => `共 ${tableList.total} 条`,
                                    }}
                                />
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </TabPane>
            <TabPane tab="已结束" key="3">
                <Card style={{ margin: 30 }}>
                    <Tabs type="card" onChange={(keys) => changeTab(keys)}>
                        <TabPane tab="全部" key="10">
                            {Search}
                            <ScheduleList
                                source="已结束-全部"
                                dataSource={tableList.records || []}
                                pagination={{
                                    pageSize: 10,
                                    onChange: pageChange,
                                    total: tableList.total || 0,
                                    showSizeChanger: false,
                                    showTotal: () => `共 ${tableList.total} 条`,
                                }}
                            />
                        </TabPane>
                        {tabCardHeader.map((item1) => (
                            <TabPane tab={item1.name} key={item1.id}>
                                {Search}
                                <ScheduleList
                                    source={`已结束-${item1.name}`}
                                    dataSource={tableList.records || []}
                                    pagination={{
                                        pageSize: 10,
                                        onChange: pageChange,
                                        total: tableList.total || 0,
                                        showSizeChanger: false,
                                        showTotal: () => `共 ${tableList.total} 条`,
                                    }}
                                />
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </TabPane>
        </ScTabs>
    );
};
Schedule.propTypes = {
    rxInfo: PropTypes.object,
};
const mapStateToProps = (state) => ({
    rxInfo: state.global.useinfo,
});
const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Schedule);
