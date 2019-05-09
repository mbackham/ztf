<!--我的非标准订单详情-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div>
        <div class="order_state">
          <img src="../../../../../static/images/icon_成功.png" alt="">
          <p class="name">预约服务定订单提交成功！</p>
          <div class="hint_msg">
            您已支付<span class="price">￥30</span>
            上门服务预约金，在服务工程师上门前还可退还，在支付全部服务费时可抵扣
            <span class="price">￥30</span>服务费
          </div>
        </div>
        <div class="outer_wrap">
          <div class="title">订单信息</div>
          <ul class="order_msg">
            <li class="item_msg">
              <span class="name">订单号</span>
              <span class="num">{{orderMes.orderId}}</span>
            </li>
            <li class="item_msg">
              <span class="name">订单状态</span>
              <span class="num" style="color:red">{{orderMes.orderStateName}}</span>
            </li>
            <li class="item_msg">
              <span class="name">服务类型</span>
              <span class="type">{{orderMes.orderTypeName}}</span>
            </li>
            <li class="item_msg">
              <span class="name">问题描述</span>
              <span class="problem">{{orderMes.orderRemark}}</span>
            </li>
          </ul>
        </div>
        <!-- <WaitOrderInfo>
          <span slot="state" class="state">待分配</span>
        </WaitOrderInfo> -->
        <!-- <OrderTime/> -->
        <div class="time_wrap">
          <div class="order_time">
            <img src="../../../../../static/images/icon_时间2.png" alt="">
            <span>预约上门时段</span>
          </div>
          <div class="start_end_time">
            <div class="start">
              <p>预约开始时间</p>
              <p class="time_num">{{orderMes.startTime}}</p>
            </div>
            <div class="end">
              <p>预约结束时间</p>
              <p class="time_num">{{orderMes.subscribeEndTime}}</p>
            </div>
          </div>
        </div>
        <div class="hint">提示：您的需求已经提交客服，正在为您匹配相应服务。请保持电话畅通，以便服务与您联系。</div>
        <!-- <OrderCourse/> -->
        <div class="order_course" v-if="orderCourse">
          <ul class="time_list">
            <li class="title">订单历程</li>
            <li class="time_item" v-for="(item,index) in orderCourse" :key="index">
              <div class="data">
                <span>{{item.createTime}}</span>
              </div>
              <div class="pwrap">
                <p class="pone">{{item.operName}}</p>
                <p class="ptwo">
                  {{item.remark}}
                  <!--<span class="money on">￥100</span>-->
                </p>
                <span class="dian"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  // import WaitOrderInfo from '../../../../components/WaitOrderInfo/WaitOrderInfo'
  // import OrderTime from '../../../../components/OrderTime/OrderTime'
  // import OrderCourse from '../../../../components/OrderCourse/OrderCourse'
  import {mapState} from 'vuex'
  export default {
    name: "MyOrder",
    data() {
      return {
        title: '我的非标准订单',
        orderNum:this.$route.query.Uid,
        orderMes:{},
        orderCourse:[]
      }
    },
    computed:{
      ...mapState(['_token'])
    },
    methods:{
      getOrderMes(){
        let _this=this;
        this.$axios.post(this.Url+'/api/order/getOrderDetail',{
          "data":this.orderNum ,
          "requestId": this.stamp
        },{
          headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
          }
        }).then((res)=>{
          this.orderMes=res.data.data
          console.log(res,78987979879)
          _this.$axios.post(this.Url+'/api/order/listOrderCourse',{
            "data": _this.orderNum,
            "requestId": _this.stamp
          },{
            headers:{
              'Content-Type':'application/json',
              'token':localStorage.getItem('token')
            }
          }).then((response)=>{
            console.log(response);
            _this.orderCourse=response.data.data
          })
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      }),
      this.getOrderMes()
    },
    components: {
      // WaitOrderInfo,
      // OrderTime,
      // OrderCourse,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"

  .detail_wrap
    width 100%
    height 100%
    position relative
    .scroll_wrap
      width 100%
      height 610px
      overflow hidden
      .state
        color:rgba(236,88,79,1);
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
          .price
            font-weight: 500;
            color: rgba(236, 88, 79, 1);
      .outer_wrap
              width 100%
              font-family: PingFangSC-Medium;
              background: rgba(255, 255, 255, 1);
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
              .order_msg
                width 100%
                padding-left 16px
                box-sizing border-box
                margin-bottom 8px
                .item_msg
                  width 100%
                  height 48px
                  display flex
                  align-items center
                  justify-content space-between
                  padding-right 16px
                  box-sizing border-box
                  font-size: 14px;
                  bottom-border-1px($main)
                  .name
                    color: rgba(112, 117, 127, 1);
                  .type, .problem
                    color: rgba(58, 61, 74, 1);
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
                        background-image url("../../../../../static/images/icon_大箭头.png")
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
      .order_course
                              width 100%
                              padding 0 16px 24px 16px
                              box-sizing border-box
                              background #fff
                              .time_list
                                position relative
                                .title
                                  margin-top 8px
                                  font-size: 16px;
                                  font-weight: 500;
                                  color: rgba(58, 61, 74, 1);
                                  line-height: 48px;
                                  width: 375px;
                                  height: 48px;
                                  bottom-border-1px($main)
                                .time_item
                                  width 100%
                                  display flex
                                  box-sizing border-box
                                  justify-content space-between
                                  font-family: PingFangSC-Regular
                                  margin-top 14px
                                  img
                                    margin 0 8px
                                    width 26px
                                    height 26px
                                  .data
                                    text-align right
                                    color #B0B6C2
                                    font-size: 14px;
                                    padding-left 20px
                                  .pwrap
                                    padding-left 15px
                                    box-sizing border-box
                                    color: #B0B6C2
                                    width 50%
                                    height 60px
                                    border-left 1px dashed $red
                                    position relative
                                    &.left
                                      border-left 1px solid #B0B6C2
                                    .pone
                                      font-size: 14px;
                                      line-height: 20px;
                                    .ptwo
                                      font-size: 12px;
                                      line-height: 16px;
                                      .money
                                        &.on
                                          color: $red
                                    .dian
                                      position absolute
                                      left 0
                                      top 0
                                      display inline-block
                                      width 14px
                                      height 14px
                                      border 4px solid $red
                                      box-sizing border-box
                                      transform translate(-50%,-100%)
                                      border-radius 50%
                                      &.on
                                        width 8px
                                        height 8px
                                        background:rgba(176,182,194,1);
                                        border none

      .hint
        width 100%
        padding 0 16px
        box-sizing border-box
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(161, 167, 179, 1);
        line-height: 18px;
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
      box-shadow: 0px 1px 0px 0px rgba(229, 234, 243, 1);
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
        box-shadow: 0px 1px 0px 0px rgba(229, 234, 243, 1);
</style>
