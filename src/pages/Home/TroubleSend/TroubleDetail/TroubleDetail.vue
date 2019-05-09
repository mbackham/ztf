<!--故障申报详情页面-->
<template>
  <section class="trouble_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div>
        <ul class="send_wrap">
          <li class="item cause">
            <span class="name">申报原因</span>
            <span class="text">{{troMes.abnormalRemark}}</span>
          </li>
          <li class="item imgs">
            <img src="../../../../../static/images/商品.jpg" alt="">
            <img src="../../../../../static/images/商品图.jpg" alt="">
          </li>
        </ul>
        <div class="user_info">
          <div class="left_wrap">
            <img :src="`http://domch.cn/file-api/image/${troMes.engineerAvatar}`" class="touxiang">
            <div>
              <p class="user_name">{{troMes.engineerName}}</p>
              <div>
                <img src="../../../../../static/images/icon_全星.png" alt="">
                <img src="../../../../../static/images/icon_全星.png" alt="">
                <img src="../../../../../static/images/icon_全星.png" alt="">
                <img src="../../../../../static/images/icon_全星.png" alt="">
                <img src="../../../../../static/images/icon_半星.png" alt="">
                <span class="score">{{troMes.commResult}}</span>
              </div>
            </div>
          </div>
          <img src="../../../../../static/images/icon__联系.png" alt="">
        </div>
        <section class="outer_wrap">
          <div class="title">订单信息</div>
          <ul class="order_msg">
            <li class="item_msg">
              <span class="name">订单号</span>
              <span class="num">{{troMes.orderId}}</span>
            </li>
            <li class="item_msg">
              <span class="name">订单状态</span>
              <slot name="trouble" class="trou">{{troMes.orderStateName}}</slot>
            <li class="item_msg">
              <span class="name">服务类型</span>
              <span class="type" v-for="(item,index) in troMes.orderRequire" :key="index">{{item.cateName}}</span>
            </li>
            <li class="item_msg">
              <span class="name">服务项目</span>
              <span class="problem" v-for="(item,index) in troMes.orderRequire" :key="index">{{item.requireName}}</span>
            </li>
            <li class="item_msg">
              <span class="name">工程进行时间</span>
              <span class="problem">{{troMes.confirmTime}}</span>
            </li>
          </ul>
        </section>
        <ul class="server_list">
          <li class="title">
            <span>服务方案</span>
            <span class="see_more" @click="$router.push('/project_detail')">
              查看详情
              <img src="../../../../../static/images/icon_更多.png" alt="">
            </span>
          </li>
          <li class="things_item">
            <ul>
              <li class="outer_wrap" v-for="(item,index) in troMes.orderService" :key="index">
                <div>
                  <img  :src="`http://domch.cn/file-api/image/${item.prodImagePath}`" class="item_img">
                  <span class="name">{{item.prodName}}</span>
                </div>
                <div>
                  <span class="sum">{{item.prodNum}}</span>
                  <span class="price">￥{{item.unitPrice}}</span>
                </div>
              </li>
            </ul>
          </li>
          <li class="money_list">
            <span class="name">应付服务费</span>
            <span class="money">￥{{troMes.serviceFee}}</span>
          </li>
          <li class="money_list">
            <span>
              <img src="../../../../../static/images/icon_抵扣.png" alt="">
              <span>上门服务费抵扣</span>
            </span>
            <span class="money">￥{{troMes.subscribeFee}}</span>
          </li>
          <li class="money_list">
            <span class="all_money">合计</span>
            <span class="all">￥{{troMes.finalFee}}</span>
          </li>
        </ul>
        <OrderCourse/>
      </div>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import TroubleOrderInfo from '../../../../components/TroubleOrderInfo/TroubleOrderInfo'
  import OrderCourse from '../../../../components/OrderCourse/OrderCourse'

  export default {
    name: "TroubleDetail",
    data() {
      return {
        title: '故障申报',
        troMes:{}
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    },
    created(){
      this.troMes=this.$route.query.data
    },
    components: {
      TroubleOrderInfo,
      OrderCourse
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"
  .trouble_wrap
    width 100%
    height 100%
    .scroll_wrap
      width 100%
      height 620px
      .send_wrap
        width 100%
        padding-left 16px
        box-sizing border-box
        background: rgba(255, 255, 255, 1);
        .item
          bottom-border-1px($main)
          padding 13px 16px 13px 0
          box-sizing border-box
          width 100%
        .cause
          display flex
          justify-content space-between
          font-size: 16px;
          font-family: PingFangSC-Regular;
          .name
            color: rgba(112, 117, 127, 1);
            line-height: 22px;
          .text
            color: rgba(58, 61, 74, 1);
            line-height: 22px;
        .imgs
          img
            width: 56px;
            height: 56px;
            margin-right 5px
            border-radius: 2px;
      .user_info
        width 100%
        display flex
        justify-content space-between
        align-items center
        margin-top 8px
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
            font-size:14px;
            color:rgba(112,117,127,1);
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
        .trou
          color:rgba(236,88,79,1);
        .name
          color: rgba(112, 117, 127, 1);
        .type, .problem
          color: rgba(58, 61, 74, 1);
</style>
