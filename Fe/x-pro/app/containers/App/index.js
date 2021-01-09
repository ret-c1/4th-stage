import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import Main from '@layouts/Main';
import { publicRoutes } from '@routers';

const App = (props) => {
    const { rxroutes } = props;
    return (
        <>
            <Switch>
                {publicRoutes.map((route) => (
                    <Route
                        key={`public-route-${route.path}`}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
                <Main>
                    {rxroutes.map((route) => (
                        <Route
                            key={`auth-route-${route.path}`}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    ))}
                </Main>
            </Switch>
        </>
    );
};

App.propTypes = {
    rxroutes: PropTypes.array,
};

const mapStateToProps = (state) => ({
    rxroutes: state.global.routes,
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(App);
