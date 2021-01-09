import React from 'react';
import VulManage from './charts/VulManage';
import VulFlow from './charts/VulFlow';
import RiskRank from './charts/RiskRank';

import {
    ScMiddle,
    ScCMiddleUl,
    ScTitleLeft,
    ScTitleRight,
    ScChart,
    ScTopLine,
    ScBottomLine,
    ScRightTopLine,
    ScRightBottomLine,
} from './style';

const CMiddle = () => (
    <ScMiddle>
        <ScCMiddleUl>
            <li>
                <ScTitleLeft>
                    <ScTopLine />
                    <span>漏洞管理情况</span>
                    <ScBottomLine />
                </ScTitleLeft>
                <ScChart>
                    <VulManage />
                </ScChart>
            </li>
            <li style={{ zIndex: 10001 }}>
                <ScChart>
                    <VulFlow />
                </ScChart>
            </li>
            <li>
                <ScTitleRight>
                    <ScRightTopLine />
                    <span>系统风险排名</span>
                    <ScRightBottomLine />
                </ScTitleRight>
                <RiskRank />
            </li>
        </ScCMiddleUl>
    </ScMiddle>
);

export default CMiddle;
