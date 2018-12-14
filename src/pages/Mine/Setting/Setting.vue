<!--设置页面-->
<template>
  <section class="setting_wrap">
    <TopHeader :title="title">
      <img src="../../../../static/images/icon_位置.png" slot="add" class="server_icon">
    </TopHeader>
    <ul class="setting_list">
      <li class="item" @click="$router.push('/change_phone')">
        <span>更换手机</span>
        <img src="../../../../static/images/标题_首页.png" alt="">
      </li>
      <li class="item">
        <span>版本信息</span>
        <span>V01</span>
      </li>
    </ul>
    <div class="quit">
      <div class="inner" @click="logout">
        <span>安全退出</span>
        <img src="../../../../static/images/标题_首页.png" alt="">
      </div>
    </div>
  </section>
</template>

<script>
 import {Toast,} from 'mint-ui';
import user from "@/api/model/user"
  export default {
    name: "Setting",
    data(){
      return{
        title: '设置'
      }
    },
    methods: {
      logout(){
             user.logout({"requestId": new Date().getTime()}).then((res) => {
                if(res.code==200){              
                   // Toast(res.message);
                    localStorage.removeItem('token')
                     localStorage.removeItem('mobile')
                     this.$store.commit('loginSuccess', null);
                     
                    this.$router.push('/login')
                   
                   
                }else{
                  Toast(res.message)
                }
                  
            }).catch((error) => {
                console.log(error)
            })
      }
      
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .setting_wrap
    width 100%
    height 100%
    span
      font-size:16px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(67,74,90,1);
    .setting_list
      width 100%
      box-sizing border-box
      margin-top 8px
      padding-left 16px
      background:rgba(255,255,255,1)
      .item
        width 100%
        height 56px
        padding-right 16px
        box-sizing border-box
        bottom-border-1px($main)
        display flex
        align-items center
        justify-content space-between
    .quit
      width 100%
      height 475px
      line-height 56px
      padding-left 16px
      margin-top 8px
      box-sizing border-box
      background:rgba(255,255,255,1)
      .inner
        width 100%
        height 56px
        display flex
        align-items center
        padding-right 16px
        box-sizing border-box
        bottom-border-1px($main)
        justify-content space-between
</style>
