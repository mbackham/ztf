<!--待处理订单详情页面-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title">
      <img src="../../../../../static/images/icon_位置.png" slot="add" class="server_icon">
    </TopHeader>
    <div class="scroll_wrap">
      <div>
        <div class="order_num">
          <div class="outer">
            <span>订单号  2018102111053</span>
            <span>待预约</span>
          </div>
          <p>维修家庭中路由器及网线问题</p>
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
          <li class="time">
            <p>预约上门时间</p>
            <div>
              <img src="../../../../../static/images/icon_14px_时间.png" alt="">
              <span @click="isStartShow=true">
                {{endHours ? startMonth+'-'+startDay+'-'+startHours:'请选择上门时间段'}}
              </span>
              <span class="blank">至</span>
              <span @click="isEndShow=true">
                {{endHours ? endMonth+'-'+endDay+'-'+endHours:'请选择上门时间段'}}
              </span>
            </div>
          </li>
          <li class="btn_wrap">
            <div class="btn one" @click="textShow=true">转为失联订单</div>
            <div class="btn two" @click="isStartShow=true">确认上门时间</div>
          </li>
        </ul>
        <div class="visit_wrap">
          <div class="text">上门费用</div>
          <div>
            <span class="price">￥100</span>
            <span class="change">变更</span>
          </div>
        </div>
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
      </div>
    </div>
    <Shade v-show="isStartShow||isEndShow||textShow"/>
    <div class="selection" v-show="isStartShow">
      <div class="header">
        <img src="../../../../../static/images/icon_取消7.png" @click="isStartShow=false">
        <span class="cheeck_btn">确认上门时间</span>
        <span class="make_sure" @click="change">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onStartValuesChange"></mt-picker>
    </div>
    <div class="selection" v-show="isEndShow">
      <div class="header">
        <img src="../../../../../static/images/icon_取消7.png" @click="isEndShow=false">
        <span class="cheeck_btn">确认上门时间</span>
        <span class="make_sure" @click="isEndShow=false">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onEndValuesChange"></mt-picker>
    </div>
    <TextInput :text="text" v-show="textShow" :textShow.sync="textShow"/>
  </section>
</template>

<script>
  //import BScroll from 'better-scroll'
  import Shade from '../../../../components/Shade/Shade'
import user from "@/api/model/user";
  export default {
    name: "WaitOrderDetail",
    data() {
      return {
        title: '订单详情',
        text: '失联申请',
        textShow: false,
        isStartShow: false,
        isEndShow: false,
        startMonth: '',
        startDay: '',
        startHours: '',
        endMonth: '',
        endDay: '',
        endHours: '',
        slots: [
          {
            flex: 1,
            values: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            className: 'slot1',
            textAlign: 'center'
          },
          {
            flex: 1,
            values: ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            className: 'slot1',
            textAlign: 'center'
          },
          {
            flex: 1,
            values: ['', '00 : 00', '01 : 00', '02 : 00', '03 : 00', '04 : 00', '05 : 00', '06 : 00', '07 : 00', '08 : 00', '09 : 00', '10 : 00', '11 : 00', '12 : 00', '13 : 00', '14 : 00', '15 : 00', '16 : 00', '17 : 00', '18 : 00', '19 : 00', '20 : 00', '21 : 00', '22 : 00', '23 : 00',],
            className: 'slot3',
            textAlign: 'center'
          }
        ]
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    },
    methods: {
      onStartValuesChange(picker, values) {
        this.startMonth = values[0];
        this.startDay = values[1];
        this.startHours = values[2];
      },
      onEndValuesChange(picker, values) {
        this.endMonth = values[0];
        this.endDay = values[1];
        this.endHours = values[2];
      },
      change() {
        this.isStartShow = false;
        this.isEndShow = true
      }
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
        height 94px
        background url("../../../../../static/images/订单详情背景.png")
        padding 20px 16px
        box-sizing border-box
        .outer
          display flex
          align-items center
          justify-content space-between
          span
            font-size: 14px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 20px;
        p
          margin-top 10px
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
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
            line-height 30px
          .blank
            margin 0 15px
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
        .change
          display inline-block
          width: 80px;
          height: 32px;
          line-height 32px
          text-align: center
          background: rgba(249, 251, 254, 1);
          border-radius: 2px;
          font-size 14px
          color: rgba(112, 117, 127, 1);
          border: 1px solid #CACFD7;
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
    .selection
      width 100%
      height 280px
      position fixed
      bottom 0
      z-index 100
      background rgba(255, 255, 255, 1)
      .header
        height 52px
        padding 0 16px
        font-size 16px
        display flex
        justify-content space-between
        align-items center
        bottom-border-1px(#E5EAF3)
        img, span
          vertical-align middle
        .cheeck_btn
          font-family PingFangSC-Medium
          font-weight 500
          color rgba(58, 61, 74, 1)
          line-height 22px
        .make_sure
          font-family PingFangSC-Regular
          font-weight 400
          color rgba(236, 88, 79, 1)
          line-height 22px
</style>
