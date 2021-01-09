import React, { useState } from 'react';
import { Steps, Button } from 'antd';
import { ScStepWrapper, ScSteps, ScItWrapper, ScFooterWrapper } from './styled';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const { Step } = Steps;

const steps = [
    {
        title: '排查',
    },
    {
        title: '处置',
    },
    {
        title: '处置完成',
    },
];

const HiddenPage = () => {
    // 进度条控制
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent((prevCurrent) => prevCurrent + 1);
    };

    const prev = () => {
        setCurrent((prevCurrent) => prevCurrent - 1);
    };
    let stepComponent;
    switch (current) {
        case 0:
            stepComponent = <Step1 />;
            break;
        case 1:
            stepComponent = <Step2 />;
            break;
        default:
            stepComponent = <Step3 prev={prev} />;
            break;
    }

    return (
        <div>
            <ScStepWrapper>
                <ScSteps current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </ScSteps>
            </ScStepWrapper>
            <ScItWrapper>
                <div className="steps-content">{stepComponent}</div>
            </ScItWrapper>
            {current !== steps.length - 1 && (
                <ScFooterWrapper>
                    <div className="steps-action" style={{ float: 'right' }}>
                        {current >= 0 && <Button onClick={() => prev()}>取消</Button>}
                        {current < steps.length - 1 && current > 0 && (
                            <Button onClick={() => prev()} style={{ marginLeft: 8 }}>
                                保存并返回上一步
                            </Button>
                        )}
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()} style={{ marginLeft: 8 }}>
                                下一步
                            </Button>
                        )}
                    </div>
                </ScFooterWrapper>
            )}
        </div>
    );
};

export default HiddenPage;
