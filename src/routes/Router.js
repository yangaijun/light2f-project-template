import React, { Suspense, useMemo } from 'react';
import { Route, Switch, Redirect, Router as ReactRouter } from 'react-router-dom';
import { Spin as Loading } from 'antd';
import { useSelector } from 'react-redux';
import history from 'libs/history';
import routes from 'routes';
//不在权限控制中的路径
const defaultLoadPaths = ["/login", "/"]

const getLoadRoutes = (routes = [], paths) => {
    const loadRoutes = []
    for (let route of routes) {
        if (!route.path || paths.includes(route.path)) {
            const newRoute = { ...route }
            if (newRoute.routes) {
                newRoute.routes = getLoadRoutes(newRoute.routes, paths)
            }
            loadRoutes.push(newRoute)
        }
    }
    return loadRoutes
}

const Routes = props => { 
    return (
        <Switch>
            {props.routes?.map(({ component: Component, ...route }, index) => {
                return (
                    <Route
                        path={route.path}
                        key={index}
                        {...route}
                        render={routeProps => {
                            if (route.redirect) {
                                return <Redirect to={route.redirect} />;
                            }

                            return (
                                <Suspense fallback={<Loading />}>
                                    <Component {...route} {...routeProps} >
                                        <Routes routes={route.routes} />
                                    </Component>
                                </Suspense>
                            );
                        }}
                    />
                );
            })}
        </Switch>
    );
};

const Router = () => {
    const { userMenuPaths } = useSelector(state => state.user)
    const loadRoutes = useMemo(() => {
        if (userMenuPaths) {
            return getLoadRoutes(routes, [...defaultLoadPaths, ...userMenuPaths])
        } 
        return routes
    }, [routes, userMenuPaths])

    return <ReactRouter history={history}>
        <Routes routes={loadRoutes} />
    </ReactRouter>
}

export default React.memo(Router);