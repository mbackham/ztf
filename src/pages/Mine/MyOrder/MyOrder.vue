<!--我的非标准订单-->
<template>
    <section class="order_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <p class="noData_title" v-show="isData">暂无更多订单数据</p>
      <ul class="order_list">
        <!-- <li class="order_item" @click="$router.push('/order_detail')">
          <div class="order_wrap">
            <p class="fault_title">维修家庭中路由器及网线问题</p>
            <div class="other">其他</div>
          </div>
          <div class="server_type">
            <span>服务类型</span>
            <span>其他</span>
          </div>
          <div class="finish_time">
            <span>提交时间</span>
            <span>2018-10-12 12:00</span>
          </div>
        </li> -->
        <li class="order_item" @click="myOrderDes(index)" v-for="(item,index) in sList" :key="index">
          <div class="order_wrap">
            <div>
              <span class="order_text">订单号</span>
              <span class="order_num">{{item.orderId}}</span>
            </div>
            <div class="order_btn">{{item.orderStateName}}</div>
          </div>
          <p class="fault_title">维修家庭中路由器及网线问题</p>
          <div class="server_type">
            <span>服务类型</span>
            <span>{{item.orderTypeName}}</span>
          </div>
          <div class="trouble">
            <span>问题描述</span>
            <span>{{item.orderRemark}}</span>
          </div>
          <div class="finish_time">
            <span>提交时间</span>
            <span>{{item.payFinishTime}}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  export default {
    name: "MyOrder",
    data(){
      return{
        title: '我的非标准订单',
        sList:[],
        isData:false
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    },
    watch:{
      sList(val,oldVal){
        if(val.length<1){
          this.isData=true
        }else{
          this.isData=false
        }
      }
    },
    computed:{
      ...mapState(['_token'])
    },
    methods:{
      myOrderDes(index){
        this.$router.push({
          path:'/order_detail',
          query:{
            Uid:this.sList[index].orderId
          }
        })
      },
      getOrderList(){
        this.$Indicator.open();
        this.$axios.post(this.Url+'/api/order/pageMemOrder',{
          "data":{
            "data":{
              "orderCateState":7,//全部订单
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
          this.$Indicator.close();
          console.log(res,212312321);
          this.sList=res.data.data.list;
        }).catch((err)=>{
          console.log(err)
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

  .order_wrap
    width 100%
    height 100%
    .scroll_wrap
      width 100%
      height 591px
      margin-top 8px
      overflow hidden
    .noData_title
      width: 100%
      font-size: 14px
      color:#999
      position: absolute
      top:16%
      left:0
      text-align: center
    .order_list
      padding 0 8px
      box-sizing border-box
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
          .other
            width: 64px
            height: 26px
            line-height 24px
            text-align: center
            background:rgba(238,240,246,1)
            border-radius: 14px
            font-size: 12px
            font-weight: 500
            color:rgba(176,182,194,1);
          .order_btn
            width: 64px
            height: 26px
            line-height 24px
            text-align: center
            background: rgba(252, 220, 218, 1)
            border-radius: 14px
            font-size: 12px
            font-weight: 500
            color: rgba(238, 81, 71, 1)
        .fault_title
          margin 16px 0
          font-size: 16px
          font-weight: 500
          color: rgba(58, 61, 74, 1)
          line-height: 22px
        .server_type, .finish_time,.trouble
          display flex
          justify-content space-between
          padding-left 20px
          font-size 14px
          font-weight 400
          color rgba(112, 117, 127, 1)
        .server_type
          margin 10px 0
          background url("../../../../static/images/icon_服务.png") no-repeat
        .finish_time
          background url("../../../../static/images/icon_时间.png") no-repeat
        .trouble
          margin-bottom 10px
          background url("../../../../static/images/icon_问题描述.png") no-repeat
</style>
