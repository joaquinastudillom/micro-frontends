import React, { lazy, Suspense, useState, useEffect } from 'react';
// For simplicity accessing the history is better to use Router instead of BrowserRouter
// since there the history is created automatically
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {
    StylesProvider,
    createGenerateClassName,
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

import Header from './components/Header';
import Progress from './components/Progress';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

// We create history manually to use Router instead
const history = createBrowserHistory();

export const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header
                        isSignedIn={isSignedIn}
                        onSignOut={() => setIsSignedIn(false)}
                    />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthLazy
                                    onSignIn={() => setIsSignedIn(true)}
                                />
                            </Route>
                            <Route path='/dashboard'>
                                {!isSignedIn && <Redirect to='/' />}
                                <DashboardLazy />
                            </Route>
                            {/* Put as last because it will be matched first */}
                            <Route path='/'>
                                <MarketingLazy />
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};
