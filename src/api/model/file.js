/**
 * store模块接口列表
 */

import base from '@/api/base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例


const file = {    
   
    // 删除购物车  
    uploadimg  (params) {        
        return axios.post(`${base.portSRCFile}file/upload`,params);    
    },
    
}

export default file;
