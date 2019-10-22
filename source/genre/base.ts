import { Dispatch, ReactNode } from 'react';

export interface IUserInfo {
    avatar: string;
    nickName: string;
    workId: string;
}

export interface IBaseProps {
    children?: ReactNode;
    base: {
        userInfo: IUserInfo;
    };
    dispatch: Dispatch<{type: string, data?: IRequestParams}>
}

export interface IBaseState {
    selectedKey: string;
    logoutLink: string;
    collapsed: boolean;
}
