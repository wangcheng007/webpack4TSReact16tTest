import exampleService from '@services/example';

export default {
    namespace: 'example',
    state: {
        dataSource: []
    },
    reducers: {
        getList(state: any, action: IReduxAction) {
            return { ...state, dataSource: action.payload };
        },

        addExample(state: any, action: IReduxAction) {
            const dataSource = [].concat(state.dataSource, action.payload);
            return { ...state, dataSource };
        },

        delExample(state: any, action: IReduxAction) {
            if (action.payload.isDelete) {
                const dataSource = state.dataSource.filter((v: any) => {
                    return v.id !== action.payload.id;
                });
                return { ...state, dataSource };
            }
            return { ...state };
        }
    },
    effects: {
        *getDataSource({ }, { call, put }: IReduxSagaEffects) {
            const data = yield call(exampleService.getDataSource);

            console.log(data);

            yield put({ type: 'getList', payload: data });
        },

        *addExampleData(params: IReduxAction, { call, put }: IReduxSagaEffects) {
            const data = yield call(exampleService.addExampleData, params);

            yield put({ type: 'addExample', payload: data });
        },

        *delExampleData(params: IReduxAction, { call, put }: IReduxSagaEffects) {
            const data = yield call(exampleService.delExampleData, params);

            const payload = {
                isDelete: !!data,
                id: params.data.id
            };

            yield put({ type: 'delExample', payload: payload });
        }
    }
};
