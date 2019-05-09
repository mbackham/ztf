<!--待支付订单详情页面-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div>
        <div class="order_state" v-if="orderInfo.orderStateName==='待支付预约费'">
          <img src="../../../../static/images/icon_付款.png" alt="">
          <p class="name">预约服务订单未支付！</p>
          <div class="hint_msg">
            您未支付
            <span class="price">￥30</span>
            上门服务预约金，在服务工程师上门前还可退还，在支付全部服务费时可抵扣
            <span class="price">￥30</span>服务费
          </div>
          <div class="btn_wrap">
            <span class="three" @click="cancle">取消订单</span>
            <span class="three redbor" @click="goPay">去支付</span>
          </div>
        </div>
        <div class="order_state" v-else>
          <img src="../../../../static/images/icon_付款.png" alt="">
          <p class="name">服务完成待支付！</p>
          <div class="btn_wrap">
            <span class="three" @click="goSend">转争议</span>
          </div>
        </div>
        <div class="user_info" v-show="orderInfo.engineerAvatar">
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
        <ServerProject :orderInfo="orderInfo"/>
        <OrderCourse :orderCourse="orderCourse"/>
      </div>
    </div>
    <div class="ft_btn" @click="goPay" v-if="orderInfo.orderStateName!=='待支付预约费'">确认支付</div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {Toast,Indicator} from 'mint-ui'
  import OrderCourse from '../../../components/OrderCourse/OrderCourse'
  import Starlet from '../../../components/Starlet/Starlet'
  import AllOrderInfo from '../../../components/AllOrderInfo/AllOrderInfo'
  import ServerProject from '../../../components/ServerProject/ServerProject'
  import {mapState} from 'vuex'
  export default {
    name: "DaiquerenOrderDetail",
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
      Indicator.open();
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
        Indicator.close()
        const result = res.data;
        if (result.code === 200) {
          this.orderInfo = result.data;
        }
      }).catch((err)=>{
        console.log(err)
        Indicator.close()
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
        Indicator.close();
        const result = res.data;
        if (result.code === 200) {
          this.orderCourse = result.data;
        }
      }).catch((err)=>{
        Indicator.close()
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
            Uid: this.orderId
          }
        })
      },
      //取消订单
      cancle() {
        const {orderId} = this;
        this.$axios.post(this.Url+'/api/order/cancelOrder', {
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
          Indicator.close()
          if (result.code === 200) {
            Toast('正在取消,请稍等~');
            setTimeout(() => {
              this.$router.push({
                path: 'canceled_orderdetail',
                query: {
                  id: this.orderId
                }
              })
            }, 3000)
          }
        }).catch((err)=>{
          console.log(err)
          Indicator.close()
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
      ServerProject
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .detail_wrap
    width 100%
    height 100%
    .scroll_wrap
      position: fixed;
      top: 64px;
      bottom 0
      left: 0;
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
            width: 130px;
            height: 32px;
            background: rgba(249, 251, 254, 1);
            border-radius: 2px;
            border: 1px solid #D7DBE3;
          .three
            width 130px
          .redbor
            border: 1px solid #EE5147
            color: rgba(238, 81, 71, 1);
            background: rgba(255, 255, 255, 1);
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
          width 375px
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
    .ft_btn
      width 100%
      height 50px
      position fixed
      bottom 0
      text-align: center
      background: rgba(238, 81, 71, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      line-height: 50px;
</style>
