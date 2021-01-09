import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { searchParams } from '@utils/searchParams';

const ScSubmitContent = styled.div`
    background: #ffffff;
    margin: 24px;
    height: calc(100vh - 54px - 64px - 50px);
    padding-top: 129px;
`;
const ScSubmitInfo = styled.div`
    margin: 24px auto;
    padding: 20px 0;
    width: 491;
    height: 100;
    background: rgba(245, 245, 245, 0.5);
    border-radius: 2;
    font-size: 14;
`;

const SubmitSuccess = () => {
    const history = useHistory();
    const { name, page, fileNum, id } = searchParams();
    return (
        <ScSubmitContent>
            <Result
                status="success"
                title="情报提交成功"
                subTitle={'后续可通过情报列表"操作-查看"了解具体审核状态'}
                extra={[
                    <ScSubmitInfo>
                        <div>
                            <span style={{ color: 'rgba(0 ,0, 0, 0.85)' }}>漏洞名称：</span>
                            <span style={{ color: 'rgba(0 ,0, 0, 0.65)' }}>{name}</span>
                        </div>
                        <div>
                            <span style={{ color: 'rgba(0 ,0, 0, 0.85)' }}>文件特征：</span>
                            <span style={{ color: 'rgba(0 ,0, 0, 0.65)' }}>
                                {page === '0day' ? '验证工具文件' : '恶意样本文件'}
                                {fileNum}个
                            </span>
                        </div>
                    </ScSubmitInfo>,
                    <Button
                        type="primary"
                        key="console"
                        onClick={() => history.push('/intelligence/list')}
                    >
                        返回列表
                    </Button>,
                    <Button
                        key="buy"
                        onClick={() =>
                            history.push(
                                `/intelligence/list/${
                                    page === 'oday' ? '0daydetail' : 'evendetail'
                                }?stage=detail&sourceType=0&id=${id}`,
                            )
                        }
                    >
                        查看情报
                    </Button>,
                ]}
            />
        </ScSubmitContent>
    );
};
export default SubmitSuccess;
