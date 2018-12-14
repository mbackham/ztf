<!--底部导航组件-->
<template>
  <footer class="footer_guide">
    <!-- <transition name="msg">
      <div class="hurry_up" v-show="isShow" @click="isShow=false">客户催单啦!</div>
    </transition> -->
    <div class="guide_item" @click="goTo('/home')" :class="{on:$route.path==='/home'}">
      <img src="../../../static/images/首页选中.png" v-if="$route.path==='/home'">
      <img src="../../../static/images/首页未选中.png" v-else>
      <span class="guide_name">首页</span>
    </div>
    <div class="guide_item" @click="goTo('/order')" :class="{on:$route.path==='/order'}">
      <img src="../../../static/images/订单选中.png" v-if="$route.path==='/order'">
      <img src="../../../static/images/订单未选中.png" v-else>
      <span class="guide_name">订单</span>
    </div>
    <div class="guide_item" @click="goTo('/mine')" :class="{on:$route.path==='/mine'}">
      <img src="../../../static/images/我的选中.png" v-if="$route.path==='/mine'">
      <img src="../../../static/images/我的未选中.png" v-else>
      <span class="guide_name">我的</span>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        isCheck: false,
        isShow: true
      }
    },
    name: "FooterGuide",
    methods: {
      goTo(path) {
        
        this.$router.push({"path":path})
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .footer_guide
    width 100%
    padding 8px 0
    position fixed
    bottom 0
    display flex
    background rgba(253, 254, 255, 1)
    .hurry_up
      width: 142px;
      height: 47px;
      text-align: center
      line-height 40px
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      background-color #fff
      background url("../../../static/images/消息弹窗.png") no-repeat
      background-size 100% 100%;
      position absolute
      top -47px
      left 50%
      transform translateX(-50%)
    .msg-leave
      opacity: 1
    .msg-leave-active
      opacity 0
      transition all 1.5s
    .guide_item
      text-align center
      width 33%
      display flex
      justify-items center
      align-items center
      flex-direction column
     
      .guide_name
        font-family PingFangSC-Medium, sans-serif
        margin-top 8px
        color #C6CBD6
        font-size 10px/*px*/
      &.on
        .guide_name
          color: rgba(64, 70, 84, 1);
</style>
