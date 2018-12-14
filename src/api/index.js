/** 
 * api接口的统一出口
 */
// 商品模块接口
import file from '@/api/model/file';
// 订单模块接口
import order from '@/api/model/order';
// 个人中心模块接口
import user from '@/api/model/user';
// 导出接口
export default {    
    file,
    order,
    user
}