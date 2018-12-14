/**
 * order模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例


const order = {    
    //强单列表
    getOrderDetail (params) {        
        return axios.post(`${base.portSRC}api/order/getOrderDetail`, params);    
    },
    //强单列表
    getOrderServiceDetail (params) {        
        return axios.post(`${base.portSRC}api/order/getOrderServiceDetail`, params);    
    },
    //抢单
   
    robOrder (params) {        
        return axios.post(`${base.portSRC}api/order/robOrder`, params);    
    },

    
    //订单历程
    listOrderCourse (params) {        
        return axios.post(`${base.portSRC}api/order/listOrderCourse`, params);    
    },
    //施工完成
    finishService (params) {        
        return axios.post(`${base.portSRC}api/order/finishService`, params);    
    },
     //退单
     applyOrderBack (params) {        
        return axios.post(`${base.portSRC}api/order/applyOrderBack`, params);    
    },
    //转为失联
    turnOrderLost (params) {        
        return axios.post(`${base.portSRC}api/order/turnOrderLost`, params);    
    },
    //转为争议
    turnOrderDispute (params) {        
        return axios.post(`${base.portSRC}api/order/turnOrderDispute`, params);    
    },
    //服务方案详情
    
    getOrderServiceDetail(params) {        
        return axios.post(`${base.portSRC}api/order/getOrderServiceDetail`, params);    
    },
   
  //订单完工资料补齐
    finishOrder(params) {        
        return axios.post(`${base.portSRC}api/order/finishOrder`, params);    
    },
    
//获取产品/服务列表(带产品/服务类别)
 //服务方案变更  /api/prod/listProdCate
    listProdCateProd(params) {        
        return axios.post(`${base.portSRC}api/prod/listProdCateProd`, params);    
    },
   
    //修改预约时间
    modSubscribeTime(params) {        
        return axios.post(`${base.portSRC}api/order/modSubscribeTime`, params);    
    },
    //更改方案
    changeOrderService(params) {        
        return axios.post(`${base.portSRC}api/order/changeOrderService`, params);    
    },
    //获取方案详情
    getProdDetail(params) {        
        return axios.post(`${base.portSRC}api/prod/getProdDetail`, params);    
    },
    //已完成
    // finshe(params) {        
    //     return axios.post(`${base.portSRC}api/order/changeOrderService`, params);    
    // },
  
}

export default order;
