<template>
  <section class="change_wrap">
    <TopHeader :title="title">
      <img src="../../../../../static/images/icon_位置.png" slot="add" class="server_icon">
    </TopHeader>
    <ul class="change_list">
      <li class="change_item">
        <input type="text" placeholder="请输入新的手机号码" v-model="postdata.data.reMobile" maxlength="11">
      </li>
      <li class="change_item">
        <input type="text" placeholder="请输入验证码" v-model="postdata.data.authCode" maxlength="6">
        <button class="getCode" :class="{sendCode:computeTime>0}" @click="getCode" :disabled="computeTime>0">
          {{computeTime > 0 ? `(${computeTime})重新获取` : '获取验证码'}}
        </button>
      </li>
    </ul>
    <div class="outer">
      <div class="footer_btn" @click="change" :class="{on:isRightPhone&&isRightCode}">确认更改</div>
    </div>
  </section>
</template>

<script>
  import {Toast} from 'mint-ui';

  import user from "@/api/model/user"
  export default {
    name: "ChangePhone",
    data() {
      return {
        title: '更换手机', 
        computeTime: 0,
        postdata:{"data":{reMobile:"",authCode:"",mobile:localStorage.getItem('mobile')},"requestId": new Date().getTime()}
        
      }
    },
    methods: {
      //获取验证码
      getCode() {
        if (!this.postdata.data.reMobile) {
          Toast({
            message: '请输入正确的手机号！',
            duration: 2000
          });
          return false;
        } else {
                user.getCode ({"data":this.postdata.data.reMobile,"requestId": new Date().getTime()}).then((res) => {
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
      change() {
        //前台表单验证
        if (!this.postdata.data.reMobile) {
          Toast({
            message: '请输入正确的手机号！',
            duration: 2000
          });
          return
        } else if (!this.postdata.data.authCode) {
          Toast({
            message: '请输入验证码！',
            duration: 2000
          });
          return
        } else if (!this.postdata.data.authCode) {
          Toast({
            message: '请输入正确的验证码！',
            duration: 2000
          });
          return
        } else {
             user.updateUserMobile (this.postdata).then((res) => {
                    if(res.code==200){    
                       localStorage.setItem('mobile',this.postdata.data.reMobile)          
                        Toast(res.message);
                        this.$router.back()
                    }else{
                      Toast(res.message)
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
        return /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.postdata.data.reMobile)
      },
      //验证码正则验证
      isRightCode() {
        return /^\d{6}$/.test(this.postdata.data.authCode)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"

  .change_wrap
    width 100%
    height 100%
    .change_list
      width 100%
      background #fff
      margin-top 8px
      padding-left 16px
      box-sizing border-box
      .change_item
        height 56px
        width 100%
        font-size: 14px;
        font-family: PingFangSC-Regular;
        padding-right 16px
        box-sizing border-box
        display flex
        align-items center
        justify-content space-between
        input
          height 100%
          outline none
          &::-webkit-input-placeholder /*Webkit browsers*/
            color: #ccc
        .getCode
          border transparent
          background none
          color: rgba(67, 74, 90, 1)
          line-height: 20px
          &.sendCode
            color: rgba(187, 191, 199, 1);
    .outer
      height 83px
      width 100%
      position relative
      .footer_btn
        width 100%
        height: 48px
        position absolute
        bottom 0
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        background $red
        opacity 0.6
        color: rgba(255, 255, 255, 1);
        text-align: center
        line-height: 48px;
        &.on
          opacity 1
</style>
