<template>
  <section class="outer_wrap">
    <img src="../../../../static/images/icon_返回.png" class="return" @click="$router.back()">
    <img src="../../../../static/images/icon_客服.png" class="server">
    <p>联系客服</p>
    <img src="../../../../static/images/icon_通话.png" class="calling" @click="callMer()">
  </section>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name: "CallService",
    data(){
      return{

      }
    },
    computed:{
      ...mapState(['customer'])
    },
    methods:{
      callMer(){
        window.location.href = 'tel://'+this.customer
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .outer_wrap
    width 100%
    height 100%
    background:rgba(255,255,255,1);
    text-align: center
    position relative
    .return
      position absolute
      left 16px
      top 34px
    .server
      margin-top 100px
    p
      margin-top 16px
      font-size:18px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:25px;
    .calling
      margin-top 218px
</style>
