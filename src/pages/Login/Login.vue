<!--登录页面-->
<template>
  <section class="login_wrap">
    <img src="../../../static/images/登录_logo.png" alt class="login_logo">
    <p class="app_name">通服管家</p>
    <div class="input_wrap">
     
      <button class="login_btn" @click="wechatLogin">微信快速登陆</button>
    </div> 

    <!-- 以下为用手机号登录 -->
     <div class="input_wrap">
      <input type="text" class="phone" maxlength="11" placeholder="请输入手机号" v-model="phone">
      <span class="add_86">+86</span>
      <span class="line"></span>
      <input type="text" class="code" maxlength="6" placeholder="请输入验证码" v-model="code">
      <button
        class="getCode"
        :class="{sendCode:computeTime>0}"
        @click="getCode"
        :disabled="computeTime>0"
      >{{computeTime > 0 ? `重新获取${computeTime}s` : '获取验证码'}}</button>
      <button class="login_btn" @click="login">登录</button>
    </div> 
    <!-- <div class="login_way">
      <p class="third">微信账号登录</p>
      <div class="third_img">
        <img src="../../../static/images/icon_微信1.png" alt class="wechat" @click="wechatLogin()">
      <img src="../../../static/images/icon_qq1.png" alt> 
      </div>
    </div> -->
  </section>
</template>

<script>
import { Toast } from "mint-ui";
import {mapActions,mapState} from 'vuex'
import Swiper from 'swiper'
export default {
  name: "Login",
  data() {
    return {
      computeTime: 0, //倒计时时间
      phone: "", //手机号
      code: "" //验证码
    };
  },
  methods: {
    ...mapActions(['token_fn','userNum_fn']),
    wechatLogin(){
        
      let host = window.location.host
     let path = encodeURIComponent("http://zhongtongfu-wx-test.uworks.cc/cli"+'/dist/#/authorization'); //登录后回调的地址
     // let path = encodeURIComponent(this.urls +'/#/home'); //登录后回调的地址
    //  let path = encodeURIComponent('http://192.168.1.18:8083/#/home'); //登录后回调的地址
      let state = 1;
      let appid = 'wx100e35b1b4b9f264'; //注册申请的appid
      let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + path + '&response_type=code&scope=snsapi_userinfo&state=' + state + '&connect_redirect=1#wechat_redirect';
      window.location.href = url
    },
    //获取验证码
    getCode() {
      if (!this.isRightPhone) {
        Toast({
          message: "请输入正确的手机号！",
          duration: 2000
        });
        return false;
      } else {
        this.computeTime = 60;
        const interId = setInterval(() => {
          if (this.computeTime <= 0) {
            clearInterval(interId);
            this.computeTime = 0;
            return;
          }
          this.computeTime--;
        }, 1000);
        this.$axios.post(this.Url+'/login/sendAuthCode', {
            "data": this.phone,
            "requestId": this.stamp
          })
          .then(res => {
            Toast("发送验证码成功");
            // alert(res.data.message)
          })
          .catch(err => {
            console.log("发送失败", err);
          });
      }
    },
    //点击登陆
    login() {
      let _this=this;
      this.$axios
        .post(this.Url+'/login/login', {
          data: {
            authCode: this.code,
            userType: 9,
            username: this.phone,
            clientTyp:"WEIXIN",
            clientVersion:"1.0.0"
          },
          requestId: this.stamp
        })
        .then(res => {
          let data = res.data.data;
          this.token_fn(data.token);
          this.userNum_fn(_this.phone);
          sessionStorage.setItem('phone',_this.phone)
          localStorage.setItem("token",data.token);
          localStorage.setItem('phone',_this.phone)
          console.log(res)
          // setTimeout(()=>{
          //   localStorage.clear()
          // },1296000000);
         // this.$router.back()
         this.$router.push({path:'/home',query:{iswechat:1}})
          Toast('登陆成功');
          // if(res.data.data.bindingWx!=null&&res.data.data.bindingWx==1){
          //   this.$router.push('/home')
          //   Toast('登陆成功');
          // }else{
          //   let host = window.location.host
          //   let path = encodeURIComponent("http://zhongtongfu-wx-test.uworks.cc/cli"+'/dist/#/login'); //登录后回调的地址
          //   let state = 1;
          //   let appid = 'wx100e35b1b4b9f264'; //注册申请的appid
          //   let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + path + '&response_type=code&scope=snsapi_userinfo&state=' + state + '&connect_redirect=1#wechat_redirect';
          //   window.location.href = url;
          // }
        })
        .catch(err => {
          console.log("失败", err);
          //前台表单验证
          if (!this.isRightPhone) {
            Toast({
              message: "请输入正确的手机号！",
              duration: 2000
            });
            return;
          } else if (!this.code) {
            Toast({
              message: "请输入验证码！",
              duration: 2000
            });
            return;
          } else if (!this.isRightCode) {
            Toast({
              message: "请输入正确的验证码！",
              duration: 2000
            });
            return;
          }
        });
    },
    // isLogin(){//判断近期是否有登陆
    //     let _this=this;
    //     if(localStorage.getItem('token')){
    //       let tokenS=localStorage.getItem('token')
    //       _this.token_fn(tokenS)
    //       _this.$router.push('/home')
    //     }else{
    //       _this.$router.push('/login')
    //     }
    //   },
      modWechat(){//绑定微信号
        let _this=this;
        let PhoneS=localStorage.getItem('phone');
        let TokenS=localStorage.getItem('token');
        _this.$axios.post(_this.Url+'/api/user/bindingOauth',{
          'data':{
            "code": _this.$Grap.code,
            "mobile": PhoneS,
            "sourceFrom": 1
          },
          'requestId':_this.stamp
        },{
          headers:{
            'Content-Type':'application/json',
            'token':TokenS
          }
        }).then((res)=>{
          console.log(res);
          // alert(res.data.rescode);
          if(res.data.rescode==1){
            location.href=_this.urls+'/#/home'
          }else{
            localStorage.clear()
          }
        })
      }
  },

  mounted(){
    if(localStorage.getItem('token')){
            this.$router.push('/home')
    }
    //localStorage.clear();
    // alert('有更新')
    if(this.$Grap.code){
     // this.modWechat();
    }else{
     // this.isLogin();
    }
  },
  computed: {
    ...mapState(['_token']),
    //手机号正则验证
    isRightPhone() {
      return /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.phone);
    },
    //验证码正则验证
    isRightCode() {
      return /^\d{6}$/.test(this.code);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import 'swiper/dist/css/swiper.min.css';
 input{
  -webkit-appearance: none;
  }
.login_wrap {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  background-color: rgba(255, 255, 255, 1);
  background-image: url('../../../static/images/登录页_背景.png');
  background-repeat: no-repeat;
  background-size: 100%;

  .login_close {
    position: absolute;
    top: 24px;
    left: 16px;
  }

  .login_logo {
    margin: 80px 0 10px;
  }

  .app_name {
    font-size: 20px; /* px */
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(238, 81, 71, 1);
    line-height: 28px;
    margin-bottom: 48px;
  }

  .input_wrap {
    position: relative;

    input {
      width: 311px;
      height: 48px;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid #E7EAEE;
      font-size: 16px;
      padding-left: 16px;
      box-sizing: border-box;
      outline: none;
    }

    .phone {
      padding-left: 78px;
      margin-bottom: 16px;
      position: relative;
    }

    .add_86 {
      position: absolute;
      top: 13px;
      left: 48px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(58, 61, 74, 1);
      line-height: 22px;
    }

    .line {
      position: absolute;
      left: 93px;
      top: 16px;
      display: inline-block;
      width: 1px;
      height: 16px;
      background: rgba(231, 234, 238, 1);
    }

    .code {
      margin-bottom: 40px;
    }

    .getCode {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      background: transparent;
      border: none;
      text-decoration: underline;
      color: rgba(238, 81, 71, 1);
      line-height: 22px;
      position: absolute;
      right: 48px;
      top: 74px;

      &.sendCode {
        color: #F6A8A3;
      }
    }

    .login_btn {
      width: 303px;
      height: 48px;
      background: rgba(238, 81, 71, 1);
      box-shadow: 0 6px 12px -2px rgba(238, 81, 71, 0.3);
      border-radius: 4px;
      border: none;
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
    }
  }

  .login_way {
    width: 100%;
    height: 84px;
    padding-bottom: 24px;
    box-sizing: border-box;
    margin-top 45px
    .third {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(161, 167, 179, 1);
      line-height: 20px;
    }

    .third_img {
      margin-top: 16px;
      .wechat {
        // margin-right: 20px;
      }
    }
  }
}
</style>
