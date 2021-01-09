import React from 'react';
import { Result, Button } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ScRWrapper = styled.div`
    margin: 21px 24px 16px 24px;
    background: #fff;
    height: 100%;
    min-height: 550px;
    box-sizing: border-box;
    padding-top: 96px;
`;

const Step3 = () => {
    const history = useHistory();
    return (
        <ScRWrapper>
            <Result
                status="success"
                title="提交成功"
                extra={[
                    <Button
                        type="primary"
                        key="continue"
                        onClick={() => {
                            history.push('/incident/handleCheck');
                        }}
                    >
                        查看处置记录
                    </Button>,
                    <Button
                        key="buy"
                        onClick={() => {
                            history.push('/incident/event');
                        }}
                    >
                        继续处置
                    </Button>,
                ]}
            />
        </ScRWrapper>
    );
};

export default Step3;
