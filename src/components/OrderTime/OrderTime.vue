<template>
  <section class="time_wrap">
    <div class="order_time">
      <img src="../../../static/images/icon_时间2.png" alt="">
      <span>预约上门时段</span>
    </div>
    <div class="start_end_time">
      <div class="start">
        <p>预约开始时间</p>
        <p class="time_num">10-30 12:00</p>
      </div>
      <div class="end">
        <p>预约结束时间</p>
        <p class="time_num">10-30 12:00</p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "OrderTime"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .time_wrap
    width 100%
    background-color rgba(255, 255, 255, 1)
    .order_time
      width 100%
      height 48px
      line-height 48px
      padding 0 17px
      box-sizing border-box
      bottom-border-1px(#E5EAF3)
      span
        margin-left 4px
        font-size 16px
        font-family PingFangSC-Medium
        font-weight 500
        color rgba(58, 61, 74, 1)
        line-height 22px
    .start_end_time
      width 375px
      height 56px
      display flex
      margin-bottom 8px
      background-image url("../../../static/images/icon_大箭头.png")
      background-repeat no-repeat
      background-position 50%
      box-shadow 0 0 0 0 rgba(229, 234, 243, 1)
      .start, .end
        width 50%
        line-height 28px
        p
          text-align center
          font-size 16px
          font-family PingFangSC-Regular
          font-weight 400
          color rgba(161, 167, 179, 1)
        .time_num
          font-weight 600
          color rgba(236, 88, 79, 1)
          line-height 22px
</style>
