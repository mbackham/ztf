<!--底部导航组件-->
<template>
  <footer class="footer_guide">
    <transition name="msg">
      <div class="hurry_up" v-show="isShow" @click="isShow=false">您的订单有新状态啦!</div>
    </transition>
    <div class="guide_item" @click="goTo('/home')" :class="{on:$route.path==='/home'}">
      <img src="../../../static/images/icon_首页-选中@2x.png" v-if="$route.path==='/home'">
      <img src="../../../static/images/icon_首页-未选中@2x.png" v-else>
      <span class="guide_name">首页</span>
    </div>
    <div class="guide_item" @click="goTo('/order')" :class="{on:$route.path==='/order'}">
      <img src="../../../static/images/icon_订单-选中@2x.png" v-if="$route.path==='/order'">
      <img src="../../../static/images/icon_订单-未选中@2x.png" v-else>
      <span class="guide_name">订单</span>
    </div>
    <div class="guide_item" @click="goTo('/mine')" :class="{on:$route.path==='/mine'}">
      <img src="../../../static/images/icon_我的-选中@2x.png" v-if="$route.path==='/mine'">
      <img src="../../../static/images/icon_我的-未选中@2x.png" v-else>
      <span class="guide_name">我的</span>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false
      }
    },
    name: "FooterGuide",
    methods: {
      goTo(path) {
        this.$router.replace(path)
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .footer_guide
    width 100%
    padding-bottom 4px
    position fixed
    bottom 0
    display flex
    background rgba(253, 254, 255, 1)
    .hurry_up
      width: 163px;
      height: 47px;
      text-align: center
      line-height 40px
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      background url("../../../static/images/消息气泡.png") no-repeat
      background-position center -4px
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
      img
        margin-top 6px
        width 30px
      .guide_name
        font-family PingFangSC-Medium, sans-serif
        margin-top 4px
        color #C6CBD6
        font-size 10px
      /*px*/
      &.on
        .guide_name
          color #EE5147
</style>
