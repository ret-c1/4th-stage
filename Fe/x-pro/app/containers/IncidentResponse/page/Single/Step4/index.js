import React from 'react';
// import PropTypes from 'prop-types';
import { Result, Button, Steps } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { steps } from '../config';
import { ScStepWrapper, ScEmergencySteps } from '../styled';

const { Step } = Steps;

const ScRWrapper = styled.div`
    margin: 21px 24px 16px 24px;
    background: #fff;
    height: 100%;
    min-height: 550px;
    box-sizing: border-box;
    padding-top: 96px;
`;

const SingleStep4Page = () => {
    const history = useHistory();
    return (
        <>
            <ScStepWrapper>
                <ScEmergencySteps current={3} style={{ width: '70%', margin: '20px auto' }}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </ScEmergencySteps>
            </ScStepWrapper>
            <ScRWrapper>
                <Result
                    status="success"
                    title="创建成功"
                    extra={[
                        <Button
                            key="continue"
                            onClick={() => {
                                history.push('/incident/single/step1');
                            }}
                        >
                            继续创建
                        </Button>,
                    ]}
                />
            </ScRWrapper>
        </>
    );
};

// SingleStep4Page.propTypes = {
//     id: PropTypes.string,
//     reportId: PropTypes.number,
// };

export default SingleStep4Page;
