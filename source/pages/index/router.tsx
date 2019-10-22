import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import LayoutView from '@components/frontLayout';
import NotFoundView from '@views/notFound';
import HomeView from '@views/home';
import ExampleView from '@views/example';

// import 'antd/dist/antd.css';

function IndexRouter({ history }: IRouter) {
    return (
        <Router history={history} >
            <LayoutView>
                <Switch>
                    <Route path="/" component={HomeView} exact/>
                    <Route path="/example" component={ExampleView} />
                    <Route path="*" component={NotFoundView}/>

                    <Redirect to="/home"/>
                </Switch>
            </LayoutView>
        </Router>
    );
}

export default IndexRouter;
