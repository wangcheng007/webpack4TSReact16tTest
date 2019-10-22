
interface IReduxAction {
    type: string;
    [propName: string]: any;
}

interface IReduxSagaEffects {
    put: any;
    call: any;
    select: any;
}

interface IRouter {
    history: any;
}

interface IRequestParams {
    [propName: string]: any
}
