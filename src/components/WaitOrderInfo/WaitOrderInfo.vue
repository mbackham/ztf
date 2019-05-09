<!--待分配订单信息组件-->
<template>
  <section class="outer_wrap">
    <div class="title">订单信息</div>
    <ul class="order_msg">
      <li class="item_msg">
        <span class="name">订单号</span>
        <span class="num">2018102111053</span>
      </li>
      <li class="item_msg">
        <span class="name">订单状态</span>
        <slot name="state"></slot>
      </li>
      <li class="item_msg">
        <span class="name">服务类型</span>
        <span class="type">其他</span>
      </li>
      <li class="item_msg">
        <span class="name">问题描述</span>
        <span class="problem">家中网线时有时无，屏幕闪烁不断</span>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: "WaitOrderInfo"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .outer_wrap
    width 100%
    font-family: PingFangSC-Medium;
    background: rgba(255, 255, 255, 1);
    .title
      margin-top 8px
      font-size: 16px;
      font-weight: 500;
      color: rgba(58, 61, 74, 1);
      line-height: 48px;
      width: 375px;
      height: 48px;
      padding 0 16px
      box-sizing border-box
      bottom-border-1px($main)
    .order_msg
      width 100%
      padding-left 16px
      box-sizing border-box
      margin-bottom 8px
      .item_msg
        width 100%
        height 48px
        display flex
        align-items center
        justify-content space-between
        padding-right 16px
        box-sizing border-box
        font-size: 14px;
        bottom-border-1px($main)
        .name
          color: rgba(112, 117, 127, 1);
        .type, .problem
          color: rgba(58, 61, 74, 1);
</style>
