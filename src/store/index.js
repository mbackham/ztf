/*
vuex核心管理对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    userNum:'',//当前登录用户的手机号
    user:{},//用户信息
    typeV:[],//服务类型
    typeTop:'',//服务项目
    _token:'',//用户token
    addr:{},//下单地址
    startTimeV:'',//预约开始时间
    endTimeV:'',//预约结束时间
    upstartTimeV:'',//上传开始时间
    upendTimeV:'',//上传结束时间
    requireCateID:'',//服务类型ID
    requireID:[],//服务列表ID
    customer:'',//客服
    appointment:'',//预约金
  },
  mutations:{

  },
  actions:{
    token_fn(state,opt){
      this.state._token=opt;
    },
    addr_fn(state,opt){
      this.state.addr=opt;
    },
    typeTop_fn(state,opt){
      this.state.typeTop=opt;
    },
    starTime_fn(state,opt){
      this.state.startTimeV=opt;
    },
    endTime_fn(state,opt){
      this.state.endTimeV=opt
    },
    upstartTimeV_fn(state,opt){
      this.state.upstartTimeV=opt;
    },
    upendTimeV_fn(state,opt){
      this.state.upendTimeV=opt;
    },
    requireCateID_fn(state,opt){
      this.state.requireCateID=opt;
    },
    userNum_fn(state,opt){
      this.state.userNum=opt
    },
    customer_fn(state,opt){
      this.state.customer=opt
    },
    appointment_fn(state,opt){
      this.state.appointment=opt
    }
  },
  getters:{

  }
})
