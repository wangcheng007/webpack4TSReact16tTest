import baseService from '@services/base';

export default {
    namespace: 'base',
    state: {
        userInfo: {}
    },
    reducers: {
        getUserInfo(state: any, action: IReduxAction) {
            return { ...state, userInfo: action.payload };
        }
    },
    effects: {
        *getCurrentUser({ }, { call, put }: IReduxSagaEffects) {
            const data = yield call(baseService.getUserInfo);

            yield put({ type: 'getUserInfo', payload: data });
        }
    }
};
