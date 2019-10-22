/*
 * @desc 全屏布局文件
 */

import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { IBaseProps, IBaseState } from '@genre/base';

import utils from '@common/utils';
import config from './config';

import './index.less';

const { Header, Content } = Layout;

class LayoutView extends React.PureComponent<IBaseProps & RouteComponentProps, IBaseState> {
    state: IBaseState = {
        selectedKey: utils.getRouterByHash(window.location.hash),
        logoutLink: `//accounts.meili-inc.com/logout?redirect=${window.location.href}`,
        collapsed: false
    };

    componentDidMount () {
        this.getUserInfo();
    }

    getUserInfo = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'base/getCurrentUser'
        });
    }

    gotoOtherPage = (link: string) => (e: any) => {
        if (link !== this.state.selectedKey) {
            this.setState({
                selectedKey: link
            });

            this.props.history.push(link);
        }
    }

    render () {
        const { selectedKey } = this.state;
        const { base } = this.props;

        return (
            <Layout style={{ minHeight: '100vh' }} className="layout">
                <Header
                    className="layout-header"
                >
                    <div className="header-sider">
                        <div className="layout-header-logo">
                            么么哒
                        </div>

                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[selectedKey]}
                            style={{ lineHeight: '64px' }}
                        >
                            {
                                config.siders.map((item) => {
                                    return (
                                        <Menu.Item key={item.key} onClick={this.gotoOtherPage(item.link)}>
                                            <span>{item.title}</span>
                                        </Menu.Item>
                                    );
                                })
                            }
                        </Menu>
                    </div>

                    <div className="user-info">
                        <img src={ base.userInfo && base.userInfo.avatar }/>
                        { base.userInfo.nickName }
                    </div>
                </Header>

                <Content className="layout-content-body">{this.props.children}</Content>
            </Layout>
        );
    }
}

export default connect((state: IBaseProps) => {
    const { base } = state;
    return { base };
})(withRouter(LayoutView));
