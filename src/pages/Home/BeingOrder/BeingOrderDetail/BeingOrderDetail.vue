<!--处理中订单详情页面-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title">
      <img src="../../../../../static/images/icon_位置.png" slot="add" class="server_icon">
    </TopHeader>
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
          <li class="btn_wrap">
            <div class="btn one" @click="changeHtml">转为争议订单</div>
            <div class="btn two" @click="changeText">申请退单</div>
          </li>
        </ul>
        <div class="visit_wrap">
          <span class="text">上门费用</span>
          <span class="price">￥30</span>
        </div>
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
            <span class="all_money">合计</span>
            <span class="all">￥1200</span>
          </li>
          <li class="change_btn">
            <span @click="$router.push('/change_project')">变更</span>
          </li>
        </ul>
        <div class="order_course">
          <div class="title">备注</div>
          <textarea rows="10" placeholder="请输入您的需求"></textarea>
          <img src="../../../../../static/images/分组11.png" alt="">
          <p class="hint">140字以内</p>
        </div>
      </div>
    </div>
    <div class="ft_btn">确认提交</div>
    <Shade v-show="textShow"/>
    <TextInput :text="text" v-show="textShow" :textShow.sync="textShow"/>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import Shade from '../../../../components/Shade/Shade'

  export default {
    name: "WaitOrderDetail",
    data() {
      return {
        title: '订单详情',
        text: '争议申请',
        textShow: false
      }
    },
    methods: {
      changeText() {
        this.textShow = true;
        this.text = '退单申请';
      },
      changeHtml() {
        this.textShow = true;
        this.text = '争议申请';
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    },
    components: {
      Shade
    },
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
      height 563px
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
        .btn_wrap
          width 100%
          height 48px
          top-border-1px($main)
          display flex
          align-items center
          justify-content space-between
          font-size: 14px;
          font-family: PingFangSC-Regular;
          .btn
            width: 168px;
            height: 32px;
            line-height 32px
            text-align: center
            border-radius: 2px;
          .one
            box-sizing border-box
            background: rgba(249, 251, 254, 1);
            border: 1px solid #CACFD7;
          .two
            background: rgba(236, 88, 79, 1);
            color: rgba(255, 255, 255, 1);
      .visit_wrap
        width: 375px
        height: 56px
        background: rgba(255, 255, 255, 1)
        margin-bottom 8px
        padding 0 16px
        box-sizing border-box
        display flex
        align-items center
        justify-content space-between
        font-family: PingFangSC-Medium;
        .text
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          line-height: 22px;
          font-size 16px
        .price
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(236, 88, 79, 1);
          margin-right 6px
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
          .all_money
            font-size 16px
          .all
            font-size: 16px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(236, 88, 79, 1);
            line-height: 22px;
        .change_btn
          width 100%
          height 56px
          line-height 56px
          text-align: center
          span
            background $red
            display inline-block
            width: 168px;
            height: 32px;
            line-height 32px
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
      .order_course
        width 100%
        padding 0 16px 24px 16px
        box-sizing border-box
        background #fff
        position relative
        textarea
          border none
          width 100%
          height: 180px;
          background #EEF0F6
          padding 8px
          outline none
          font-size: 14px;
          font-family: PingFangSC-Regular;
          box-sizing border-box
          &::-webkit-input-placeholder /*Webkit browsers*/
            color: #999
        .hint
          text-align right
          margin-top 6px
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(144, 149, 159, 1);
          line-height: 17px;
        img
          position absolute
          bottom 56px
          left 24px
    .ft_btn
      width: 100%;
      height: 48px;
      text-align: center
      line-height 48px
      position fixed
      bottom 0
      background $red
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
</style>
