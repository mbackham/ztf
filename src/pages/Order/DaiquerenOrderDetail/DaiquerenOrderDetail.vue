<!--服务方案待确认订单详情页面-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div>
        <div class="order_state">
          <img src="../../../../static/images/icon_确认.png" alt="">
          <p class="name">服务方案待确认！</p>
          <div class="hint_msg">
            服务工程师为您制定了一份服务方案，您是是否同意使用此方案并施工？
          </div>
          <div class="btn_wrap">
            <span class="three" @click="goBack">申请退单</span>
            <span class="three" @click="goSend">转争议</span>
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
        <AllOrderInfo :orderInfo="orderInfo" />
        <ServerProject :orderInfo="orderInfo" />
        <OrderCourse :orderCourse="orderCourse" />
      </div>
    </div>
    <div class="ft_btn">
      <div class="noagreen">不同意</div>
      <div class="agreen" @click="agreen">同意</div>
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
  import {Toast} from 'mint-ui'
  export default {
    name: "DaiquerenOrderDetail",
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
      goBack() {
        this.$router.push({
          path: '/charge_back',
          query: {
            orderInfo: this.orderInfo
          }
        })
      },
      //客户同意服务方案
      agreen(){
        this.$Indicator.open();
        const {orderId} = this;
        this.$axios.post(this.Url+'/api/order/agreeOrderService', {
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
            Toast('已同意当前方案')
          }
        }).catch((err)=>{
          this.$Indicator.close();
          console.log(err)
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
      position fixed
      bottom 0
      width 100%
      height 50px
      display flex
      .noagreen,.agreen
        width 50%
        height 100%
        text-align: center
        line-height 50px
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
      .noagreen
        background:rgba(51,57,75,1);
      .agreen
        background:rgba(238,81,71,1);
</style>
