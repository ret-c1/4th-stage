import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const redirect = () => <Redirect to={{ pathname: '/login' }} />

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        path={rest.path}
        exact={rest.exact}
        render={() => (isAuthenticated === 'true' ? <Component /> : redirect())}
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated,
});

AuthRoute.propTypes = {
    component: PropTypes.elementType,
    isAuthenticated: PropTypes.string,
    location: PropTypes.object,
};

export default connect(mapStateToProps, null)(AuthRoute);
