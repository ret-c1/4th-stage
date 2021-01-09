import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '@layouts/Main';

import AuthRoute from '@layouts/AuthRoute';
import { flattenConsoleRoutes, publicRoutes } from '@routers/console';
import { flattenDataRoutes } from '@routers/data';

const App = () => (
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
                {flattenDataRoutes.map((route) => (
                    <AuthRoute
                        key={`auth-route-${route.path}`}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
                {flattenConsoleRoutes.map((route) => (
                    <AuthRoute
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

export default App;
