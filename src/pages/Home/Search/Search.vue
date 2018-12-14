<!--搜索页面-->
<template>
  <section class="search_wrap fund_wrap">
    <header class="search_header">
      <img src="../../../../static/images/icon_返回.png" alt="" class="return" @click="$router.back()">
      <input type="text" v-model="queryText" placeholder="请输入客户姓名、订单号">
    </header>
    <div class="list-content"
         id="list-content">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> 
      <van-list v-model="loading"
                :finished="finished"
                @load="onLoad"
                :offset="20"
                :finished-text="finishedtext"
                 >
    <div class="scroll_wrap">
      
      <ul class="outer_wrap">
        <li class="item" v-for="( item , index ) in orderList" :key="index"  @click="$router.push({path:'/trouble_detail', query: {orderId: item.orderId,src:1}})">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>{{item.orderId}}</span>
            </div>
            <!-- <div class="time">{{item.createTime}}</div> -->
          </div>
          <p>{{item['orderRequire'][0]['cateName']}}</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>{{item.startTime}} 至 {{item.endTime}}</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>{{`${item.province} ${item.city} ${item.area} ${item.street} ${item.addr}`}}</span>
          </div>
        </li>
      
      </ul>
      </div>
     </van-list>
      </van-pull-refresh>
      </div>
  
  </section>
</template>

<script>
// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

 // import BScroll from 'better-scroll'
 import user from "@/api/model/user"
  export default {
    name: "Search",
    data(){
        return {
          queryText:"",
          orderList:[],
          loading: false,
          finished: false,
          tip: "加载成功",
        isLoading:false,
          pageNum: 0,
          finishedtext:"没有更多了"
        }
    },
    created(){
       this.getlist();
    },
     watch: {
  //watch title change
      queryText() {
        delay(() => {
          this.orderList=[];
          this.pageNum=0;
          this.getlist();
        }, 300);
      }
    },
    methods:{
          onRefresh() {
            //this.listdata=[];
            // this.orderList.forEach(item => {
            //       item['orderArr']=[];
            // })
            this.orderList=[];
            this.pageNum=0;
            this.finished=false;
            this.tip="刷新成功"
            this.getlist()
          },
        onLoad() {
          this.tip = "加载成功";
          console.log("reach bottom... ...");

          this.getlist();
        },
      // search(){
      //    var timer=setTimeout(() => {
      //        this.getlist()
      //    }, 300);
         //clearTimeout(timer);   
       
     // },
        getlist(){
          this.pageNum++
                user.listEngineerOrder ({"data": {"data":{"orderCateState":0,"queryText":this.queryText},"pageNum": this.pageNum,"pageSize": 10},"requestId":new Date().getTime()}).then((res) => {
                      this.loading = false;
                          this.isLoading = false;  
                           this.finished = false;  
                    if(res.code==200){ 
                      
                          this.orderList.push(... res.data.list)
                          //  this.first=false;
                                     
                          
                           if (res.data.list.length < 10) {                        
                             this.finishedtext="没有更多了"
                              this.finished = true;
                           }
                    }else{
                        his.finishedtext="加载错误"
                           this.finished = true;
                          this.$tip(res.message)
                    }
                  }).catch( error => {
                          this.finishedtext="加载错误"
                           this.finished = true;
                          this.$tip(error)
                  })
        }
    },
    mounted() {
      // this.$nextTick(() => {
      //   new BScroll('.scroll_wrap', {
      //     click: true
      //   })
      // })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .fund_wrap {
  display: flex;
  flex-flow: column;
  align-items: stretch;
  height:100%;
}
 / deep / .van-pull-refresh__head {position:absolute;top:0!important;left:0;}
.fund_wrap > div, .fund_wrap > header {
  flex: none;
}

#list-content {
  flex: 1;
  box-shadow: 0 2px 2px -1px rgba(36, 37, 41, 0.1) inset;
 
   }
  .search_wrap
    z-index 1000
    font-size 14px
    width 100%
    box-shadow: 0 0 0 0 rgba(229, 234, 243, 1)
    .search_header
      width 100%
      height 64px
      padding 26px 16px 6px
      z-index 1000000000000000000
      box-sizing border-box
      bottom-border-1px(#E5EAF3)
      background rgba(255, 255, 255, 1)
      .return
        margin-right 8px
        vertical-align middle
      input
        width 306px
        height 32px
        padding-left 32px
        box-sizing border-box
        vertical-align middle
        outline none
        background-color rgba(244, 244, 244, 1)
        background-image url("../../../../static/images/icon_搜索.png")
        background-repeat no-repeat
        background-position 10px center
        border-radius 2px
        opacity 0.9
        &::-webkit-input-placeholder /*Webkit browsers*/
          color: #ccc
    .scroll_wrap
      width 100%
      height calc (100% - 100px)
      overflow hidden
     
      margin-top 8px
      .outer_wrap
        width 100%
        padding 0 8px
        box-sizing border-box
        .title
          height 56px
          width 100%
          display flex
          padding 0 8px
          box-sizing border-box
          justify-content space-between
          align-items center
          font-size: 18px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          line-height: 26px;
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
            .time
              font-size: 18px;
              font-family: DINPro-Bold;
              font-weight: bold;
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
</style>
