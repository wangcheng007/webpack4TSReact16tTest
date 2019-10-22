export default {
    getDataSource() {
        return new Promise((resolve, reject) => {
            const dataSource = [{
                id: 1,
                name: 'data1',
                created: 'data2',
                updated: 'data3'
            }];

            resolve(
                dataSource
            );
        });
    },

    addExampleData(params: IRequestParams) {
        return new Promise((resolve, reject) => {
            const data = {
                id: ((+ new Date()) / 10) | 0,
                name: 'data1',
                created: 'data2',
                updated: 'data3'
            };

            resolve(
                data
            );
        });
    },

    delExampleData(params: IRequestParams) {
        return new Promise((resolve, reject) => {
            resolve({
                params
            });
        });
    }
};
