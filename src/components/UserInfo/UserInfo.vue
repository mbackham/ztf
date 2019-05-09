<!--订单详情页用户信息-->
<template>
  <div class="user_info">
    <div class="left_wrap">
      <img src="../../../static/images/商品.jpg" class="touxiang">
      <div>
        <p class="user_name">罗秀兰</p>
        <div>
          <img src="../../../static/images/icon_全星.png" alt="">
          <img src="../../../static/images/icon_全星.png" alt="">
          <img src="../../../static/images/icon_全星.png" alt="">
          <img src="../../../static/images/icon_全星.png" alt="">
          <img src="../../../static/images/icon_半星.png" alt="">
          <span class="score">4.5</span>
        </div>
      </div>
    </div>
    <img src="../../../static/images/icon__联系.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .user_info
    width 100%
    display flex
    justify-content space-between
    align-items center
    margin 8px 0
    padding 13px 27px 13px 16px
    box-sizing border-box
    background: rgba(255, 255, 255, 1);
    .touxiang
      width: 40px;
      height: 40px;
      border-radius 50%
      margin-right 8px
    .left_wrap
      height 100%
      display flex
      align-items center
      .user_name, .score
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(58, 61, 74, 1);
        line-height: 20px;
        margin-bottom 3px
      .score
        font-weight: 400;
</style>
