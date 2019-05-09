<!--订单详情-->
<template>
  <ul class="order_msg" v-if="orderInfo">
    <li class="title">订单信息</li>
    <li class="item_msg">
      <span class="name">订单号</span>
      <span class="num">{{orderInfo.orderId}}</span>
    </li>
    <li class="item_msg">
      <span class="name">订单状态</span>
      <span class="state" :class="changeClass(orderInfo.orderStateName)">{{orderInfo.orderStateName}}</span>
    </li>
    <li class="item_msg" v-if="orderInfo.orderRequire">
      <span class="name">服务类型</span>
      <span class="type">{{orderInfo.orderRequire[0].requireName}}</span>
    </li>
    <li class="item_msg" v-if="orderInfo.orderRequire">
      <span class="name">服务项目</span>
      <span class="problem">{{orderInfo.orderRequire[0].cateName}}</span>
    </li>
    <li class="item_msg">
      <span class="name">工程进行时间</span>
      <span class="problem">{{orderInfo.startTime}}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "AllOrderInfo",
    props:{
      orderInfo: Object
    },
    methods:{
      //改变状态框的背景色
      changeClass(s) {
        if (s==='待分配') {
          return 'pink';
        } else if (s === '施工中' || s=== '待结算') {
          return 'yellow';
        } else if (s === '已完成' || s === '已取消') {
          return 'green';
        }
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .order_msg
    width 100%
    margin-bottom 8px
    padding 0 16px
    box-sizing border-box
    background #fff
    .title
      font-size: 16px;
      font-weight: 500;
      color: rgba(58, 61, 74, 1);
      line-height: 48px;
      width: 375px;
      height: 48px;
      bottom-border-1px($main)
    .item_msg
      width 100%
      height 48px
      display flex
      align-items center
      justify-content space-between
      font-size: 14px;
      bottom-border-1px($main)
      .state
        color #ee5147
        &.pink
          color: rgba(238, 81, 71, 1);
        &.yellow
          color: rgba(248, 162, 16, 1);
        &.green
          color: rgba(46, 171, 89, 1);
      .name
        color: rgba(112, 117, 127, 1);
      .type, .problem
        color: rgba(58, 61, 74, 1);
</style>
