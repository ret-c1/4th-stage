import React, { useState } from 'react';
import { Steps, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { ScContent, ScSteps } from '../styled';

const { Step } = Steps;

const steps = [
    {
        title: '项目信息',
        content: 'First-content',
    },
    {
        title: '资产信息',
        content: 'Second-content',
    },
    {
        title: '工作计划',
        content: 'Last-content',
    },
];

const AddNewProject = () => {
    const [current, setCurrent] = useState(0);
    const history = useHistory();
    const next = () => {
        const currentAdd = current + 1;
        setCurrent(currentAdd);
    };
    const prev = () => {
        const currentAdd = current - 1;
        setCurrent(currentAdd);
    };
    let stepComponent;
    switch (current) {
        case 0:
            stepComponent = (
                <Step1
                    prev={() => {
                        setCurrent(current + 1);
                    }}
                />
            );
            break;
        case 1:
            stepComponent = <Step2 />;
            break;
        case 2:
            stepComponent = <Step3 />;
            break;
        default:
            stepComponent = <Step1 />;
            break;
    }
    return (
        <ScContent>
            <ScSteps>
                <Steps current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
            </ScSteps>
            {stepComponent}
            <div>
                {current === 1 && (
                    <Row justify="space-between">
                        <Col>
                            <Button type="primary" onClick={prev}>
                                上一步
                            </Button>
                        </Col>
                        <Col>
                            <Button type="primary" onClick={next}>
                                继续录入工作计划
                            </Button>
                        </Col>
                    </Row>
                )}
                {current === 2 && (
                    <Row justify="space-between">
                        <Col>
                            <Button type="primary" onClick={prev}>
                                上一步
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type="primary"
                                onClick={() => {
                                    history.push(`/project/list`);
                                }}
                            >
                                创建项目
                            </Button>
                        </Col>
                    </Row>
                )}
            </div>
        </ScContent>
    );
};
export default AddNewProject;
