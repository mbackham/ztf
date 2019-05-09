<!--我的退款页面-->
<template>
  <section>
    <TopHeader :title="title">
      <img src="../../../../static/images/icon_返回.png" class="return" @click="$router.back()" slot="return">
    </TopHeader>
    <div class="scroll_wrap">
      <p class="noData_title" v-show="isDataBack">暂无更多订单数据</p>
      <ul class="back_list">
        <li class="back_item" v-for="(item,index) in list" :key="index" @click="orderDes(index)">
          <div class="header">
            <div>
              <span class="order_text">订单号</span>
              <span class="order_num">{{item.orderId}}</span>
            </div>
            <div class="back_btn">{{item.orderStateName}}</div>
          </div>
          <p class="shop_name">{{item.orderRequire[0].requireName}}</p>
          <div class="back_outer">
            <div>
              <img src="../../../../static/images/icon_服务.png" alt="">
              <span>服务类型</span>
            </div>
            <div>{{item.orderRequire[0].cateName}}</div>
          </div>
          <div class="back_outer">
            <div>
              <img src="../../../../static/images/icon_时间.png" alt="">
              <span>订单完成时间</span>
            </div>
            <div>{{item.subscribeEndTime}}</div>
          </div>
          <div class="footer">
            <div>
              <img src="../../../../static/images/icon_退款.png" alt="">
              <span>退款</span>
            </div>
            <div class="price">￥{{item.finalFee}}</div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {Indicator} from 'mint-ui'
  import {mapState} from 'vuex'
  export default {
    name: "MyBack",
    data() {
      return {
        title: '我的退单',
        list:[],
        isDataBack:false
      }
    },
    watch:{
      list(val,oldVal){
        if(val.length<1){
          this.isDataBack=true;
        }else{
          this.isDataBack=false;
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true,
        })
      })
    },
    computed:{
      ...mapState(['_token'])
    },
    methods:{
      getOrderList(){//获取订单列表
        Indicator.open()
        this.$axios.post(this.Url+'/api/order/pageMemOrder',{
          "data":{
            "data":{
              "orderCateState":6,//退款订单
              "orderId":'',
              "querySort":[],
              "queryText":""
            },
            "pageNum":1,
            "pageSize":10
          },
          "requestId":this.stamp
        },
        {
          headers:{
            "Content-Type":"application/json",
            "token":localStorage.getItem('token')
          }
        }
        ).then((res)=>{
          console.log(res)
          Indicator.close()
          this.list=res.data.data.list;
        }).catch((err)=>{
          console.log(err)
          Indicator.close()
        })
      },
      orderDes(index){//订单i详情
        // Indicator.open()
        // this.$axios.post(this.Url+'/api/order/getOrderDetail',{
        //   "data": this.list[index].orderId,
        //   "requestId": "string"
        // },{
        //    headers:{
        //      "Content-Type":"application/json",
        //      "token":this._token
        //    }
        // }).then((res)=>{
        //   Indicator.close();
        //   this.$router.push({
        //     path:'/back_details',
        //     query:{
        //       res:res.data.data
        //     }
        //   })
        // })
        this.$router.push({
          path:'/canceled_orderdetail',
          query:{
            id:this.list[index].orderId
          }
        })
      }
    },
    created(){
      this.getOrderList()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .scroll_wrap
    height 595px
  .noData_title
      width: 100%
      font-size: 14px
      color:#999
      position: absolute
      top:16%
      left:0
      text-align: center
    .back_list
      margin-top 8px
      width 100%
      padding 0 8px
      box-sizing border-box
      span,img
        vertical-align middle
      .back_item
        width 100%
        padding 0 16px
        box-sizing border-box
        background:rgba(255,255,255,1)
        box-shadow:0 2px 6px -1px rgba(36,37,41,0.1)
        border-radius:2px
        margin-bottom 8px
        .header
          width 100%
          height:48px
          display flex
          justify-content space-between
          align-items center
          font-size:14px
          font-family:PingFangSC-Medium
          bottom-border-1px(#E5EAF3)
          .order_text
            font-weight 500
            color rgba(112,117,127,1)
            line-height 20px
          .order_num
            font-weight:500
            color:rgba(58,61,74,1)
            line-height:21px
            margin-left: 5px
          .back_btn
            width:64px
            height:26px
            line-height 26px
            text-align: center
            background:rgba(238,240,246,1)
            border-radius:14px
            font-size:12px
            font-weight 500
            color rgba(112,117,127,1)
        .shop_name
          padding 16px 0
          font-size:16px
          font-family:PingFangSC-Medium
          font-weight:500
          color:rgba(58,61,74,1)
          line-height:22px
        .back_outer
          width 100%
          font-size:14px
          font-family:PingFangSC-Regular
          color:rgba(112,117,127,1)
          display flex
          justify-content space-between
          align-items center
          div
            margin-bottom 10px
        .footer
          width 100%
          height 48px
          display flex
          justify-content space-between
          align-items center
          font-size:14px
          font-family:PingFangSC-Regular
          color:rgba(112,117,127,1)
          top-border-1px(#E5EAF3)
          .price
            font-weight:600
            color:rgba(236,88,79,1)
            line-height:22px
</style>
