let baseUrl = '';
// const routerMode = 'history';
let DEBUG = false;
let cancleHTTP = [];
if (process.env.NODE_ENV == 'testing' || process.env.NODE_ENV == 'development') {
    baseUrl = "http://domch.cn/app-api";
    DEBUG = true;
}else if(process.env.NODE_ENV == 'production'){
    baseUrl = "http://ccss.chinaccs.cn/app-api";
    DEBUG = false;
}
export{
    baseUrl,
    routerMode,
    DEBUG,
    cancleHTTP
}
