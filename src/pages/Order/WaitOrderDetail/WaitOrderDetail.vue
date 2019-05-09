<!--待分配订单详情页面-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div>
        <!--预约服务订单提交成功-->
        <div class="order_state">
          <img src="../../../../static/images/icon_成功.png" alt="">
          <p class="name">预约服务定订单提交成功！</p>
          <div class="hint_msg">
            您已支付<span class="price">￥30</span>
            上门服务预约金，在服务工程师上门前还可退还，在支付全部服务费时可抵扣
            <span class="price">￥30</span>服务费
          </div>
          <div class="btn_wrap">
            <span @click="urgeOrder">催 单</span>
            <span @click="cancle">取消订单</span>
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
        <ul class="order_msg">
          <li class="title">订单信息</li>
          <li class="item_msg">
            <span class="name">订单号</span>
            <span class="num">{{orderInfo.orderId}}</span>
          </li>
          <li class="item_msg">
            <span class="name">订单状态</span>
            <span class="state">{{orderInfo.orderStateName}}</span>
          </li>
          <li class="item_msg">
            <span class="name">服务类型</span>
            <span class="type">{{orderInfo.orderRequire[0].requireName}}</span>
          </li>
          <li class="item_msg">
            <span class="name">问题描述</span>
            <span class="problem">{{orderInfo.csServiceDesc}}</span>
          </li>
        </ul>
        <div class="time_wrap">
          <div class="order_time">
            <img src="../../../../static/images/icon_时间2.png" alt="">
            <span>预约上门时段</span>
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
        <div class="hint">提示：您的需求已经提交客服，正在为您匹配相应服务。请保持电话畅通，以便服务与您联系。</div>
        <OrderCourse :orderCourse="orderCourse"/>
      </div>
    </div>
    <Shade v-show="popupShow"/>
    <div class="popup" v-show="popupShow">
      <img src="../../../../static/images/icon_弹窗_完成.png" alt="">
      <p class="yes">催单成功 !</p>
      <p class="wait">服务工程师已经接到了您的催单信息，将尽快为您服务~</p>
      <div class="ft_btn" @click="popupShow=false">确定</div>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import OrderCourse from '../../../components/OrderCourse/OrderCourse'
  import Shade from '../../../components/Shade/Shade'
  import Starlet from '../../../components/Starlet/Starlet'
  import {Toast,Indicator} from 'mint-ui';
  import {mapState} from 'vuex'
  export default {
    name: "WaitOrderDetail",
    data() {
      return {
        title: '订单详情',
        orderId: this.$route.query.id,//订单号
        orderInfo: [],//订单详情列表
        orderCourse: null,//订单历程
        popupShow: false,//弹窗切换显示、隐藏
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
          this.orderInfo = result.data;
        }
        Indicator.close()
      }).catch((err)=>{
        Indicator.close()
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
        Indicator.close()
        const result = res.data;
        if (result.code === 200) {
          this.orderCourse = result.data;
        }
      }).catch((err)=>{
        Indicator.close()
      });

    },
    methods: {
      urgeOrder() {
        const {orderInfo} = this;
        const orderId = orderInfo.orderId;
        this.$axios.post(this.Url+'/api/order/urgeOrder', {
            "data": orderId,
            "requestId":this.stamp,
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
            this.popupShow = true
          } else {
            Toast({
              message: result.message,
              duration: 2000
            })
          }
        }).catch((err)=>{
          Indicator.close();
          console.log(err)
        })
      },
      //取消订单
      cancle() {
        Indicator.open()
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
          console.log(res)
          Indicator.close()
          const result = res.data;
          if (result.code === 200) {
            Toast('正在取消,请稍等~');
            setTimeout(() => {
              this.$router.replace({
                path: 'canceled_orderdetail',
                query: {
                  id: this.orderId
                }
              })
            }, 2000)
          }
        }).catch((err)=>{
          Indicator.close();
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
      Shade,
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
            width 100px
          .redbor
            border: 1px solid #EE5147
            color: rgba(238, 81, 71, 1);
            background: rgba(255, 255, 255, 1);
      .order_msg
        width 100%
        margin-bottom 8px
        background #fff
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
        .item_msg
          width 100%
          height 48px
          display flex
          padding-left 16px
          box-sizing border-box
          align-items center
          justify-content space-between
          padding-right 16px
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
