/*
 * @desc 例子
 */

import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import { IExampleProps, IExampleState, IExampleColumn, IExampleDataSourceItem } from '@genre/example';
import './index.less';

class Example extends React.PureComponent<IExampleProps, IExampleState> {
    private columns = this.getColumnsData();

    componentDidMount() {
        this.init();
    }

    init = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'example/getDataSource'
        });
    }

    addExampleData = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'example/addExampleData',
            data: {
                name: `${(+new Date())}`
            }
        });
    }

    delExampleData = (record: IExampleDataSourceItem | undefined) => (e: any) => {
        const { dispatch } = this.props;

        dispatch({
            type: 'example/delExampleData',
            data: {
                id: record && record.id
            }
        });
    }

    getColumnsData(): Array<IExampleColumn> {
        return [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: 'name',
                dataIndex: 'name'
            },
            {
                title: 'created',
                dataIndex: 'created'
            },
            {
                title: 'updated',
                dataIndex: 'updated'
            },
            {
                title: '操作',
                render: (item, record) => {
                    return <Button onClick={this.delExampleData(record)}>删除</Button>;
                }
            }
        ];
    }

    render () {
        const { dataSource = [] } = this.props.example;

        return (
            <div className="example-page">
                <Button onClick={this.addExampleData}>新增一条</Button>

                <Table
                    className="example-page-table"
                    rowKey={'id'}
                    columns={this.columns}
                    dataSource={dataSource}
                />
            </div>
        );
    }
}

export default connect((state: IExampleProps) => {
    const { example } = state;
    return { example };
})(Example);
