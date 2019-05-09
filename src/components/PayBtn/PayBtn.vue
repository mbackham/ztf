<template>
  <div class="pay">
    <div class="pay_sum">预约金
      <span class="price">￥30</span>
    </div>
    <div class="pay_btn" @click="$router.push('/pay_page')">支付</div>
  </div>
</template>

<script>
  export default {
    name: "PayBtn"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .pay
    width 100%
    height 50px
    padding-left 16px
    box-sizing border-box
    background rgba(255, 255, 255, 1)
    box-shadow 0 1 0 0 rgba(229, 234, 243, 1)
    position fixed
    bottom 0
    display flex
    .pay_sum
      width 239px
      line-height 50px
      font-size 16px
      font-family PingFangSC-Regular
      font-weight 400
      color rgba(112, 117, 127, 1)
    .pay_btn
      width 120px
      line-height 50px
      text-align center
      font-size 16px
      font-family PingFangSC-Medium
      font-weight 500
      color rgba(255, 255, 255, 1)
      background rgba(236, 88, 79, 1)

</style>
