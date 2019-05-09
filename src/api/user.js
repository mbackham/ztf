/**
 * store模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 序列化参数

const user = {    
     

    // 微信授权登陆   
    oauthLogin (params) {        
        return axios.post(`${base.portSRC}login/oauthLogin`, params);    
    },
    
    
    //幻灯片
    selectPartContent (params) {        
        return axios.post(`${base.portSRC}api/part/selectPartContent`,params);    
    },
    // 我的订单
    pageMemOrder (params) {        
        return axios.post(`${base.portSRC}api/order/pageMemOrder`, params);
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
  //系统配置
  getSmConf (params) {
    return axios.post(`${base.portSRC}api/conf/getSmConf`,params);
  },

}
export default user;
