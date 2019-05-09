<!--底部提交按钮-->
<template>
  <div class="ft_btn">提 交</div>
</template>

<script>
  export default {
    name: "SubmitBtn"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .ft_btn
    width 100%
    height 50px
    position fixed
    bottom 0
    text-align: center
    background: rgba(215, 219, 227, 1);
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    &.on
      background: rgba(238, 81, 71, 1);
      color: rgba(255, 255, 255, 1);
</style>
