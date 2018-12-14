/**
 * store模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 序列化参数

const user = {    
     
    // 个人中心
    userCenter (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Index&a=personal&key=${params.key}`);    
    },      
    // 积分
    Integral (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Integral&a=exchange&key=${params.key}&type=${params.type}&page=${params.page}&size=${params.size}`);    
    },    
    // 确认兑换
    exchange (params) {        
        return axios.get(`${base.portSRC}/app.php?m=App&c=Integral&a=exchange_add&key=${params.key}&yhq_id=${params.id}`);    
    },
    // 消息列表
    messageList (params) {        
        return axios.get(`${base.portSRC}/app.php?&m=App&c=index&a=news_list&key=${params.key}&page=${params.page}&size=${params.size}`);    
    },
    // 删除消息    
    delMessage (params) {        
        return axios.post(`${base.portSRC}/app.php?&m=App&c=index&a=news_del`, qs.stringify(params));    
    },
    //消息详情
    messageDeatail (params) {        
        return axios.get(`${base.portSRC}/app.php?&m=App&c=index&a=news_detail&key=${params.key}&id=${params.id}`);
    },
    // 修改个人资料    
    modifyInfo (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=index&a=edit`, qs.stringify(params));    
    },
    // 意见反馈    
    backFeed (params) {        
        return axios.post(`${base.portSRC}/app.php?m=App&c=Index&a=message`, qs.stringify(params));    
    },
    //签到信息
    signInfo (params) {        
        return axios.get(`${base.portSRC}/app.php?&m=App&c=index&a=sign&key=${params.key}`);    
    },
    // 登录用户相关信息   
    userInfo (params) {        
        return axios.post(`${base.portSRC}api/user/getCurrentUser`, params);    
    },
    
    //获取手机验证码
    getCode (params) {        
        return axios.post(`${base.portSRC}login/sendAuthCode`,params);    
    },
    // 登录
    login (params) {        
        return axios.post(`${base.portSRC}login/login`, params);
    },
  // 退出登录
  logout (params) {
    return axios.post(`${base.portSRC}logout`, params);
  },
  //获取工程师订单总金额 本周
  totlemoney (params) {
    return axios.post(`${base.portSRC}api/order/statEngineerOrder`, params);
  },
  //获取地址
  getaddress (params) {
    return axios.post(`${base.portSRC}api/teamArea/listEnginnerTeamArea`, params);
  },
   //获取服务
   getservice (params) {
    return axios.post(`${base.portSRC}api/prod/listAllProd`, params);
  },
  //获取工程师的评价星级
  getCommentStar (params) {
    return axios.post(`${base.portSRC}api/comment/getCommentStar`, params);
  },
  //获取工程师列表
  listEngineerOrder (params) {
    return axios.post(`${base.portSRC}api/order/pageEngineerOrder`, params);
  },
    //获取工程师列表
    async  asyncEngineerOrder (params) {
        return axios.post(`${base.portSRC}api/order/pageEngineerOrder`, params);
      },
   //跟新手机号
   updateUserMobile (params) {
    return axios.post(`${base.portSRC}api/user/updateUserMobile`, params);
  },
   //上传用户头像
   mod (params) {
    return axios.post(`${base.portSRC}api/engineer/saveAvatar`, params);
  },
  //获取图片mabo
  homeimg (params) {
    return axios.post(`${base.portSRC}api/part/selectPartContent`,params);
  },
  //获取主页列表
  homelist (params) {
    return axios.post(`${base.portSRC}api/order/listEngineerIndexOrder`,params);
  },
  //home处理中列表
  boEngineerOrder (params) {
    return axios.post(`${base.portSRC}api/order/listEngineerOrder`,params);
  },
  
}
export default user;
