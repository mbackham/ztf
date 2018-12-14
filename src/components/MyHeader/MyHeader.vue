<!--我的页面头部组件(带返回按钮)+客服图标-->
<template>
  <header class="header">
    <div class="outer">
      <img src="../../../static/images/icon_箭头_左.png" class="return" @click="$router.back()">
      <span class="header_title">{{title}}</span>
      <img src="../../../static/images/icon_客服.png" class="server_icon"  @click="$router.push({path:'/callService'})">
    </div>
  </header>
</template>

<script>

  export default {
    name: "NeedHeader",
    props: {
      title: String
    },
    data() {
      return {}
    },
    methods: {},

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .isheight
    height 120px!important
  .header
    width 100%
    height 120px
    background-color rgba(255, 255, 255, 1)
    padding 30px 16px 0
    box-sizing border-box
    position relative
    background-image url("../../../static/images/我的_背景.png")
    background-size 100% 100%
    background-repeat no-repeat
    bottom-border-1px(#E5EAF3)
    .outer
      text-align center
      padding-bottom 10px
      .return
        vertical-align middle
        position absolute
        left 16px
        top 32px
      .header_title
        vertical-align middle
        font-size 18px
        font-family PingFangSC-Medium
        font-weight 500
        color: rgba(255, 255, 255, 1);
        line-height 24px
      .server_icon
        position absolute
        right 16px
        top 32px
</style>
