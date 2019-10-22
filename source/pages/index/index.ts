/*
 * 入口文件
 */

import dva from 'dva';
import { createHashHistory } from 'history';

import ExampleModel from '@models/example';
import BaseModel from '@models/base';
import router from './router';

const app = dva({
    history: createHashHistory()
});

app.model(BaseModel);
app.model(ExampleModel);

app.router(router);

app.start('#root');
