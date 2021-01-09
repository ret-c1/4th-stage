import React, { useState } from 'react';
import { Collapse, Card, Form, Input, Radio } from 'antd';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { ScCustomCollapse } from './styled';
import EmergencyCheckLists from '../../components/EmergencyCheckLists';

const { Panel } = Collapse;
const { TextArea } = Input;

const Step1 = () => {
    const [radio, setRadio] = useState(1);
    const onChange = (e) => {
        setRadio(e.target.value);
    };
    return (
        <div style={{ paddingBottom: '56px' }}>
            <ScCustomCollapse
                bordered={false}
                defaultActiveKey={['assessProgress']}
                expandIconPosition="right"
                expandIcon={({ isActive }) =>
                    isActive ? (
                        <ShrinkOutlined style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }} />
                    ) : (
                        <ArrowsAltOutlined
                            style={{ color: 'rgba(0,0,0,0.45)', fontSize: '20px' }}
                        />
                    )
                }
            >
                <Panel
                    header={
                        <span
                            style={{
                                fontSize: '16px',
                                color: 'rgba(0,0,0,0.85)',
                                lineHeight: '24px',
                                fontWeight: 500,
                            }}
                        >
                            排查记录
                        </span>
                    }
                    key="assessProgress"
                >
                    <EmergencyCheckLists checkLists={[{ children: [] }]} />
                </Panel>
            </ScCustomCollapse>
            <Card title="排查结果">
                <Form.Item
                    label="结论"
                    labelCol={{ span: 2 }}
                    wrapperCol={{
                        span: 22,
                    }}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="安全加固建议"
                    labelCol={{ span: 2 }}
                    wrapperCol={{
                        span: 22,
                    }}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="实施方式"
                    labelCol={{ span: 2 }}
                    wrapperCol={{
                        span: 22,
                    }}
                >
                    <Radio.Group onChange={onChange} value={radio}>
                        <Radio value={1}>现场</Radio>
                        <Radio value={2}>远程</Radio>
                    </Radio.Group>
                </Form.Item>
            </Card>
        </div>
    );
};

export default Step1;
