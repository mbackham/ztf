<!--可抢订单页面-->
<template>
  <section class="fund_wrap">
    <TopHeader :title="title">
      <!-- <img src="../../../../static/images/icon_位置.png" slot="add" class="server_icon"> -->
     
    </TopHeader>
 
      <div class="list-content" id="list-content">
       <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> 
           <van-list
                      v-model="loading"
                      :finished="finished"                    
                      @load="onLoad"
                      :offset="10"
                      finished-text="没有更多了"
                    > 
    <div class="scroll_wrap">
      <ul class="outer_wrap">
        <!-- <li class="emptytip" v-if="listdata.length==0">暂无数据</li> -->
        <li class="item" v-for="(item , index) in listdata" :key="index">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>{{item.orderId}}</span>
            </div>
            <div class="price">￥{{item.finalFee}}</div>
          </div>
          <!-- <template></template> -->
          <p v-for="son  in item.orderRequire" :key="son.requireCateId" >{{son.cateName}}</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>{{item.startTime}} 至 {{item.endTime}}</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>  {{`${item.province} ${item.city} ${item.area} ${item.street} ${item.addr}`}}</span>
          </div>
          <div class="footer">
            <div>
              <span class="last">下单时间</span>
              <span class="time">{{item.createTime}}</span>
            </div>
            <div class="btn" @click="successShow(item.orderId)">抢单</div>
          </div>
        </li>
        <!-- <li class="item">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>2018102111053</span>
            </div>
            <div class="price">￥100</div>
          </div>
          <p>维修家庭中路由器及网线问题</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>2018-10-12 12:00 至 2018-10-13 12:00</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>绿地新城D2 10楼 1002</span>
          </div>
          <div class="footer">
            <div>
              <span class="last">剩余时间</span>
              <span class="time">45:23</span>
            </div>
            <div class="btn" @click="loserShow">抢单</div>
          </div>
        </li> -->
      </ul>
    </div>
    <transition name="msg">
      <Shade v-show="isShow"/>
    </transition>
    <div class="loser_success" v-show="loser">
      <img src="../../../../static/images/错误2.png">
      <p class="p1">抢单失败 !</p>
      <p class="p2">真可惜手慢了一点~</p>
      <div class="btn" @click="loserHide">我知道了</div>
    </div>
    <div class="loser_success" v-show="success">
      <img src="../../../../static/images/错误1.png">
      <p class="p1">抢单成功 !</p>
      <p class="p2">恭喜您抢单成功~</p>
      <div class="btn" @click="successHide">确定</div>
    </div>
     </van-list>  
             
       </van-pull-refresh> 
       </div>
  </section>
</template>

<script>
  ///import BScroll from 'better-scroll'
  import Shade from '../../../components/Shade/Shade'
  import user from "@/api/model/user"
   import order from "@/api/model/order"
  import Bus from '@/lib/bus'
  export default {
    name: "GetOrder",
    data() {
      return {
         isLoading: false,
        listdata:[],
         loading: false,
         finished: false,
         tip:"加载成功",
        title: '可抢订单',
        isShow: false, //遮罩层切换
        loser: false,//抢单失败
        success: false, //抢单成功
        timechange:true,
        pageNum:1,
        postdata:{"data": {"data":{"orderCateState":1},"pageNum": this.pageNum,"pageSize": 10},"requestId":new Date().getTime()},
      
      }
    },
    created(){
         
        this.getlist()
                   
    },
    methods: {
      //获取列表
      getlist(){
          user.listEngineerOrder (this.postdata).then((res) => {
               this.loading = false;
                    this.isLoading = false; 
              if(res.code==200){  
                this.listdata=[]
                    this.listdata.push(...res.data.list)
                     if (res.data.list.length<10||res.data.list.length==0) {
                    this.finished = true;
                  }
                    
              }else{

              }
          }).catch((error) => {
                        console.log(error)
                         this.loading = false;
                    this.isLoading = false; 
          }) 
      },
      successShow(orderId) {
        
        order.robOrder ({"data": orderId, "requestId": new Date().getTime()}).then((res) => {
              
              if(res.code==200){  
                  this.getlist()
                  this.isShow = true
                  this.success = true
                  
              }else{
                   this.$tip(res.message);
              }
          }).catch((error) => {
            this.$tip(error);
                        console.log(error)
                        
          }) 
      },
      loserShow() {
        this.isShow = true
        this.loser = true
      },
      successHide() {
        this.isShow = false
        this.success = false
      },
      loserHide() {
        this.isShow = false
        this.loser = false
      },
       onRefresh() {
            //this.listdata=[];
            // this.orderList.forEach(item => {
            //       item['orderArr']=[];
            // })
            this.orderlist=[];
            this.pageNum=0;
            this.tip="刷新成功"
            this.getlist()
          },
        onLoad() {
            
            this.tip="加载成功"
            this.getlist()
        }

    },
    mounted() {
     
    },
    components: {
      Shade
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .list-content {
  overflow-y: scroll;
}

.fund_wrap {
  display: flex;
  flex-flow: column;
  align-items: stretch;
}

.fund_wrap > div, .fund_wrap > header {
  flex: none;
}

#list-content {
  flex: 1;
  box-shadow: 0 2px 2px -1px rgba(36, 37, 41, 0.1) inset;
  overflow: auto;
}
  .emptytip{text-align:center;font-size:14px;line-height:30px;}
  .scroll_wrap
    width 100%
    
   
    margin-top 8px
    .outer_wrap
      width 100%
      padding 0 8px 8px
      box-sizing border-box
      .item
        width: 100%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 6px -1px rgba(36, 37, 41, 0.1)
        border-radius: 2px;
        font-size 14px
        margin-bottom 8px
        padding-bottom 16px
        .item_hd
          width 100%
          padding 0 16px
          box-sizing border-box
          display flex
          justify-content space-between
          align-items center
          height 50px
          bottom-border-1px($main)
          .change
            color rgba(236, 88, 79, 1);
            font-weight: 500;
          .price
            font-size: 16px;
            font-weight: 600;
            color: rgba(236, 88, 79, 1);
        p
          width 100%
          box-sizing border-box
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          padding 0 16px
          margin-top 16px
          line-height: 22px;
        .item_ft
          width 100%
          box-sizing border-box
          padding 0 16px
          margin-top 10px
          color: rgba(58, 61, 74, 1);
        .footer
          width 100%
          box-sizing border-box
          padding 0 16px
          margin-top 18px
          display flex
          align-items center
          justify-content space-between
          .last
            color #70757F
          .time
            font-size: 18px;
            font-family: DINPro-Bold;
           
            color: rgba(236, 88, 79, 1);
          .btn
            width: 80px;
            height: 32px;
            text-align: center
            line-height 32px
            color: rgba(255, 255, 255, 1);
            background: rgba(236, 88, 79, 1);
            border-radius: 2px;

  .loser_success
    position fixed
    top 50%
    left: 50%
    z-index 1000
    font-size: 16px;
    transform translate(-50%, -50%)
    width: 315px;
    height: 262px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 6px -1px rgba(36, 37, 41, 0.1);
    text-align: center
    border-radius: 2px;
    font-family: PingFangSC-Medium;
    img
      margin-top 30px
    .p1
      font-size: 18px;
      font-weight: 500;
      color: rgba(58, 61, 74, 1);
      line-height: 26px;
      margin-top 20px
    .p2
      font-weight: 400;
      color: rgba(112, 117, 127, 1);
      font-size: 16px;
      margin-top 10px
    .btn
      width: 100%
      height: 56px;
      line-height 56px
      box-shadow: 0 1px 0 0 rgba(229, 234, 243, 1)
      top-border-1px($main)
      position absolute
      bottom 0
      color: rgba(236, 88, 79, 1)

  .msg-leave
    opacity: 1

  .msg-leave-active
    opacity 0
    transition all 1s
</style>
