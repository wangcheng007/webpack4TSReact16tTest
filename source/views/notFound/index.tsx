import React, { Component, ReactNode } from 'react';

interface IProps {
    children?: ReactNode;
}

interface IState {
    text?: string;
}

export default class NotFound extends Component<IProps, IState> {
    state: IState = {
        text: '对不起，你所访问的页面不存在'
    };

    render() {
        return (
            <div>
                {this.state.text}
            </div>
        );
    }
}
