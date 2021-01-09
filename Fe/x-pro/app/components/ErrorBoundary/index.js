import React from 'react';
import PropTypes from 'prop-types';

import Tips from './Tips';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            return <Tips>Something went wrong.</Tips>;
        }
        return children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node,
};
