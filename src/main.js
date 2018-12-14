import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'
import {Picker} from 'mint-ui'
import store from './store/index'
import TopHeader from './components/TopHeader/TopHeader'
import HeaderTop from './components/HeaderTop/HeaderTop'
import MyHeader from './components/MyHeader/MyHeader'
import NavBar from './components/NavBar/NavBar'
import TextInput from './components/TextInput/TextInput'
import Vant from 'vant';
import 'vant/lib/index.css';
import savelocal from './store/saveLocal'
import '@/common/stylus/icon.styl'
savelocal(store)
Vue.use(Vant);
import { Toast,Popup,Switch,Rate,Uploader,Area,Stepper,Dialog} from 'vant';
Vue.use(Toast).use(Popup).use(Switch).use(Rate).use(Uploader).use(Area ).use(Stepper).use(Dialog);
Vue.prototype.$tip=msg => Toast({
  message:msg,
  forbidClick:true,
  duration:1500
})

var bus=new Vue();


//注册全局组件
Vue.component('TopHeader', TopHeader);
Vue.component('HeaderTop', HeaderTop);
Vue.component('MyHeader', MyHeader);
Vue.component('NavBar', NavBar);
Vue.component('TextInput', TextInput);
import wx from 'weixin-js-sdk'
Vue.component(Picker.name, Picker);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  bus,
  render: h => h(App),
  router,
})
