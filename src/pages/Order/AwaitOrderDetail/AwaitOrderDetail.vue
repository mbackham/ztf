<!--待施工订单详情页面-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div>
        <!--已安排工程师-->
        <div class="order_state">
          <img src="../../../../static/images/icon_成功.png" alt="">
          <p class="name">已安排工程师！</p>
          <div class="hint_msg">
            工程师将于
            <span class="price">{{orderInfo.startTime}}</span>
            上门服务
          </div>
          <div class="btn_wrap">
            <span class="three" @click="goBack">申请退单</span>
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
    name: "WaitOrderDetail",
    data() {
      return {
        title: '订单详情',
        showOne: true,
        showTwo: true,
        showThree: true,
        orderId: this.$route.query.id,//订单号
        orderInfo: {},//订单详情列表
        orderCourse: null,//订单历程
      }
    },
    methods: {
      goBack() {
        this.$router.push({
          path: '/charge_back',
          query: {
            orderInfo: this.orderInfo
          }
        })
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
          this.$Indicator.close()
        }
      }).catch((err)=>{
        this.$Indicator.close();
        console.log(err)
      });

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
    position relative
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
            width 100px
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
    .popup
      width: 311px;
      height: 250px;
      padding: 24px 16px 0
      box-sizing border-box
      position absolute
      top 50%
      left 50%
      z-index 1000
      transform translate(-50%, -50%)
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 1px 0 0 rgba(229, 234, 243, 1);
      text-align: center
      font-family: PingFangSC-Medium;
      .yes
        font-size: 16px;
        font-weight: 500;
        color: rgba(58, 61, 74, 1);
        line-height: 22px;
        margin-bottom 8px
      .wait
        font-size: 14px;
        color: rgba(112, 117, 127, 1);
        line-height: 21px;
      .ft_btn
        width 100%
        height: 48px;
        top-border-1px($main)
        font-size: 16px;
        text-align: center
        line-height 48px
        position absolute
        bottom 0
        left 0
        color: rgba(236, 88, 79, 1);
        box-shadow: 0 1px 0 0 rgba(229, 234, 243, 1);
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
