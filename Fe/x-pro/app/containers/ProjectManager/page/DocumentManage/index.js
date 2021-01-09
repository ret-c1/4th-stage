import React, { useState } from 'react';
// import moment from 'moment';
// import { } from 'antd';
import CommonTabs from '@components/CommonTabs';
import { searchParams } from '@utils/searchParams';
// import { useHistory } from 'react-router-dom';
import { ScContent } from '../styled';
import Document from './Document';
import LabelManage from './LabelManage';

const DocumentManagePage = () => {
    const { key = '1', id, projectName } = searchParams();
    const [currentTab, setCurrentTab] = useState();
    return (
        <>
            <CommonTabs
                keys={key || currentTab}
                onCallback={(v) => setCurrentTab(v)}
                tabList={[
                    {
                        key: '1',
                        name: '文档管理',
                        pageUrl: `/project/documentManage?id=${id}&key=1&stage=9&projectName=${projectName}`,
                    },
                    {
                        key: '2',
                        name: '标签管理',
                        pageUrl: `/project/documentManage?id=${id}&key=2&stage=9&projectName=${projectName}`,
                    },
                ]}
            />
            <ScContent>{key === '2' ? <LabelManage /> : <Document />}</ScContent>
        </>
    );
};
export default DocumentManagePage;
