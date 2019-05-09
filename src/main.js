import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Picker} from 'mint-ui'
import 'lib-flexible/flexible'
import Distpicker from 'v-distpicker'
import wx from 'weixin-js-sdk'
import TopHeader from './components/TopHeader/TopHeader'
import Axios from 'axios'
import {baseUrl} from '@/assets/js/env'
import savelocal from './store/saveLocal'
savelocal(store)
// import AMap from 'vue-amap';
// Vue.use(AMap);
// // 初始化vue-amap
// AMap.initAMapApiLoader({
//   // 申请的高德key
//   key: '6b40a990bebaa40169bae9ccec916867',
//   // 插件集合
//   plugin: ['AMap.Geolocation']
// });
Vue.prototype.$axios=Axios
Vue.prototype.stamp=new Date().getTime();
Vue.prototype.Url= 'http://domch.cn/app-api';//提交代码此处一定要为baseUrl
Vue.prototype.urls='http://zhongtongfu-wx-test.uworks.cc/cli/dist/'  //测试环境 的url
//Vue.prototype.urls='http://ccss.chinaccs.cn/wx/cli/dist/'  //kaifa环境 的url

import Mint from 'mint-ui';
Vue.use(Mint);
import {Indicator} from 'mint-ui'
import {PullRefresh} from 'vant';
import {UrlSearch} from './assets/js/fun'
import AMap from 'vue-amap'
import '@/assets/css/auto.css'
//import Scroll from '@/components/scroll/scroll'
let Grap=new UrlSearch();
Vue.prototype.$Grap=Grap;
Vue.use(PullRefresh);
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '6b40a990bebaa40169bae9ccec916867',
  plugin: ['AMap.Geocoder']
});
import 'mint-ui/lib/style.css';
// import FastClick from 'fastclick';
// FastClick.attach(document.body)
// Axios.defaults.headers.post['Content-Type'] = 'application/json';
// Vue.prototype._token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiI5IiwiaXNzIjoienRmZ2ouY29tIiwiZXhwIjoxNTQ1Mzc1NTA4LCJ1c2VySWQiOiIxMDAwMDAwMDIiLCJpYXQiOjE1NDQwNzk1MDh9.vkfTvTi9-Q3KGfOoB8oN_0qFX_WWVM1tmit-aCAziz8"
//注册全局组件
Vue.component('TopHeader', TopHeader);
Vue.component(Picker.name, Picker);
Vue.component('v-distpicker', Distpicker);
//Vue.component(Scroll.name,Scroll)
Vue.prototype.$Indicator = Indicator;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
