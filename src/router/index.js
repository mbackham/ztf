import Vue from 'vue';
import VueRouter from 'vue-router';

const authorization = () => import('../pages/Home/authorization' );//首页
const Home = () => import('../pages/Home/Home' );//首页
const Order = () => import('../pages/Order/Order' );//订单
const Mine = () => import('../pages/Mine/Mine');//我的
// import Login from '../pages/Login/Login'; //登录
// import Search from '../pages/Home/Search/Search'; //搜索
// import NeedPut from '../pages/Home/NeedPut/NeedPut'; //需求提交
// import ServiceProject from '../pages/Home/ServiceProject/ServiceProject';//服务详情
// import ServiceProjectDetail from '../pages/Home/ServiceProject/ServiceProjectDetail/ServiceProjectDetail';//服务方案详情
// import EveryDetail from '../pages/Home/ServiceProject/EveryDetail/EveryDetail';//服务方案详情
// import TroubleSend from '../pages/Home/TroubleSend/TroubleSend'; //故障方案
// import TroubleDetail from '../pages/Home/TroubleSend/TroubleDetail/TroubleDetail'; //故障方案详情
// import PerfectMessage from '../pages/Home/NeedPut/PerfectMessage/PerfectMessage'; //完善信息
// import SelectAdress from '../pages/Home/NeedPut/SelectAddress/SelectAddress'; //选择服务地址
// import NewAddress from '../pages/Home/NeedPut/NewAddress/NewAddress'; //选择服务地址
// import PayPage from '../pages/Home/NeedPut/PayPage/PayPage'; //支付页面
// import ServiceAgreement from '../pages/Home/NeedPut/PayPage/ServiceAgreement/ServiceAgreement';//服务协议页面
// import WaitOrderDetail from '../pages/Order/WaitOrderDetail/WaitOrderDetail'//待分配页面详情
// import AwaitOrderDetail from '../pages/Order/AwaitOrderDetail/AwaitOrderDetail'//待施工页面详情
// import DaiquerenOrderDetail from '../pages/Order/DaiquerenOrderDetail/DaiquerenOrderDetail'//服务方案待确认页面详情
// import WaitPayOrderDetail from '../pages/Order/WaitPayOrderDetail/WaitPayOrderDetail'///待支付页面详情
// import TimeOrderDetail from '../pages/Order/TimeOrderDetail/TimeOrderDetail'///待确定时间页面详情
// import CanceledOrderDetail from '../pages/Order/CanceledOrderDetail/CanceledOrderDetail'//已取消页面详情
// import ChargeBack from '../pages/Order/ChargeBack/ChargeBack'//申请退单页面
// import SubmitTrouble from '../pages/Order/BeingOrderDetail/SubmitTrouble/SubmitTrouble'//故障申报页面
// import BeingOrderDetail from '../pages/Order/BeingOrderDetail/BeingOrderDetail'//进行中页面详情
// import FinishOrderDetail from '../pages/Order/FinishOrderDetail/FinishOrderDetail'//已完成页面详情
// import RatingOrder from '../pages/Order/FinishOrderDetail/RatingOrder/RatingOrder'//评价订单页面
// import SendTrouble from '../pages/Order/FinishOrderDetail/SendTrouble/SendTrouble'//故障申报页面
// import ChangeMessage from '../pages/Mine/ChangeMessage/ChangeMessage' //修改信息页面
// import CallService from '../pages/Mine/CallService/CallService' //联系客服页面
// import MyOrder from '../pages/Mine/MyOrder/MyOrder' //我的非标准订单页面
// import MyOrderDetail from '../pages/Mine/MyOrder/MyOrderDetail/MyOrderDetail' //我的非标准订单详情页面
// import MyBack from '../pages/Mine/MyBack/MyBack' //我的退单页面
// import BackDetails from '../pages/Mine/MyBack/BackDetails/BackDetails' //退单详情页面
// import MySetting from '../pages/Mine/MySetting/MySetting' //我的设置页面
// import ChangeNum from '../pages/Mine/MySetting/ChangeNum/ChangeNum' //更换号码页面
const  Login  = () => import( '../pages/Login/Login') ; //登录
const  Search  = () => import( '../pages/Home/Search/Search') ; //搜索
const  NeedPut  = () => import( '../pages/Home/NeedPut/NeedPut') ; //需求提交
const  ServiceProject  = () => import( '../pages/Home/ServiceProject/ServiceProject') ;//服务详情
const  ServiceProjectDetail  = () => import( '../pages/Home/ServiceProject/ServiceProjectDetail/ServiceProjectDetail') ;//服务方案详情
const  EveryDetail  = () => import( '../pages/Home/ServiceProject/EveryDetail/EveryDetail') ;//服务方案详情
const  TroubleSend  = () => import( '../pages/Home/TroubleSend/TroubleSend') ; //故障方案
const  TroubleDetail  = () => import( '../pages/Home/TroubleSend/TroubleDetail/TroubleDetail') ; //故障方案详情
const  PerfectMessage  = () => import( '../pages/Home/NeedPut/PerfectMessage/PerfectMessage') ; //完善信息
const  SelectAdress  = () => import( '../pages/Home/NeedPut/SelectAddress/SelectAddress') ; //选择服务地址
const  NewAddress  = () => import( '../pages/Home/NeedPut/NewAddress/NewAddress') ; //选择服务地址
const  PayPage  = () => import( '../pages/Home/NeedPut/PayPage/PayPage') ; //支付页面
const  ServiceAgreement  = () => import( '../pages/Home/NeedPut/PayPage/ServiceAgreement/ServiceAgreement') ;//服务协议页面
const  WaitOrderDetail  = () => import( '../pages/Order/WaitOrderDetail/WaitOrderDetail') //待分配页面详情
const  AwaitOrderDetail  = () => import( '../pages/Order/AwaitOrderDetail/AwaitOrderDetail') //待施工页面详情
const  DaiquerenOrderDetail  = () => import( '../pages/Order/DaiquerenOrderDetail/DaiquerenOrderDetail') //服务方案待确认页面详情
const  WaitPayOrderDetail  = () => import( '../pages/Order/WaitPayOrderDetail/WaitPayOrderDetail') ///待支付页面详情
const  TimeOrderDetail  = () => import( '../pages/Order/TimeOrderDetail/TimeOrderDetail') ///待确定时间页面详情
const  CanceledOrderDetail  = () => import( '../pages/Order/CanceledOrderDetail/CanceledOrderDetail') //已取消页面详情
const  ChargeBack  = () => import( '../pages/Order/ChargeBack/ChargeBack') //申请退单页面
const  SubmitTrouble  = () => import( '../pages/Order/BeingOrderDetail/SubmitTrouble/SubmitTrouble') //故障申报页面
const  BeingOrderDetail  = () => import( '../pages/Order/BeingOrderDetail/BeingOrderDetail') //进行中页面详情
const  FinishOrderDetail  = () => import( '../pages/Order/FinishOrderDetail/FinishOrderDetail') //已完成页面详情
const  RatingOrder  = () => import( '../pages/Order/FinishOrderDetail/RatingOrder/RatingOrder') //评价订单页面
const  SendTrouble  = () => import( '../pages/Order/FinishOrderDetail/SendTrouble/SendTrouble') //故障申报页面
const  ChangeMessage  = () => import( '../pages/Mine/ChangeMessage/ChangeMessage')  //修改信息页面
const  CallService  = () => import( '../pages/Mine/CallService/CallService')  //联系客服页面
const  MyOrder  = () => import( '../pages/Mine/MyOrder/MyOrder')  //我的非标准订单页面
const  MyOrderDetail  = () => import( '../pages/Mine/MyOrder/MyOrderDetail/MyOrderDetail' ) //我的非标准订单详情页面
const  MyBack  = () => import( '../pages/Mine/MyBack/MyBack')  //我的退单页面
const  BackDetails  = () => import( '../pages/Mine/MyBack/BackDetails/BackDetails')  //退单详情页面
const  MySetting  = () => import( '../pages/Mine/MySetting/MySetting')  //我的设置页面

const  ChangeNum  = () => import( '../pages/Mine/MySetting/ChangeNum/ChangeNum')  //更换号码页面
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
      name:"login",
      meta:{
        keepAlive: false,
        homebackstop:false
       
      }
    },
    {
      path: '/home',
      component: Home,
      name:"home",
      meta: {
        showFooter: true,
        keepAlive: false,
      }
    },
    {
      path: '/search',
      component: Search,
      name:"search",
    },
    {
      path: '/authorization',
      component: authorization,
      name:"authorization",
    },
    {
      path: '/need_put',
      component: NeedPut,
      name:"NeedPut",
      meta: {
        showFooter: false,
        homebackstop:false
      }
    },
    {
      path: '/project',
      component: ServiceProject,
      name:"ServiceProject",
    },
    {
      path: '/project_detail',
      component: ServiceProjectDetail,
      name:"ServiceProjectDetail",
    },
    {
      path: '/every_detail',
      component: EveryDetail,
      name:"EveryDetail",
    },
    {
      path: '/trouble',
      component: TroubleSend,
      name:"TroubleSend",
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/trouble_detail',
      component: TroubleDetail,
      name:"TroubleDetail",
    },
    {
      path: '/perfect',
      component: PerfectMessage,
      name:"PerfectMessage",
    },
    {
      path: '/address',
      component: SelectAdress,
      name:"SelectAdress",
    },
    {
      path: '/new_address',
      component: NewAddress,
      name:"NewAddress",
    },
    {
      path: '/pay_page',
      component: PayPage,
      name:"PayPage",
      mata: {
        keepAlive: true
      }
    },
    {
      path: '/agreement',
      component: ServiceAgreement,
      name:"ServiceAgreement",

    },
    {
      path: '/order',
      component: Order,
      name:"order",
      meta: {
        showFooter: true,
        keepAlive: true,
        homebackstop:false
      }
    },
    {
      path: '/wait_detail',
      component: WaitOrderDetail,
      name:"WaitOrderDetail",
    },
    {
      path: '/await_orderdetail',
      component: AwaitOrderDetail,
      name:"AwaitOrderDetail",
    },
    {
      path: '/daiqueren_orderdetail',
      component: DaiquerenOrderDetail,
      name:"DaiquerenOrderDetail",
    },
    {
      path: '/waitpay_orderdetail',
      component: WaitPayOrderDetail,
      name:"WaitPayOrderDetail",
    },
    {
      path: '/time_orderdetail',
      component: TimeOrderDetail,

      name:"TimeOrderDetail",
    },
    {
      path: '/canceled_orderdetail',
      component: CanceledOrderDetail,
      name:"CanceledOrderDetail"
    },
    {
      path: '/time_orderdetail',
      component: TimeOrderDetail,
      name:"TimeOrderDetail",
    },
    {
      path: '/charge_back',
      component: ChargeBack,
      name:"ChargeBack",
    },
    {
      path: '/submit_trouble',
      component: SubmitTrouble,
      name:"SubmitTrouble",
    },
    {
      path: '/being_detail',
      component: BeingOrderDetail,
      name:"BeingOrderDetail",
    },
    {
      path: '/finish_detail',
      component: FinishOrderDetail,
      name:"FinishOrderDetail",
    },
    {
      path: '/rating_order',
      component: RatingOrder,
      name:"RatingOrder",
    },
    {
      path: '/send_trouble',
      component: SendTrouble,
      name:"SendTrouble",
    },
    {
      path: '/mine',
      component: Mine,
      name:"mine",
      meta: {
        showFooter: true,
        keepAlive: false,
        homebackstop:false
      }
    },
    {
      path: '/change',
      component: ChangeMessage,
      name:"ChangeMessage",
    },
    {
      path: '/setting',
      component: MySetting,
      name:"MySetting",
    },
    {
      path: '/change_num',
      component: ChangeNum,
      name:"ChangeNum",
    },
    {
      path: '/call',
      component: CallService,
      name:"CallService",
    },
    {
      path: '/my_order',
      component: MyOrder,
      name:"MyOrder",
    },
    {
      path: '/order_detail',
      component: MyOrderDetail,
      name:"MyOrderDetail",
    },
    {
      path: '/back',
      component: MyBack,
      name:"MyBack",
    },
    {
      path: '/back_details',
      component: BackDetails,
      name:"BackDetails",
    },
		{
			path:'/associated',//绑定手机号
      component:resolve=>require(['@/pages/Home/associated'],resolve),
      name:"associated",
      
		}
  ]
})
export default router;
