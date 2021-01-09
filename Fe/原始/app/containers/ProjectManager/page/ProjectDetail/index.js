import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { searchParams } from '@utils/searchParams';
import { Card, PageHeader, Descriptions, Row, Col } from 'antd';
import { renderlist } from './config';
import { getItemDetail } from '../api';
import { ScContent } from '../styled';
import { returnProStatus } from '../utils';

const { Meta } = Card;

const ProjectPageDetail = () => {
    const history = useHistory();
    const { id } = searchParams();
    const [data, setData] = useState({});
    const [configlist, setConfiglist] = useState([]);
    useEffect(() => {
        getItemDetail({ id }).then((res) => {
            if (res.code === 200) {
                setData(res.data);
                // setTotal(res.data.total);
                setConfiglist(renderlist(res.data));
            } else {
                console.log('获取数据失败');
            }
        });
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
                        <Link to={`/project/projectInfo?id=${id}`}>更多</Link>
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <Row gutter={8} justify="space-around">
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
export default ProjectPageDetail;
