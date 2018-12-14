<!--故障申报页面-->
<template>
  <section class="trouble_wrap">
    <TopHeader :title="title" ref="headtop">
      <!-- <NavBar slot="nav"/> -->
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
        <li class="item" @click="$router.push({path:'/trouble_detail', query: {orderId: item.orderId,src:5}})"  v-for="(item , index) in listdata" :key="index">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>{{item.orderId}}</span>
            </div>
            <!-- <div class="time">{{item.createTime}}</div> -->
          </div>
          <p>{{item.csServiceDesc}}</p>
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
  import BScroll from 'better-scroll'
import user from "@/api/model/user"
  export default {
    name: "FinishOrder",
    data() {
      return {
        title: '故障申报',
       
        pageNum:0,
       
          isLoading: false,
        listdata:[],
         loading: false,
         finished: false,
         tip:"加载成功"
      }
    },
    created(){
        // this.postdata.data.data.pageNum=this.pageNum;
        //this.getlist()
                   
    },
     methods: {
      //获取列表
      getlist(){
         this.pageNum++;
          user.listEngineerOrder ({"data": {"data":{"orderCateState":10},"pageNum": this.pageNum,"pageSize": 10},"requestId":new Date().getTime()}).then((res) => {
               this.loading = false;
                    this.isLoading = false; 
              if(res.code==200){  
                    this.listdata.push(...res.data.list)
                     // 数据全部加载完成
                     console.log(res.data.list.length)
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
     
       onRefresh() {
            //this.listdata=[];
            // this.orderList.forEach(item => {
            //       item['orderArr']=[];
            // })
            this.listdata=[];
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
       let winHeight = document.documentElement.clientHeight                          //视口大小
     //   alert(document.getElementById('headtop').style.height)
      let hhehe=document.getElementById('list-content').style.height =winHeight-46+'px'  //调整上拉加载框高度
      
      // this.$nextTick(() => {
      //   new BScroll('.scroll_wrap', {
      //     click: true
      //   })
      // })
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
   .list-content{
     
        overflow-y:scroll;
    }
  .emptytip{text-align:center;font-size:14px;line-height:30px;}
  .trouble_wrap
    width 100%
    height: 100%
    .scroll_wrap
      width 100%
   
      overflow hidden
      margin-top 8px
      .outer_wrap
        width 100%
        padding 0 8px 8px
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
