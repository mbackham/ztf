/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';

//import { Toast } from 'vant';
//import store from '../store/index'

import  {Indicator} from 'mint-ui'
import { Toast } from 'mint-ui'


/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
  //  console.log(status)
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            // toLogin();
            router.replace({
                path: '/login'
            })
            localStorage.clear()
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            Toast('登录过期，请重新登录');
            localStorage.clear()
            localStorage.removeItem('token');
          //  store.commit('loginSuccess', null);
            router.replace({
                path: '/login'
            })
            // setTimeout(() => {
             

            // }, 1000);
            break;
        // 404请求不存在
        case 404:
            Toast('请求的资源不存在'); 
            break;
        default:
            console.log(other);   
        }}



        //成功拦截
        const errorHandlesuccess = (config) => {
            // 状态码判断
            //console.log(config)
            switch (config.data.code) {
                // 401: 未登录状态，跳转登录页
                case 401:
                    // toLogin();
                    Toast(config.message);
                    router.replace({
                        path: '/login'
                    })
                    localStorage.clear()
                    break;
                // 403 token过期
                // 清除token并跳转登录页
                case 403:
                    Toast('登录过期，请重新登录');
                    localStorage.removeItem('token');
                    localStorage.clear()
                  //  store.commit('loginSuccess', null);
                    router.replace({
                        path: '/login'
                    })
                    break;
                // 404请求不存在
                case 404:
                    Toast('请求的资源不存在'); 
                    break;
               
        }}
//请求队列
var queueres={};
//去除url
function distroy ( url ) {
    delete queueres[url];
    if(!Object.keys(queueres).length){
       
      //  Indicator.close()
        
    }
   
}
// 创建axios实例
var instance = axios.create({    timeout: 1000 * 12});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(    
    config => {    
        //添加全局loading
        if(!Object.keys(queueres).length){
           // Indicator.open()
        }
       
        queueres[config.url]=true;    
       
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
       // const token = store.state.token;  
       const tokenhttp = localStorage.getItem('token')
        
       tokenhttp && (config.headers.token = tokenhttp);        
        return config;    
    },    
    error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(    
    // 请求成功
    res => {
       // alert(1)
        errorHandlesuccess(res)
        if(res.status === 200){
          
            distroy ( res.request.responseURL)
           return Promise.resolve(res.data)
        }else{
            console.log('sji')
            distroy ( res.request.responseURL )
            return   Promise.reject(res.data)
        }
        
    },    
    // 请求失败
    error => {
        const { response } = error;
        console.log('shiai')
        console.log(response )
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            console.log(response)
            distroy ( response.config.url )

            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
          ///  store.commit('UPDATE_isNetwork', false);
        }
    });

export default instance;