<!--已完成订单详情页面-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title">
      <img src="../../../../../static/images/icon_位置.png" slot="add" class="server_icon">
    </TopHeader>
    <div class="order_state" v-show="isShow">
      <div>
        <img src="../../../../../static/images/icon_16px_位置4.png" alt="">
        <span>施工方案已确认！</span>
      </div>
      <img src="../../../../../static/images/icon_取消.png" @click="isShow=false">
    </div>
    <div class="scroll_wrap">
      <div>
        <div class="order_num">
          <span>订单号  2018102111053</span>
          <span>服务方案待确认</span>
        </div>
        <div class="item_ft">
          <div>
            <div class="user_info">
              <span>李波</span>
              <span>18323412341</span>
            </div>
            <div class="address_wrap">
              <img src="../../../../../static/images/icon_16px_位置.png" alt="">
              <span>绿地新城D2 10楼 1002</span>
            </div>
          </div>
          <div class="imgWrap">
            <img src="../../../../../static/images/icon_24px_联系.png" alt="">
          </div>
        </div>
        <ul class="server_list">
          <li class="ser_item">
            <span class="name">服务类型</span>
            <span>维修家庭中路由器及网线问题</span>
          </li>
          <li class="ser_item">
            <span class="name">服务项目</span>
            <span>服务项目1/服务项目2/服务项目3</span>
          </li>
          <li class="time">
            <p>预约上门时间</p>
            <div>
              <img src="../../../../../static/images/icon_14px_时间.png" alt="">
              <span>2018-10-12 12:00</span> 至 <span>2018-10-13 12:00</span>
            </div>
          </li>
        </ul>
        <ul class="things_list">
          <li class="title">携带物料</li>
          <li class="things_item">
            <ul>
              <li class="outer_wrap">
                <div>
                  <img src="../../../../../static/images/商品.jpg" class="item_img">
                  <span class="name">尊享版网组</span>
                </div>
                <div>
                  <span class="sum">x1</span>
                  <span class="price">￥800</span>
                </div>
              </li>
              <li class="outer_wrap">
                <div>
                  <img src="../../../../../static/images/商品.jpg" class="item_img">
                  <span class="name">百兆路由器</span>
                </div>
                <div>
                  <span class="sum">x1</span>
                  <span class="price">￥800</span>
                </div>
              </li>
              <li class="outer_wrap">
                <div>
                  <img src="../../../../../static/images/商品.jpg" class="item_img">
                  <span class="name">ap面板</span>
                </div>
                <div>
                  <span class="sum">x1</span>
                  <span class="price">￥800</span>
                </div>
              </li>
            </ul>
          </li>
          <li class="money_list">
            <span class="name">应付服务费</span>
            <span class="money">￥1300</span>
          </li>
          <li class="money_list">
            <span>
              <img src="../../../../../static/images/矩形.png" alt="">
              <span>应付服务费</span>
            </span>
            <span class="money">-100</span>
          </li>
          <li class="money_list">
            <span class="all_money">实付金额</span>
            <span class="all">￥1200</span>
          </li>
        </ul>
        <div>
          <div class="order_course">
            <div class="title">订单历程</div>
            <ul class="time_list">
              <li class="time_item">
                <div class="data_hour">
                  <p class="date">10-08</p>
                  <p class="hour">21:30</p>
                </div>
                <img src="../../../../../static/images/icon_已支付.png" alt="">
                <div class="pwrap">
                  <p class="pone">客户支付上门预约金</p>
                  <p class="ptwo">
                    客户支付已支付上门预约金
                    <span class="money on">￥100</span>
                  </p>
                </div>
              </li>
              <li class="time_item">
                <div class="data_hour">
                  <p class="date">10-07</p>
                  <p class="hour">21:30</p>
                </div>
                <img src="../../../../../static/images/icon_未支付.png" alt="">
                <div class="pwrap">
                  <p class="pone">客户支付上门预约金</p>
                  <p class="ptwo">
                    客户支付已支付上门预约金
                    <span class="money">￥100</span>
                  </p>
                </div>
              </li>
              <li class="time_item">
                <div class="data_hour">
                  <p class="date">10-06</p>
                  <p class="hour">21:30</p>
                </div>
                <img src="../../../../../static/images/icon_待处理_未完成.png" alt="">
                <div class="pwrap">
                  <p class="pone">待处理</p>
                  <p class="ptwo">
                    您已接下订单，请及时处理
                    <span class="money">￥100</span>
                  </p>
                </div>
              </li>
              <li class="line line_one on"></li>
              <li class="line line_two"></li>
            </ul>
          </div>
          <div class="rating_wrap">
            <div class="title">用户评价</div>
            <div class="rating_hd">
              <img src="../../../../../static/images/icon_好评.png" alt="">
              <p>服务非常好，网线马上就能用了，谢谢</p>
            </div>
            <ul class="star_list">
              <li class="star_item">
                <div class="name">仪容仪表</div>
                <div>
                <span>
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px_星星_未选中.png" alt="">
                </span>
                  <span class="score">4.6</span>
                </div>
              </li>
              <li class="star_item">
                <div class="name">文明用语</div>
                <div>
                <span>
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px_星星_未选中.png" alt="">
                </span>
                  <span class="score">4.6</span>
                </div>
              </li>
              <li class="star_item">
                <div class="name">准时上门</div>
                <div>
                 <span>
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px_星星_未选中.png" alt="">
                </span>
                  <span class="score">4.6</span>
                </div>
              </li>
              <li class="star_item">
                <div class="name">服务态度</div>
                <div>
                <span>
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px_星星_未选中.png" alt="">
                </span>
                  <span class="score">4.6</span>
                </div>
              </li>
              <li class="star_item">
                <div class="name">是否满足客户需求</div>
                <div>
                <span>
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px星星.png" alt="">
                  <img src="../../../../../static/images/icon_16px_星星_未选中.png" alt="">
                </span>
                  <span class="score">4.6</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "WaitOrderDetail",
    data() {
      return {
        title: '订单详情',
        isShow: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"
  .detail_wrap
    width 100%
    height 100%
    .order_state
      width 100%
      height 40px
      background #D5F1E7
      padding 0 16px
      box-sizing border-box
      display flex
      align-items center
      justify-content space-between
      span
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(46, 183, 136, 1);
        line-height: 20px;
    .scroll_wrap
      width 100%
      height 603px
      overflow hidden
      .title
        width 100%
        height 56px
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(58, 61, 74, 1);
        line-height: 56px;
        bottom-border-1px($main)
      .order_num
        width 100%
        height 60px
        background url("../../../../../static/images/订单详情背景.png")
        display flex
        align-items center
        justify-content space-between
        padding 0 16px
        box-sizing border-box
        span
          font-size: 14px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
      .item_ft
        width 100%
        height 82px
        box-sizing border-box
        padding 0 16px
        color: rgba(58, 61, 74, 1);
        display flex
        justify-content space-between
        font-family: PingFangSC-Regular;
        background #fff
        bottom-border-1px($main)
        .user_info
          margin-top 16px
          span
            font-size: 16px;
            font-weight: 400;
            color: rgba(58, 61, 74, 1);
            line-height: 22px;
        .address_wrap
          margin-top 8px
          span
            font-size: 14px;
            font-weight: 400;
            color: rgba(112, 117, 127, 1);
            line-height: 20px;
        .imgWrap
          width 54px
          height 32px
          text-align right
          line-height 32px
          margin-top 20px
          border-left 1px solid $main
      .server_list
        width 100%
        box-sizing border-box
        padding 0 16px
        background #fff
        font-family: PingFangSC-Regular;
        margin-bottom 8px
        .ser_item
          width 100%
          height 48px
          display flex
          align-items center
          justify-content space-between
          bottom-border-1px($main)
          span
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(55, 57, 61, 1);
            line-height: 20px;
          .name
            color: rgba(112, 117, 127, 1);
        .time
          width 100%
          height 82px
          padding 16px 0
          box-sizing border-box
          p
            font-size: 16px;
            font-weight: 400;
            color: rgba(58, 61, 74, 1);
            line-height: 22px;
            margin-bottom 8px
          span
            font-size: 14px;
            color: rgba(112, 117, 127, 1);
            line-height: 20px;
      .things_list
        width 100%
        padding 0 16px
        box-sizing border-box
        background #fff
        margin-bottom 8px
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
      .order_course
        width 100%
        padding 0 16px 24px 16px
        box-sizing border-box
        background #fff
        .time_list
          position relative
          .time_item
            width 100%
            display flex
            padding 19px 0 16px
            font-family: PingFangSC-Regular;
            img
              margin 0 8px
              width 26px
              height 26px
            .data_hour
              text-align right
              color #B0B6C2
              .date
                font-size: 14px;
                line-height: 20px;
              .hour
                font-size: 12px;
                line-height: 16px;
            .pwrap
              color: #B0B6C2
              .pone
                font-size: 14px;
                line-height: 20px;
              .ptwo
                font-size: 12px;
                line-height: 16px;
                .money
                  &.on
                    color: $red
          .line
            height 45px
            transform scaleX(0.5)
            border 1px solid #B0B6C2
            &.on
              border 1px dashed $red
          .line_one
            position absolute
            top 42px
            left 59px
          .line_two
            position absolute
            top 115px
            left 59px
      .rating_wrap
        width 100%
        padding 0 16px 24px 16px
        box-sizing border-box
        background #fff
        padding-bottom 23px
        .rating_hd
          text-align: center
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(55, 57, 61, 1);
          line-height: 20px;
          padding-bottom 24px
          img
            margin 16px 0 14px
        .star_list
          width 100%
          height 275px
          padding 0 24px
          box-sizing border-box
          background: rgba(255, 255, 255, 1);
          .star_item
            width 100%
            height 54px
            display flex
            align-items center
            justify-content space-between
            .name
              font-size: 16px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(58, 61, 74, 1);
              line-height: 22px;
            .score
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(92, 97, 111, 1);
              line-height: 17px;
            .blank
              width 100%
              height 40px
              background #fff
</style>
