import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, PageHeader, Descriptions, Row, Col } from 'antd';
import { renderlist } from './config';
import { ScContent } from '../styled';
import { returnProStatus } from '../utils';

const { Meta } = Card;

const ProjectPageDetail = () => {
    const history = useHistory();
    const [data] = useState({
        ahMasterServiceProvider: 0,
        businessAttention: '',
        clientName: '风险评估',
        contractStatus: '',
        deleteFlag: false,
        doubt: 0,
        highVulnerability: 0,
        id: 568,
        invalid: 0,
        lowVulnerability: 0,
        middleVulnerability: 0,
        miss: 0,
        planName: '已关闭',
        plans: [],
        projectName: '风险评估',
        serviceEndTime: '2020-08-30',
        serviceStartTime: '2020-08-09',
        status: 4,
        technicalAttention: '',
        users: [
            {
                id: 15,
                name: '安全工程师',
                img: '',
            },
        ],
        valid: 0,
    });
    const [configlist, setConfiglist] = useState([]);
    useEffect(() => {
        setConfiglist(renderlist(data));
    }, []);

    return (
        <ScContent>
            <PageHeader className="site-page-header" title={data.projectName}>
                <Descriptions size="small" column={2}>
                    <Descriptions.Item label="客户名称" key="客户名称">
                        {data.clientName}
                    </Descriptions.Item>
                    <Descriptions.Item label="合同编号" key="合同编号">
                        {data.contractNo}
                    </Descriptions.Item>
                    <Descriptions.Item label="当前阶段" key="当前阶段">
                        {returnProStatus(data.status)}
                    </Descriptions.Item>
                    <Descriptions.Item label="合同状态" key="合同状态">
                        {data.contractStatus}
                    </Descriptions.Item>
                    <Descriptions.Item key="更多">
                        <Link to="/project/projectInfo?id=1&stage=edit">更多</Link>
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <Row gutter={8} justify="flex-start">
                {configlist.map((item) => (
                    <Col span={6} style={{ marginBottom: 40 }} key={item.title}>
                        <Card
                            hoverable
                            style={{ cursor: 'pointer' }}
                            cover={
                                <>
                                    <img
                                        alt="example"
                                        src={item.background}
                                        style={{ objectFit: 'cover', height: '180px' }}
                                    />
                                    <img
                                        alt="example"
                                        src={item.icon}
                                        style={{
                                            width: '68px',
                                            height: '65px',
                                            position: 'absolute',
                                            left: '50%',
                                            top: '40%',
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    />
                                </>
                            }
                            onClick={() => {
                                history.push(item.href);
                            }}
                        >
                            <Meta title={item.title} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </ScContent>
    );
};

// ProjectPageDetail.propTypes = {
//     rxRole: PropTypes.array,
//     rxInfo: PropTypes.object,
// };

// const mapStateToProps = (state) => ({
//     rxRole: state.global.role,
//     // rxInfo: state.global.useinfo,
// });
const withConnect = connect(null, null);

export default compose(withConnect)(ProjectPageDetail);
