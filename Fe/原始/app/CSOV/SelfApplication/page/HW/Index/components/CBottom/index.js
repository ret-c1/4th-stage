import React from 'react';
import {
    ScBottom,
    ScCBottomUl,
    ScTitleLeft,
    ScChart,
    ScTitleRight,
    ScTopLine,
    ScBottomLine,
    ScRightTopLine,
    ScRightBottomLine,
} from './style';
import VulHandle from './charts/VulHandle';
import VulConfirm from './charts/VulConfirm';
import VulFinish from './charts/VulFinish';

const CBottom = () => (
    <ScBottom>
        <ScCBottomUl>
            <li>
                <ScTitleLeft>
                    <ScTopLine />
                    <span>漏洞处置情况</span>
                    <ScBottomLine />
                </ScTitleLeft>
                <ScChart>
                    <VulHandle />
                </ScChart>
            </li>
            <li>
                <ScTitleLeft>
                    <ScTopLine />
                    <span>漏洞验证情况</span>
                    <ScBottomLine />
                </ScTitleLeft>
                <ScChart>
                    <VulConfirm />
                </ScChart>
            </li>
            <li>
                <ScTitleRight>
                    <ScRightTopLine />
                    <span>漏洞完成情况排名</span>
                    <ScRightBottomLine />
                </ScTitleRight>
                <ScChart>
                    <VulFinish />
                </ScChart>
            </li>
        </ScCBottomUl>
    </ScBottom>
);

export default CBottom;
