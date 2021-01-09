import React from 'react';
import { Card, Result, Button } from 'antd';
import { ScItWrapper } from './styled';

const EngineerSuccess = () => (
    <ScItWrapper>
        <Card title="处置记录">
            <div style={{ padding: '24px 32px', width: '80%', margin: '0 auto' }}>
                <Result
                    status="success"
                    title="提交成功"
                    extra={[
                        <Button key="buy">查看处置记录</Button>,
                        <Button type="primary" key="console">
                            继续处置
                        </Button>,
                    ]}
                />
            </div>
        </Card>
    </ScItWrapper>
);

export default EngineerSuccess;
