
export default {
    getUserInfo() {
        return new Promise((resolve) => {
            resolve({
                avatar: 'https://s3.mogucdn.com/mlcdn/c024f5/190524_4g7igag7b61278828354f7l1i76bh_1200x1200.jpg',
                nickName: '蓝鲸',
                workId: '03493'
            });
        });
    }
};
