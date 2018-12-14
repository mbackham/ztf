<template>
  <section class="see_wrap">
    <MyHeader :title="title" />
    <div class="ft_wrap">
      <div class="hd_btn">您目前的服务项目</div>
      <ul class="server_list">
        <li class="se_item" v-for="(item , index) in serviceList" :key="index">{{item.prodName}}</li>
      
      </ul>
    </div>
  </section>
</template>

<script>
import user from "@/api/model/user"
  export default {
    name: "SeeServe",
    data() {
      return {
        title: '服务查看',
        serviceList:[]
      }
    },
    created(){
        //获取用户信息
       
         this.getlist();

    },
    methods:{
        getlist(){
               var that=this;
         user.getservice({"requestId": new Date().getTime()}).then( ( res ) => {
           console.log(res)
              if(res.code==200){  
                console.log(res)            
                      // alert(typeof(res.data))
                      // that.serviceList=Object.assign(that.serviceList,res.data);
                      that.serviceList.push(...res.data)
                      console.log(that.serviceList)
              
              }else{
                this.$tip(res.message)
              }
         }).catch( (error) => {
            console.log(error)
         })
        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .see_wrap
    width 100%
    height 100%
    background: rgba(255, 255, 255, 1);
    .ft_wrap
      width: 359px;
      height:372px;
      padding 0 24px
      margin -30px auto 16px
      box-sizing border-box
      position relative
      z-index 10
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 6px -1px rgba(36, 37, 41, 0.1);
      .hd_btn
        height 40px
        line-height 40px
        margin-bottom 17px
        bottom-border-1px($main)
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(58,61,74,1);
      .server_list
        clearFix()
        .se_item
          width:98px;
          height:32px;
          float left
          line-height 32px
          text-align: center
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(112,117,127,1);
          background #EEF0F6
          margin-bottom 8px
          margin-right 5px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
</style>
