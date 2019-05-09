<!--服务方案列表-->
<template>
  <ul class="server_list" v-if="orderInfo">
    <li class="title">
      <span>服务方案</span>
      <span class="see_more" @click="seeInfo">
        查看详情
        <img src="../../../static/images/icon_更多.png" alt="">
      </span>
    </li>
    <li class="things_item">
      <ul>
        <li class="outer_wrap" v-for="(o,index) in orderInfo.orderService" :key="index">
          <div>
            <img class="item_img" :src="`http://domch.cn/file-api/image/${o.prodImagePath}`">
            <span class="name">{{o.prodName}}</span>
          </div>
          <div>
            <span class="sum">x{{o.prodNum}}</span>
            <span class="price">￥{{o.totalPrice}}</span>
          </div>
        </li>
      </ul>
    </li>
    <li class="money_list">
      <span class="name">应付服务费</span>
      <span class="money">￥{{orderInfo.serviceFee}}</span>
    </li>
    <li class="money_list">
      <div>
        <img src="../../../static/images/icon_抵扣.png" alt="">
        <span>上门服务费抵扣</span>
      </div>
      <span class="money">-￥{{orderInfo.subscribeFee}}</span>
    </li>
    <li class="money_list">
      <span class="all_money">合计</span>
      <span class="all">￥{{orderInfo.finalFee}}</span>
    </li>
  </ul>

</template>

<script>
  export default {
    name: "ServerProject",
    props: {
      orderInfo: Object
    },
    methods: {
      seeInfo() {
        this.$router.push({
          path: '/project_detail',
          query: {info: this.orderInfo}
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .server_list
    width 100%
    padding 0 16px
    box-sizing border-box
    background #fff
    margin-bottom 8px
    .title
      width 100%
      height 56px
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(58, 61, 74, 1);
      bottom-border-1px($main)
      display flex
      align-items center
      justify-content space-between
      .see_more
        font-size: 14px;
        color: rgba(112, 117, 127, 1);
    .things_item
      bottom-border-1px($main)
      .outer_wrap
        width 100%
        height 60px
        display flex
        justify-content space-between
        align-items center
        font-size: 14px;
        .item_img
          width 36px
          height 36px
          border-radius: 2px
        .name
          color rgba(55, 57, 61, 1)
          line-height 20px
          margin-left 5px
        .sum
          font-weight: 400
          color: rgba(55, 57, 61, 1)
          line-height: 20px
          margin-right 43px
        .price
          font-weight 500
          color rgba(55, 57, 61, 1)
          line-height 20px
    .money_list
      width 100%
      height 56px
      display flex
      align-items center
      justify-content space-between
      bottom-border-1px($main)
      font-size: 14px;
      font-family: PingFangSC-Regular;
      .name
        font-weight: 400;
        color: rgba(55, 57, 61, 1);
        line-height: 20px;
      .money
        font-weight: 500;
        color: rgba(238, 87, 74, 1);
        line-height: 20px;
      .all_money
        font-size 16px
      .all
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(236, 88, 79, 1);
        line-height: 22px;
</style>
