import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { gloabconfig } from '@containers/config';
import eg001 from '../assets/e.g-001.png';
import eg002 from '../assets/e.g-002.png';
import eg003 from '../assets/e.g-003.png';

const { Meta } = Card;
const { Title } = Typography;

const imgHrefCom = gloabconfig.redirecturl;
const ImgDetail = [
    {
        name: '2019某市全球级运动会',
        href: `${imgHrefCom}#/safeServicepub`,
        description:
            '赋予服务业务大数据采集/处理/应用能力，打破服务数据间孤岛，实现跨系统追踪定位问题；实时监控业务安全表现，全渠道业务监控管理，完善数字化KPI；实现业务运维和安全管理双向驱动。',
        key: 'AssetTrace',
        img: eg001,
    },
    {
        name: '样例：业务安全服务运营',
        href: `${imgHrefCom}#/business`,
        description:
            '赋予服务业务大数据采集/处理/应用能力，打破服务数据间孤岛，实现跨系统追踪定位问题；实时监控业务安全表现，全渠道业务监控管理，完善数字化KPI；实现业务运维和安全管理双向驱动。',
        key: 'AssetTrace',
        img: eg002,
    },
    {
        name: '样例：安全运维监控服务',
        href: `${imgHrefCom}#/safetyOperation`,
        description:
            '全网各类网络设备、安全设备、主机、数据库、应用系统等实时、细粒度的运行监控，及时发现网络中的可用性故障，并进行故障定位和告警响应，确保重要业务信息系统的可用性和业务连续性。形象地展示出用户的网络拓扑，并动态展示拓扑节点的运行状态，还能够根据用户管理的组织和部门结构在地图上展示出设备或者设备组的地理位置，与业务安全服务运营联动以便实施应急响应。',
        key: 'AssetTraceMonitor',
        img: eg003,
    },
];

const linkto = (href) => {
    window.open(href);
};

const Demonstrate = () => (
    <>
        <Card style={{ margin: 30 }}>
            <Title level={3}>可视化展示样例</Title>
            <Row gutter={8} justify="start">
                {ImgDetail.map((item) => (
                    <Col
                        span={6}
                        key={item.href}
                        onClick={() => {
                            linkto(item.href);
                        }}
                    >
                        <Card
                            hoverable
                            style={{ width: 250, height: 350, overflow: 'hidden' }}
                            cover={<img alt={item.description} src={item.img} />}
                        >
                            <Meta title={item.name} description={item.description} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Card>
    </>
);
export default Demonstrate;
