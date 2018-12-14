import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index'
import Login from '../pages/Login/Login'; //登录页面
const Home = () => import('../pages/Home/Home');//首页
const Order = () => import('../pages/Order/Order');//订单
const Mine = () => import('../pages/Mine/Mine');//我的



const ServiceProDetail = () => import('../pages/Order/ServiceProjectDetail');//服务方案详情
const changeservice = () => import('../pages/Order/changeservice');//服务方案详情
const Search  = () => import( '../pages/Home/Search/Search'); //搜索页面
const GetOrder  = () => import( '../pages/Home/GetOrder/GetOrder'); //抢单页面
const WaitOrder  = () => import( '../pages/Home/WaitOrder/WaitOrder'); //待预约页面
const WaitOrderDetail  = () => import( '../pages/Home/WaitOrder/WaitOrderDetail/WaitOrderDetail'); //待处理订单页面
const BeingOrder  = () => import( '../pages/Home/BeingOrder/BeingOrder'); //处理中页面
const BeingOrderDetail  = () => import( '../pages/Home/BeingOrder/BeingOrderDetail/BeingOrderDetail'); //处理中订单详情页面
const ChangeProject  = () => import( '../pages/Home/BeingOrder/BeingOrderDetail/ChangeProject/ChangeProject'); //处理中订单详情页面
const FinishOrder  = () => import( '../pages/Home/FinishOrder/FinishOrder'); //已完成页面
const FinishOrderDetail  = () => import( '../pages/Home/FinishOrder/FinishOrderDetail/FinishOrderDetail'); //已完成详情页面
const TroubleSend  = () => import( '../pages/Home/TroubleSend/TroubleSend'); //故障申报页面
const TroubleOrderDetail  = () => import( '../pages/Home/TroubleSend/TroubleOrderDetail/TroubleOrderDetail'); //故障申报详情页面
const Setting  = () => import( '../pages/Mine/Setting/Setting')//设置页面
const FundDetail  = () => import( '../pages/Mine/FundDetail/FundDetail')//我的资金页面
const CallService  = () => import( '../pages/Mine/CallService/CallService')//客服
const MyStar  = () => import( '../pages/Mine/MyStar/MyStar')//我的星级页面
const SeeServe  = () => import( '../pages/Mine/SeeServe/SeeServe')//服务查看页面
const ChangePhone  = () => import( '../pages/Mine/Setting/ChangePhone/ChangePhone')//更换手机页面
const SeeAddress  = () => import( '../pages/Mine/SeeAddress/SeeAddress')//查看地址页面
const nofound  = () => import( '../components/404')//查看地址页面
const changeservicedetail = () => import( '../pages/Order/changeserverdetail')//服务详情

Vue.use(VueRouter);
 
const routers = new VueRouter({


  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login,
      name:"login",
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/callService',
      component: CallService,
      name:"callService",
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        showFooter: true,
        keepAlive: false
      },
    },
    {
      path: '/changeservice',
      component: changeservice,
      meta: {
        showFooter: false,
        keepAlive: false
      },
    },
    
    {
      path: '/changeservicedetail',
      component: changeservicedetail,
      meta: {
        
      },
    },
    {
      path: '/search',
      component: Search,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/get_order',
      component: GetOrder,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/wait_order',
      component: WaitOrder,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/wait_detail',
      component: WaitOrderDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/being',
      component: BeingOrder,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/being_detail',
      component: BeingOrderDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/change_project',
      component: ChangeProject,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/finish',
      component: FinishOrder,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/order_detail',
      component: FinishOrderDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/trouble',
      component: TroubleSend,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/trouble_detail',
      component: TroubleOrderDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true,
        keepAlive: true
      }
    },
    {
      path: '/ServiceProDetail',
      component: ServiceProDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/mine',
      component: Mine,
      meta: {
        showFooter: true,
        keepAlive: true
      },
    },
    {
      path: '/setting',
      component: Setting,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/seeaddress',
      component: SeeAddress,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/funddetail',
      component: FundDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/mystar',
      component: MyStar,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/seeserve',
      component: SeeServe,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/change_phone',
      component: ChangePhone,
      meta: {
        keepAlive: false
      }
     }
    // {
    //   path:'/*',
    //   component: nofound,
    //   meta: {
    //     keepAlive: false
    //   }
    // },
  ]
})
routers.beforeEach(function (to, from, next) {
  
   if (to.name === 'login') {
    
       if (store.state.token) {
        routers.push({path: '/home'});
       }
   }
   next();
 });
export default  routers