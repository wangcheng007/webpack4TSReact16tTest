
interface ISider {
    key: string,
    title: string;
    link: string;
}

interface IConfig {
    siders: Array<ISider>
}

const config: IConfig = {
    siders: [
        {
            key: '/',
            title: '首页',
            link: '/'
        },
        {
            key: '/example',
            title: '例子',
            link: '/example'
        },
        {
            key: '/gogog3',
            title: '配置页面3',
            link: '/gogog3'
        },
        {
            key: '/gogog4',
            title: '配置页面4',
            link: '/gogog4'
        }
    ]
};

export default config;
