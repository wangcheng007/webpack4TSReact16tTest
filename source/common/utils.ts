import axios from 'axios';
import notification from 'antd/lib/notification';

interface IData {
    [propName: string]: any
}

const utils = {
    getRequest(url: string, data?: IData) {
        return new Promise((resovle, reject) => {
            axios({
                method: 'get',
                url: url,
                params: data
            }).then((res) => {
                const data = res.data || {};
                if (data && data.success) {
                    resovle(data.data);
                } else {
                    notification.error({
                        message: '错误',
                        description: data.msg || '未知错误'
                    });
                    reject(false);
                }
            }).catch(err => {
                notification.error({
                    message: '错误',
                    description: err.msg || '未知错误'
                });
                reject(false);
            });
        });
    },

    postRequest(url: string, data?: IData) {
        return new Promise((resovle, reject) => {
            axios({
                method: 'post',
                url: url,
                data: data
            }).then((res) => {
                const data = res.data || {};
                if (data && data.success) {
                    resovle(data.data);
                } else {
                    notification.error({
                        message: '错误',
                        description: data.msg || '未知错误'
                    });
                    reject(false);
                }
            }).catch(err => {
                notification.error({
                    message: '错误',
                    description: err.msg || '未知错误'
                });
                reject(false);
            });
        });
    },

    getRouterByHash(hash: string) {
        return hash.replace(/\#/i, '');
    }
};

export default utils;
