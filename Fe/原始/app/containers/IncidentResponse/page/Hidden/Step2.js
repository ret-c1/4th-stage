import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse, Form, Radio, DatePicker, Input } from 'antd';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { ScCustomCollapse } from './styled';

const { TextArea } = Input;
const { Panel } = Collapse;

const HandleWrapper = styled.div`
    padding-bottom: '56px';
    min-height: '618px';
`;

const Step2 = () => {
    const [radio, setRadio] = useState(1);
    const onChange = (e) => {
        setRadio(e.target.value);
    };
    return (
        <HandleWrapper>
            <ScCustomCollapse
                bordered={false}
                defaultActiveKey={['handleRecord']}
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
                            处置记录
                        </span>
                    }
                    key="handleRecord"
                >
                    <div style={{ padding: '24px 32px' }}>
                        <Form.Item
                            label="处置开始时间"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 21,
                            }}
                        >
                            <DatePicker
                                onChange={onChange}
                                placeholder="开始时间"
                                style={{ width: '224px' }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="处置过程"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 21,
                            }}
                        >
                            <TextArea autoSize={{ minRows: 4 }} />
                        </Form.Item>
                        <Form.Item
                            label="事件处置结果"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 21,
                            }}
                        >
                            <Radio.Group onChange={onChange} value={radio}>
                                <Radio value={1}>成功解决</Radio>
                                <Radio value={2}>临时解决</Radio>
                                <Radio value={3}>未解决</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="可行性建议"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 21,
                            }}
                        >
                            <TextArea autoSize={{ minRows: 4 }} />
                        </Form.Item>
                        <Form.Item
                            label="实施方式"
                            labelCol={{ span: 2 }}
                            wrapperCol={{
                                span: 21,
                            }}
                        >
                            <Radio.Group onChange={onChange} value={radio}>
                                <Radio value={1}>现场</Radio>
                                <Radio value={2}>远程</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                </Panel>
            </ScCustomCollapse>
        </HandleWrapper>
    );
};

export default Step2;
