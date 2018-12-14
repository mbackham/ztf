<template>
<section class="callservice">
    <TopHeader :title="title">
     
    </TopHeader>
      <section class="outer_wrap">
        <!-- <img src="../../../../static/images/icon_返回.png" class="return" @click="$router.back()"> -->
        <img src="../../../../static/images/kefu.png" class="server">
        <p>客服通话中</p>
        <a href="tel:4009902018" >
        <img src="../../../../static/images/phone.png" class="calling">
        </a>
      </section>
  </section>
</template>

<script>
  export default {
    name: "CallService",
    data(){
        return {
          title:'客服'
        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .callservice
    height 100%
  a
    display block
    width 64px
    height 64px
    margin 0 auto
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
      margin-top 70px
    p
      margin-top 16px
      font-size:18px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:25px;
    .calling
      
      display block
      margin 150px auto 0
</style>
