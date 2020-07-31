import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import wx from 'wx';
import { connect } from 'react-redux';
// import { Switch, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { privateRoutes } from 'routers';

// import ErrorBoundary from '@components/ErrorBoundary';
import RouteWithSubRoutes from '@components/RouteWithSubRoutes';

import Bottom from '../../containers/Index/Bottom';
import { setBottomAction } from './action';

class PrimaryLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isHidden: '',
            isNotMini: false,
        };
    }

    componentDidMount() {
        const { history } = this.props;
        if (history.location.pathname === '/signup') {
            console.log('1');
            this.setState({
                // isHidden: 'none',
                isNotMini: false,
            });
        }
        // const ua = window.navigator.userAgent.toLowerCase();
        if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) { /* eslint-disable-line */
            const self = this;
            document.addEventListener('WeixinJSBridgeReady', self.wxRead, false);
        } else {
            this.wxRead();
        }
    }

    wxRead = () => {
        // 小程序环境
        if (window.__wxjs_environment === 'miniprogram') { /* eslint-disable-line */
            this.setState({
                isNotMini: false,
            });
        } else {
            this.setState({
                isNotMini: true,
            });
        }
    };

    bottomhandleChange = (event, value) => {
        const { setBottom } = this.props;
        setBottom(value);
        const { history } = this.props;
        if (value === 0 && history.location.pathname !== '/checkin') {
            history.push('/checkin');
        } else if (value === 1 && history.location.pathname !== '/') {
            history.push('/');
        } else if (value === 2 && history.location.pathname !== '/use') {
            history.push('/use');
        }
    };

    render() {
        const { bottom } = this.props;
        const { isNotMini } = this.state;
        return (
            <Fragment>
                {/* <ErrorBoundary> */}
                <Switch>
                    {privateRoutes.map((route, index) => (
                        <RouteWithSubRoutes key={index.toString()} {...route} />
                    ))}
                    {/* <Redirect to="/signup" /> */}
                </Switch>
                {isNotMini ? (
                    <Bottom bottomValue={bottom} bottomhandleChange={this.bottomhandleChange} />
                ) : null}
                {/* </ErrorBoundary> */}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    bottom: state.setBottomReducer.bottom,
});

const mapDispatchToProps = (dispatch) => ({
    setBottom: (token) => {
        dispatch(setBottomAction(token));
    },
});

PrimaryLayout.propTypes = {
    bottom: PropTypes.number,
    setBottom: PropTypes.func,
    history: PropTypes.object,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PrimaryLayout);
