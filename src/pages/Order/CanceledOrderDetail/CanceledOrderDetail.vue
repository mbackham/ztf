<!--已取消订单详情页面-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div>
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
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import OrderCourse from '../../../components/OrderCourse/OrderCourse'
  import AllOrderInfo from '../../../components/AllOrderInfo/AllOrderInfo'
  import {mapState} from 'vuex'
  export default {
    name: "CanceledOrderDetail",
    data() {
      return {
        title: '订单详情',
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
          "requestId": this.stamp,
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
          "requestId": new Date().getTime(),
        },
        {
          headers: {
            "token":localStorage.getItem('token')
          }
        }
      ).then(res => {
        const result = res.data;
        if (result.code === 200) {
          this.orderCourse = result.data;
          this.$Indicator.close()
        }
      }).catch((err)=>{
        this.$Indicator.close();
        console.log(err)
      });

    },
    methods: {
      goSend() {
        this.$router.push({
          path: '/submit_trouble',
          query: {orderInfo: this.orderInfo}
        })
      },
      goPay() {
        this.$router.push({
          path: 'pay_page',
          query: {
            id: this.orderId
          }
        })
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
      bottom 0
      left: 0;
      width: 100%;
      overflow: hidden;
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
</style>
