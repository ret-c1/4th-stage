/**
 * app.js
 *
 */
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import configureStore from '@reduxs/configureStore';
import history from '@utils/history';
import App from 'containers/App';
import { GlobalStyle } from '@assets/global-styles';

const initialState = {};
const store = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('app');
const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ConfigProvider locale={zhCN}>
                    <App />
                </ConfigProvider>
                <GlobalStyle />
            </ConnectedRouter>
        </Provider>,
        MOUNT_NODE,
    );
};
render();
