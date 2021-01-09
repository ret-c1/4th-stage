import React from 'react';
import { Skeleton, List } from 'antd';

const listData = [1, 2, 3];
const LoadingIndicator = () => (
    <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={() => (
            <List.Item>
                <Skeleton loading active />
            </List.Item>
        )}
    />
);

export default LoadingIndicator;
