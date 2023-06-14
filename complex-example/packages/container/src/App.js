import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
    StylesProvider,
    createGenerateClassName,
} from '@material-ui/core/styles';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

import Header from './components/Header';
import Progress from './components/Progress';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

export const App = () => (
    <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
            <div>
                <Header />
                <Suspense fallback={<Progress />}>
                    <Switch>
                        <Route path='/auth' component={AuthLazy} />
                        <Route path='/' component={MarketingLazy} />
                    </Switch>
                </Suspense>
            </div>
        </StylesProvider>
    </BrowserRouter>
);
