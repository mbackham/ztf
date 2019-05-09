<!--个人设置界面-->
<template>
  <section>
    <TopHeader :title="title">
      <img src="../../../../static/images/icon_返回.png" class="return" @click="$router.back()" slot="return">
    </TopHeader>
    <ul class="setting_list">
      <li class="setting_item" @click="$router.push('/change_num')">
        <div class="name">更换号码</div>
        <div class="">
          <img src="../../../../static/images/icon_更多@2x.png" class="rightarrow">
        </div>
      </li>
      <li class="setting_item">
        <div class="name">版本信息</div>
        <div class="">V&nbsp;1.0</div>
      </li>
    </ul>
    <div class="quit_btn" @click="loginOut">安全退出</div>
  </section>
</template>

<script>
import {mapActions,mapState} from 'vuex'
  export default {
    name: "MySetting",
    data() {
      return {
        title: '我的设置',
        isShow: false
      }
    },
    
    computed:{
      ...mapState(['_token'])
    },
    methods:{
      ...mapActions(['token_fn']),
      loginOut(){       
        this.$Indicator.open()      
        this.$axios.post(this.Url+'/logout',{
          "requestId":this.stamp
        },
        {headers:{
        //  "Content-Type":"application/json",
          'token':localStorage.getItem('token')
        }}).then((res)=>{         
          if(res.data.code==200){ 
              this.$Indicator.close()
              localStorage.clear()
              this.$router.push({path:'/login',query:{iswechat:0}})
          }
            
        }).catch(error => {
              Toast(error)
        })
      }
      // loginOut(){
      //   this.$Indicator.open()
      //   this.token_fn('');
      //   localStorage.clear('token');
      //   setTimeout(()=>{
      //     this.$Indicator.close()
      //     // this.$router.push('/login')
      //     location.href='http://zhongtongfu-wx-test.uworks.cc/cli/dist/#/login'
      //   },1000)
      // }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .rightarrow
    width 20px
  .setting_list
    width 100%
    margin-top 8px
    padding-left 16px
    box-sizing border-box
    background: rgba(255, 255, 255, 1)
    .setting_item
     
      height 48px
      display flex
      align-items center
      justify-content space-between
      padding-right 16px
      box-sizing border-box
      box-shadow 0 0 0 0 rgba(229, 234, 243, 1)
     
      font-size 14px
      font-family PingFangSC-Regular
      .name
        color rgba(58,61,74,1)
        line-height 20px
        width 200px
      
  .quit_btn
    width:100%
    height:48px
    margin-top 8px
    line-height 48px
    text-align: center
    font-size:14px;
    background:rgba(255,255,255,1)
    box-shadow:0 0 0 0 rgba(229,234,243,1)
    color:rgba(238,81,71,1);
</style>
