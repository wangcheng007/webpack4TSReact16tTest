import { Dispatch } from 'react';

export interface IExampleProps {
    example: {
        dataSource: Array<IExampleDataSourceItem>;
    };
    dispatch: Dispatch<{type: string, data?: IRequestParams}>
}

export interface IExampleDataSourceItem {
    id: number;
    name: string;
    created: number;
    updated: number;
}

export interface IExampleColumn {
    title: string;
    dataIndex?: string;
    render?: (item?: any, record?: IExampleDataSourceItem) => React.ReactNode;
}

export interface IExampleState {

}
