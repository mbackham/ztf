<!--登录页面-->
<template>
  <section class="login_wrap">
  
    <img src="../../../static/images/LOGO.png" alt="" class="login_logo">
    <p class="app_name">通服管家</p>
    <div class="input_wrap">
      <input type="text" class="phone" maxlength="11" placeholder="请输入手机号" v-model="logindata.data.username">
      <span class="add_86">+86</span>
      <span class="line"></span>
      <input type="text" class="code" maxlength="6" placeholder="请输入验证码" v-model="logindata.data.authCode">
      <button class="getCode" :class="{sendCode:computeTime>0}" @click="getCode" :disabled="computeTime>0">
        {{computeTime > 0 ? `重新获取${computeTime}s` : '获取验证码'}}
      </button>
      <button class="login_btn" @click="login">登录</button>
    </div>
  </section>
</template>

<script>
  import {Toast,} from 'mint-ui';
import user from "@/api/model/user"
import {mapMutations} from 'vuex'
  export default {
    name: "Login",
    data() {
      return {
        computeTime: 0,//倒计时时间
        phone: '',//手机号
        code: '',//验证码
        logindata:{data:{userType:2,clientType:"WEIXIN",clientVersion:"1.0.0"},"requestId": new Date().getTime()}
      }
    },
    computed:{
       ...mapMutations(['loginSuccess']),
    },
    methods: {
     
      //获取验证码
      getCode() {
        if (!this.logindata.data.username) {
          Toast({
            message: '请输入正确的手机号！',
            duration: 2000
          });
          return false;
        } else {
          user.getCode ({data:this.logindata.data.username,"requestId": new Date().getTime()}).then((res) => {
            if(res.code==200){              
                 Toast('已发送');
                this.computeTime = 60;
                const interId = setInterval(() => {
                  if (this.computeTime <= 0) {
                    clearInterval(interId);
                    this.computeTime = 0;
                    return
                  }
                  this.computeTime--;
                }, 1000)
            }else{
              Toast(res.message)
            }
                
          }).catch((error) => {
              console.log(error)
          })
         
        }

      },
      //点击登录
      login() {
        //前台表单验证
        if (!this.logindata.data.username) {
          Toast({
            message: '请输入正确的手机号！',
            duration: 2000
          });
          return
        } else if (!this.logindata.data.authCode) {
          Toast({
            message: '请输入验证码！',
            duration: 2000
          });
          return
        } else if (!this.logindata.data.authCode) {
          Toast({
            message: '请输入正确的验证码！',
            duration: 2000
          });
          return
        } else {
          user.login (this.logindata).then((res) => {
            if(res.code==200){
              console.log(res)
             // this.loginSuccess(res.data.token)
              localStorage.setItem('token',res.data.token)
              localStorage.setItem('mobile',this.logindata.data.username)
              this.$store.commit('loginSuccess', res.data.token);
               this.$router.replace('/home');
              
            }else{
              this.$tip(res.message)
            }
                
          }).catch((error) => {
              console.log(error)
          })
         
        }
      }
    },
    computed: {
      //手机号正则验证
      isRightPhone() {
        return /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.phone)
      },
      //验证码正则验证
      isRightCode() {
        return /^\d{6}$/.test(this.code)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login_wrap
    width 100%
    height 100%
    text-align: center
    position relative
    background-color rgba(255, 255, 255, 1)
    background-image url("../../../static/images/rawpixel-1065668-unsplash.png")
    background-position bottom
    background-repeat no-repeat
    background-size 100%
    .login_close
      position absolute
      top 24px
      left 16px
    .login_logo
      margin 80px 0 10px
    .app_name
      font-size 20px /*px*/
      font-family PingFangSC-Medium
      font-weight 500
      color rgba(238, 81, 71, 1)
      line-height 28px
      margin-bottom 48px
    .input_wrap
      position relative
      input
        width 311px
        height 48px
        background rgba(255, 255, 255, 1)
        border-radius 2px
        border 1px solid #E7EAEE
        font-size 16px
        padding-left 16px
        box-sizing border-box
        outline none
      .phone
        padding-left 78px
        margin-bottom 16px
        position relative
      .add_86
        position absolute
        top 13px
        left 48px
        font-size 16px
        font-family PingFangSC-Regular
        font-weight 400
        color rgba(58, 61, 74, 1)
        line-height 22px
      .line
        position absolute
        left 93px
        top 16px
        display inline-block
        width 1px
        height 16px
        background rgba(231, 234, 238, 1)
      .code
        margin-bottom 40px
      .getCode
        font-size 16px
        font-family PingFangSC-Regular
        font-weight 400
        background transparent
        border none
        text-decoration underline
        color rgba(238, 81, 71, 1)
        line-height 22px
        position absolute
        right 48px
        top 74px
        &.sendCode
          color #F6A8A3
      .login_btn
        width 303px
        height 48px
        background rgba(238, 81, 71, 1)
        box-shadow 0 6px 12px -2px rgba(238, 81, 71, 0.3)
        border-radius 4px
        border none
        font-size 18px
        font-family PingFangSC-Medium
        font-weight 500
        color rgba(255, 255, 255, 1)
        line-height 25px
</style>
