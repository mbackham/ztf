<!--确定时间订单详情页面-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div>
        <!--上门服务时间确认-->
        <div class="order_state">
          <img src="../../../../static/images/icon_时间1.png" alt="">
          <div v-if="changeTime">
            <p class="name">上门服务时间确认！</p>
            <div class="hint_msg">
              服务工程师将于
              <span class="price">{{orderInfo.abnormalCreateTime}}</span>
              进行上门服务，您是否同意？
            </div>
            <div class="btn_wrap">
              <span class="three" @click="goBack">退 单</span>
              <span class="three" @click="openPicker">更改时间</span>
              <span class="three redbor" @click="hadPlan">同 意</span>
            </div>
          </div>
          <div v-else>
            <p class="name">您已更改上门时间</p>
            <div class="hint_msg">
              服务工程师将于
              <span class="price">{{pickerValue}}</span>
              进行上门服务
            </div>
          </div>
        </div>
        <div class="user_info" v-if="orderInfo.engineerAvatar">
          <div class="left_wrap">
            <img :src="`http://domch.cn/file-api/image/${orderInfo.engineerAvatar}`" class="touxiang">
            <div>
              <p class="user_name">{{orderInfo.engineerName}}</p>
              <Starlet :score=orderInfo.totalScore />
            </div>
          </div>
          <img src="../../../../static/images/icon__联系.png" alt="">
        </div>
        <AllOrderInfo :orderInfo="orderInfo"/>
        <div class="time_wrap">
          <div class="order_time">
            <img src="../../../../static/images/icon_时间2.png" alt="">
            <span>预约上门时间</span>
          </div>
          <div class="start_end_time">
            <div class="start">
              <p>预约开始时间</p>
              <p class="time_num">
                {{orderInfo.startTime}}
              </p>
            </div>
            <div class="end">
              <p>预约结束时间</p>
              <p class="time_num">
                {{orderInfo.endTime}}
              </p>
            </div>
          </div>
        </div>
        <OrderCourse :orderCourse="orderCourse"/>
      </div>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="datetime"
      :startDate="new Date()"
      month-format="{value} 月"
      date-format="{value} 日"
      hour-format="{value} 时"
      minuteFormat="{value} 分"
      @confirm="handleConfirm"
      v-model="pickerValue">
    </mt-datetime-picker>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import OrderCourse from '../../../components/OrderCourse/OrderCourse'
  import Starlet from '../../../components/Starlet/Starlet'
  import AllOrderInfo from '../../../components/AllOrderInfo/AllOrderInfo'
  import {mapState} from 'vuex'
  export default {
    name: "TimeOrderDetail",
    data() {
      return {
        title: '订单详情',
        pickerValue: '',
        changeTime: true,
        showOne: true,
        showTwo: true,
        showThree: true,
        orderId: this.$route.query.id,//订单号
        orderInfo: {},//订单详情列表
        orderCourse: null,//订单历程
      }
    },
    computed:{
      ...mapState(['_token'])
    },
    created() {
      this.$Indicator.open();
      //获取订单详情的请求
      const {orderId} = this;
      this.$axios.post(this.Url+'/api/order/getOrderDetail', {
          "data": orderId,
          "requestId":this.stamp,
        },
        {
          headers: {
            "token":localStorage.getItem('token')
          }
        }
      ).then(res => {
        this.$Indicator.close();
        const result = res.data;
        if (result.code === 200) {
          this.orderInfo = result.data;
        }
      }).catch((err)=>{
        this.$Indicator.close();
        console.log(err)
      });

      //获取订单历程的请求
      this.$axios.post(this.Url+'/api/order/listOrderCourse', {
          "data": orderId,
          "requestId": this.stamp,
        },
        {
          headers: {
            "token":localStorage.getItem('token')
          }
        }
      ).then(res => {
        const result = res.data;
        this.$Indicator.close();
        if (result.code === 200) {
          this.orderCourse = result.data;
        }
      }).catch((err)=>{
        this.$Indicator.close();
        console.log(err)
      });

    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
      },
      //用户同意上门时间
      hadPlan() {
        const {orderId} = this;
        this.$axios.post(this.Url+'/api/order/confrimVisit', {
            "data": orderId,
            "requestId": this.stamp,
          },
          {
            headers: {
              "token":localStorage.getItem('token')
            }
          }
        ).then(res => {
          const result = res.data;
          if (result.code === 200) {
            console.log(result);
          }
        });
      },
      //退单
      goBack() {
        this.$router.push({
          path: '/charge_back',
          query: {
            orderInfo: this.orderInfo
          }
        })
      },
      handleConfirm() {
        const d = this.pickerValue;
        this.pickerValue = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':00'
        const {orderId} = this;
        this.$axios.post(this.Url+'/api/order/modSubscribeTime', {
            "data": {
              "orderId": orderId,
              "subscribeTime": this.pickerValue
            },
            "requestId": this.stamp,
          },
          {
            headers: {
              "token":localStorage.getItem('token')
            }
          }
        ).then(res => {
          const result = res.data;
          if (result.code === 200) {
            this.changeTime = false
          }
        });
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
      OrderCourse,
      Starlet,
      AllOrderInfo,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .detail_wrap
    width 100%
    height 100%
    position relative
    .scroll_wrap
      position: fixed;
      top: 64px;
      left: 0;
      bottom 0
      width: 100%;
      overflow: hidden;
      .state
        color: rgba(236, 88, 79, 1);
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
          .user_name
            font-size: 14px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(58, 61, 74, 1);
            line-height: 20px;
            margin-bottom 3px
      .time_wrap
        width 100%
        background-color rgba(255, 255, 255, 1)
        .order_time
          width 100%
          height 48px
          line-height 48px
          padding 0 17px
          box-sizing border-box
          bottom-border-1px(#E5EAF3)
          span
            margin-left 4px
            font-size 16px
            font-family PingFangSC-Medium
            font-weight 500
            color rgba(58, 61, 74, 1)
            line-height 22px
        .start_end_time
          width 100%
          height 56px
          display flex
          margin-bottom 8px
          background-image url("../../../../static/images/icon_大箭头.png")
          background-repeat no-repeat
          background-position 50%
          box-shadow 0 0 0 0 rgba(229, 234, 243, 1)
          .start, .end
            width 50%
            line-height 28px
            p
              text-align center
              font-size 16px
              font-family PingFangSC-Regular
              font-weight 400
              color rgba(161, 167, 179, 1)
            .time_num
              font-weight 600
              color rgba(236, 88, 79, 1)
              line-height 22px
        .change_time
          width 100%
          height 56px
          line-height 56px
          text-align center
          font-size 16px
          font-family PingFangSC-Regular
          font-weight 600
          color rgba(236, 88, 79, 1)
      .order_state
        width 100%
        padding 16px
        box-sizing border-box
        background #fff
        text-align: center
        margin-bottom 8px
        .name
          margin 16px 0 8px
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          line-height: 22px;
        .hint_msg
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(112, 117, 127, 1);
          line-height: 22px;
          .price
            font-weight: 500;
            color: rgba(236, 88, 79, 1);
        .btn_wrap
          margin-top 16px
          span
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(112, 117, 127, 1);
            text-align: center
            line-height 32px
            display inline-block
            width: 100px;
            height: 32px;
            background: rgba(249, 251, 254, 1);
            border-radius: 2px;
            border: 1px solid #D7DBE3;
          .three
            width 100px
          .redbor
            border: 1px solid #EE5147
            color: rgba(238, 81, 71, 1);
            background: rgba(255, 255, 255, 1);
</style>
