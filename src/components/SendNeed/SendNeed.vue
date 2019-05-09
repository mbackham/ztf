<!--发布需求组件-->
<template>
  <section class="post_need">
    <div class="text_box">
      <p class="title">问题描述</p>
      <textarea class="textCon" cols="30" rows="10" placeholder="请详细描述您的需求"></textarea>
    </div>
    <p class="hint">提示：此为非标准订单，在您提交以后客服会帮您转化为标准订单</p>
  </section>
</template>

<script>
  export default {
    name: "SendNeed"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .post_need
    width 100%
    height 409px
    position absolute
    top 208px
    .text_box
      width 100%
      padding 0 16px 16px
      box-sizing border-box
      background rgba(255, 255, 255, 1)
      .title
        height 48px
        line-height 48px
        font-size 16px
        font-family PingFangSC-Medium
        font-weight 500
        color rgba(58, 61, 74, 1)
      .textCon
        outline none
        font-size 14px
        width 343px
        height 180px
        border none
        padding 8px
        box-sizing border-box
        background rgba(238, 240, 246, 1)
        border-radius 2px
        font-family: PingFangSC-Regular;
        &::-webkit-input-placeholder /*Webkit browsers*/
          color: #A1A7B3
          font-size: 14px;
    .hint
      padding 0 16px
      margin-top 8px
      font-size: 12px
      font-family PingFangSC-Regular
      font-weight 400
      color rgba(161, 167, 179, 1)
      line-height 18px
</style>
