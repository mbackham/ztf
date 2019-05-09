<!--进行中订单详情页面-->
<template>
  <section class="detail_wrap" v-if="orderInfo">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div>
        <div class="order_state">
          <img src="../../../../static/images/icon_维修.png" alt="">
          <p class="name">服务方案已确认！</p>
          <div class="hint_msg">工程师正在施工过程中…</div>
          <div class="btn_wrap">
            <span @click="goSend">转争议</span>
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
          <img src="../../../../static/images/icon__联系.png" alt="" />
        </div>
        <AllOrderInfo :orderInfo="orderInfo"/>
        <ServerProject :orderInfo="orderInfo"/>
        <OrderCourse :orderCourse="orderCourse"/>
      </div>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import OrderCourse from '../../../components/OrderCourse/OrderCourse'
  import Starlet from '../../../components/Starlet/Starlet'
  import AllOrderInfo from '../../../components/AllOrderInfo/AllOrderInfo'
  import ServerProject from '../../../components/ServerProject/ServerProject'
  import {mapState} from 'vuex'
  export default {
    name: "BeingOrderDetail",
    data() {
      return {
        title: '订单详情',
        isShow: false,
        orderId: this.$route.query.id,//订单号
        orderCourse: null,
        orderInfo: {},
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
        this.$Indicator.close();
        const result = res.data;
        if (result.code === 200) {
          this.orderCourse = result.data;
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
      ServerProject,
      Starlet
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
      .state
        color: rgba(248, 162, 16, 1);
      .order_state
        width 100%
        padding 16px
        box-sizing border-box
        background #fff
        text-align: center
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
        .name
          color: rgba(112, 117, 127, 1);
        .type, .problem
          color: rgba(58, 61, 74, 1);
    .hint
      width 100%
      padding 0 16px
      box-sizing border-box
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(161, 167, 179, 1);
      line-height: 18px;
</style>
