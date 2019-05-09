<!--订单页面-->
<template>
  <section class="order_wrap">
    <div class="header">{{title}}</div>
    <ul class="nav_list">
      <li :class="{on: num===0}" @click="getOrder(0)">全部</li>
      <li :class="{on: num===1}" @click="getOrder(1)">待分配</li>
      <li :class="{on: num===2}" @click="getOrder(2)">进行中</li>
      <li :class="{on: num===5}" @click="getOrder(3)">已完成</li>
    </ul>
    <div class="scroll_wrap">
      <div class="inner">
        <div class="top-tip">{{topTip}}</div>
        <ul class="order_list">
          <li class="order_item" v-for="(item ,index) in orderList" :key="index"
              @click="goWhich(item.orderStateName,item.orderId)">
            <div class="order_wrap">
              <div>
                <span class="order_text">订单号</span>
                <span class="order_num">{{item.orderId}}</span>
              </div>
              <div class="order_btn" :class="changeClass(item.orderStateName)">{{item.orderStateName}}</div>
            </div>
            <p class="fault_title">{{item.orderRequire[0].cateName?item.orderRequire[0].cateName:"其他"}}</p>
            <div class="server_type">
              <span>服务类型</span>
              <span>{{item.orderRequire[0].requireName}}</span>
            </div>
            <div class="finish_time">
              <span>提交时间</span>
              <span>{{item.createTime}}</span>
            </div>
          </li>
        </ul>
        <div class="bottom-tip" v-show="orderList.length>3">{{bottomTip}}</div>
      </div>
      <div class="no_data" v-show="isDataOrder">暂无订单数据</div>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {Toast, Indicator} from 'mint-ui'
  import {mapState} from 'vuex'
  import user from "@/api/user"
  export default {
    name: "Order",
    data() {
      return {
        title: '我的订单',
        topTip: '下拉刷新',
        bottomTip: '查看更多',
        num: 0,
        pageNum: 1,
        isLoading: false,
        orderList: [],
        isDataOrder: false
      }
    },
    watch: {
      orderList(val) {
        if (val.length < 1) {
          this.isDataOrder = true;
        } else {
          this.isDataOrder = false;
        }
      }
    },
    computed: {
      ...mapState(['_token'])
    },
    mounted() {
      this.allOrder(this.pageNum, 10).then(res => {
        const result = res;
        if (result.code === 200) {
          this.orderList = result.data.list;
          this._initScroll();
          Indicator.close();
        }
      }).catch((err) => {
        console.log(err);
        Indicator.close();
      });
    },
    methods: {
      //改变状态框的背景色
      changeClass(s) {
        if (s === '待分配') {
          return 'pink';
        } else if (s === '施工中' || s === '变更方案待确认') {
          return 'yellow';
        } else if (s === '已完成' || s === '待结算' || s === '已取消') {
          return 'green';
        }
      },
      //跳转页面
      goWhich(s, orderId) {
        //#endregion
        if (s === '待分配') {
           this.$router.push({path: '/wait_detail', query: {id: orderId}});
        } else if (s === '待施工' || s === '确认上门') {
           this.$router.push({path: '/await_orderdetail', query: {id: orderId}});
        } else if (s === '服务方案待确认' || s === '变更方案待确认') {
           this.$router.push({path: '/daiqueren_orderdetail', query: {id: orderId}});
        } else if (s === '时间待确认') {
           this.$router.push({path: '/time_orderdetail', query: {id: orderId}});
        } else if (s === '施工中') {
           this.$router.push({path: '/being_detail', query: {id: orderId}});
        } else if (s === '已完成') {
           this.$router.push({path: '/finish_detail', query: {id:orderId}});
        } else if (s === '已取消' || s === '退单订单') {
           this.$router.push({path: '/canceled_orderdetail', query: {id: orderId}});
        } else if (s === '待结算' || s === '待支付预约费') {
           this.$router.push({path: '/waitpay_orderdetail', query: {id: orderId}});
        } else {
           this.$router.push({path: '/canceled_orderdetail', query: {id: orderId}});
        }
      },
      //获取订单的请求
      allOrder(page, size) {
        Indicator.open();
        const {num} = this;
         return user.pageMemOrder({
            "data": {
              "data": {
                "orderCateState": num,
                "orderId": "", "querySort": [], "queryText": ""
  
              },
              "pageNum": page,
              "pageSize": size
            },
            "requestId": this.stamp
          },)
          //this.$axios.post(this.Url + '/api/order/pageMemOrder',
        //   {
        //     "data": {
        //       "data": {
        //         "orderCateState": num,
        //         "orderId": "", "querySort": [], "queryText": ""
  
        //       },
        //       "pageNum": page,
        //       "pageSize": size
        //     },
        //     "requestId": this.stamp
        //   },
        //   {
        //     headers: {
        //       "token":  localStorage.getItem('token')
        //     }
        //   }
        // )
      },
      //获取订单列表的方法
      getOrder(n) {
        this.num = n;
        this.pageNum=1;
        this.allOrder(this.pageNum,10).then(res => {
          const result = res;
          console.log(result)
          if (result.code === 200) {
            this.orderList = result.data.list;
            this._initScroll();
            Indicator.close();
          }else{
            Toast(result.message)
            Indicator.close();
          }
        }).catch((err) => {
          console.log(err);
          Indicator.close();
        });
      },
      //初始化滚动
      _initScroll() {
        this.$nextTick(() => {
          if (!this.myScroll) {
            this.myScroll = new BScroll('.scroll_wrap', {
              probeType: 1,
              pullUpLoad: {
                threshold: -50, // 当上拉到超过底部 50px 时，
              },
            });
            this.myScroll.on('scroll', position => {
              if (position.y > 50) {
                this.topTip = '释放立即刷新'
              }
            });
            this.myScroll.on('touchEnd', position => {
              if (position.y > 50) {
                this.allOrder(1, 10).then(res => {
                  const result = res;
                  if (result.code === 200) {
                    this.orderList = result.data.list;
                    Indicator.close();
                    // 恢复文本值
                    this.topTip = '下拉刷新';
                    // 刷新成功后的提示
                    Toast('刷新成功');
                    // 刷新列表后,重新计算滚动区域高度
                    this.myScroll.refresh();
                    if(result.data.list.lenth<10){
                          this.bottomTip = '查看更多';
                    }
                  }
                }).catch((err) => {
                  console.log(err);
                  Indicator.close()
                });
              } else if (position.y < (this.myScroll.maxScrollY - 30)) {
                this.pageNum++;
                this.bottomTip = '加载中...';
                this.allOrder(this.pageNum, 5).then(res => {
                  const result = res;
                  if (result.code === 200) {
                    Indicator.close();
                    if (!result.data.list.length) {
                      this.bottomTip = '没有更多订单了';
                    } else {
                      this.orderList = this.orderList.concat(result.data.list);
                      // 恢复文本值
                      this.bottomTip = '查看更多';
                    }
                    // 刷新列表后,重新计算滚动区域高度
                    this.myScroll.refresh();
                  }
                }).catch((err) => {
                  console.log(err);
                  Indicator.close()
                });
                /*setTimeout(() => {
                  // 恢复文本值
                  this.bottomTip = '查看更多';
                  // 向列表添加数据
                  // 加载更多后,重新计算滚动区域高度
                  this.myScroll.refresh();
                }, 1000);*/
              }
            });
          } else {
            this.myScroll.refresh();
          }
        })
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .order_wrap
    width 100%
    height 100%
    .header
      width 100%
      background rgba(255, 255, 255, 1)
      padding 20px 16px
      box-sizing border-box
      font-size 18px
      text-align: center
      font-family PingFangSC-Medium
      font-weight 500
      color rgba(58, 61, 74, 1)
    .nav_list
      width 100%
      height 40px
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(112, 117, 127, 1);
      line-height: 20px;
      display flex
      background rgba(255, 255, 255, 1)
      justify-content space-between
      bottom-border-1px(#E5EAF3)
      li
        height 100%
        width 25%
        text-align: center
        line-height 40px
        position relative
        &.on
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 32px
            height 3px
            transform translateX(-50%)
            background: rgba(236, 88, 79, 1);
            border-radius: 2px;

    .scroll_wrap
      position: fixed;
      top: 108px;
      bottom: 50px;
      left: 0;
      width: 100%;
      overflow: hidden;
      .inner
        width 100%
        .top-tip
          position: absolute;
          top: -30px;
          left: 0;
          z-index: 1;
          width: 100%;
          line-height: 30px;
          text-align: center;
          color: #555;
        .bottom-tip
          width: 100%;
          text-align: center;
          color: #777;
        .order_list
          .order_item
           
            background rgba(255, 255, 255, 1)
            box-shadow 0 2px 6px -1px rgba(36, 37, 41, 0.1)
            border-radius 2px
            margin-bottom 8px
            padding 0 16px 16px 16px
            box-sizing border-box
            .order_wrap
              height 48px
              box-shadow 0 0 0 0 rgba(229, 234, 243, 1)
              display flex
              justify-content space-between
              align-items center
              bottom-border-1px(#E5EAF3)
              font-size: 14px
              font-family: PingFangSC-Medium
              .order_text
                font-weight: 500
                color: rgba(112, 117, 127, 1)
                line-height: 20px
              .order_num
                font-weight 500
                color rgba(58, 61, 74, 1)
                line-height 20px
              .order_btn
                height: 26px
                line-height 24px
                text-align: center
                -webkit-border-radius: 14px
                -moz-border-radius: 14px
                border-radius: 14px
                padding 0 15px
                background rgba(252, 220, 218, 1)
                font-size: 12px
                font-weight: 500
                color: rgba(238, 81, 71, 1)
                &.pink
                  color: rgba(238, 81, 71, 1);
                  background: rgba(252, 220, 218, 1)
                &.yellow
                  color: rgba(248, 162, 16, 1);
                  background: rgba(254, 236, 207, 1);
                &.green
                  color: rgba(46, 171, 89, 1);
                  background: rgba(213, 238, 222, 1);
            .fault_title
              margin 16px 0
              font-size: 16px
              font-weight: 500
              color: rgba(58, 61, 74, 1)
              line-height: 22px
            .server_type, .finish_time
              display flex
              justify-content space-between
              padding-left 20px
              font-size 14px
              font-weight 400
              line-height 20px
              color rgba(112, 117, 127, 1)
            .server_type
              margin-bottom 10px
              background url("../../../static/images/icon_服务@2x.png") no-repeat 0px 3px
              background-size 16px auto
            .finish_time
              background url("../../../static/images/icon_时间@2x.png") no-repeat 0px 3px
              background-size 16px auto
              line-height 20px
      .no_data
        width 100%
        height 100%
        text-align: center
        font-size 12px
        line-height 502px
        color #6e727a

</style>
