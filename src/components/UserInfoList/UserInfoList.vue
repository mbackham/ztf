<template>
  <ul class="userInfo_list">
    <li class="userInfo_item">
      <img src="../../../static/images/icon_位置.png" alt="" class="img_one">
      <div class="item_wrap bottom">
        <span class="item_name">服务地址</span>
        <span class="serve_address ellipsis">北京 朝阳区 建国路(路口)</span>
        <img src="../../../static/images/icon_更多.png" alt="">
      </div>
    </li>
    <li class="userInfo_item item_left">
      <div class="item_wrap bottom">
        <span class="item_name">详细地址</span>
        <input type="text" placeholder="请填写详细地址">
      </div>
    </li>
    <li class="userInfo_item">
      <img src="../../../static/images/icon_联系人.png" alt="" class="img_one">
      <div class="item_wrap bottom">
        <span class="item_name">联系人</span>
        <span class="user_name">voices</span>
      </div>
    </li>
    <li class="userInfo_item">
      <img src="../../../static/images/icon_手机.png" alt="" class="img_one">
      <div class="item_wrap">
        <span class="item_name">联系电话</span>
        <input type="tel" placeholder="请填写联系电话">
      </div>
    </li>
    <img src="../../../static/images/地址条.png" alt="">
  </ul>
</template>

<script>
  export default {
    name: "UserInfoList"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .userInfo_list
    background-color rgba(255, 255, 255, 1)
    .userInfo_item
      height 48px
      display flex
      align-items center
      padding-left 17px
      font-size 16px
      .item_wrap
        height 100%
        width 335px
        padding-right 16px
        box-sizing border-box
        display flex
        align-items center
        box-shadow 0 0 0 0 rgba(229,234,243,1)
      .bottom
        bottom-border-1px(#E5EAF3)
      .item_name
        font-family PingFangSC-Regular
        font-weight 400
        color rgba(112, 117, 127, 1)
        line-height 22px
      input
        outline none
      input, .serve_address
        margin-left 16px
      .serve_address
        display inline-block
        width 222px
      .user_name
        margin-left 32px
      .img_one
        margin-right 10px
    .item_left
      padding-left 40px
</style>
