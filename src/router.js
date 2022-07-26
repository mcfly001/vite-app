import React from 'react';
import { Button } from 'antd';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Home from './component/home';
import About from './component/about';

export default ({ history }) => {
    const goAbout = () => {
        history.push('/about');
    };

    const goHome = () => {
        history.push('/home');
    };

    return (
        <>
            这里修改会更新
            <Button type="ghost" onClick={goHome} style={{ marginTop: 20, marginBottom: 20 }}>
                home
            </Button>
            <Button type="primary" onClick={goAbout} style={{ marginTop: 20, marginBottom: 20 }}>
                about
            </Button>
            <Router history={history}>
                <Switch>
                    <Redirect exact={true} from="/" to="/home" />
                    <Route exact={true} path="/home" component={Home} />
                    <Route exact={true} path="/about" component={About} />
                </Switch>
            </Router>
        </>
    );
};
