<template>
  <section class="order_wrap fund_wrap">
    <HeaderTop :title="title" ref="headtop">
      <ul class="nav_list" slot="nav">
        <li :class="{on: num===0}" @click="changehead(0)">待处理订单</li>
        <li :class="{on: num===1}" @click="changehead(1)">处理中订单</li>
        <li :class="{on: num===2}" @click="changehead(2)">完结订单</li>
        <li :class="{on: num===3 || num===4 || num===5}" @click="changehead(3)">问题订单</li>
      </ul>
    </HeaderTop>
     <div class="list-content" id="list-content">
       <van-pull-refresh v-model="isLoading[num]" @refresh="onRefresh"> 
           <van-list
                      v-model="loading[num]"
                      :finished="finished[num]"                    
                      @load="onLoad"
                      :offset="10"
                      finished-text="没有更多了"
                    > 
    <!-- <div class="dis_order" v-show="num===3||num===4||num===5" @click="isShow=true">
      <span>{{secondtitle}}</span>
      <img src="../../../static/images/矩形1.png" alt="">
    </div> -->
    <!-- <section class="shade" v-show="isShow">
      <div class="list">
        <li class="item" @click.stop="changetitle(0)">争议订单</li>
        <li class="item" @click.stop="changetitle(1)">失联订单</li>
        <li class="item" @click.stop="changetitle(2)">退单订单</li>
      </div>
    </section> -->
    <div class="scroll_wrap" :class="{active: num===3}">
      <ul class="outer_wrap">
         <!-- <li class="emptytip item" v-if="orderList[num].orderArr.length==0">
          <div class="item_hd">
           
            <span>暂无数据</span>
            
          </div>
         
        </li> -->
        <li class="item" v-for="(item,index) in orderList[num].orderArr" :key="index">
          <div class="item_hd" @click="$router.push({path:'/trouble_detail', query: {orderId: item.orderId,src:1}})">
            <img :src="item.imgUrl" alt="">
            <span>订单号</span>
            <span>{{item.orderId}}</span>
          </div>
          <div class="item_ft">
            <div @click="$router.push({path:'/trouble_detail', query: {orderId: item.orderId,src:1}})">
              <div class="user_info">
                <span>{{item.consignee}}</span>
                <span>{{item.mobile}}</span>
              </div>
              <div class="address_wrap">
                <img src="../../../static/images/icon_16px_位置2.png" alt="">
                <span>{{`${item.province} ${item.city} ${item.area} ${item.street} ${item.addr}`}}</span>
              </div>
            </div>
            <a :href="'tel:' + item.mobile" >
              <div class="imgWrap"> 
                <img src="../../../static/images/icon_24px_联系.png" alt="">
              </div>
            </a>
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
 import user from "@/api/model/user"

  export default {
    name: "Order",
    data() {
      return {
        isLoading: [false,false,false,false,false,false],
        listdata:[],
           loading: [false,false,false,false,false,false],
      finished: [false,false,false,false,false,false],
         tip:"加载成功",
         pageNum:[1,1,1,1,0,0],
        secondtitle:"争议订单",
        title: '我的订单',
        num: 0,
        isShow: false,
        orderCateState:0,
        first:true,
        statelist:[5,2,3,12],
        isShowson:false,
        orderList: [
          {
            orderArr: [
           
            ]
          },
          {
            orderArr: [
             
            ]
          },
          {
            orderArr: [
              
            ]
          },
          {
            orderArr: [
             
            ]
          },
          {
            orderArr: [
             
            ]
          },
          {
            orderArr: [
             
            ]
          }
        ]
      }
    },
    created(){
     //this.getlist()
         user.listEngineerOrder ({"data": {"data":{"orderCateState":5},"pageNum": 1,"pageSize": 10},"requestId":new Date().getTime()}).then((res) => {
           
            if(res.code==200){ 
                   this.orderList[0]['orderArr'].push(... res.data.list)
                   this.first=false;
                   this.loading[0] = false;
                  this.isLoading[0] = false;                
                  
                  if (res.data.list.length < 10) {
                   
                   // this.$tip("没有更多数据了");
                    this.finished[0]  = true;
                  }
            }
           }).catch( error => {
               this.$tip(error)
           })
           user.listEngineerOrder ({"data": {"data":{"orderCateState":2},"pageNum": 1,"pageSize": 10},"requestId":new Date().getTime()}).then((res) => {
           
            if(res.code==200){ 
                   this.orderList[1]['orderArr'].push(... res.data.list)
                   this.loading[1] = false;
                  this.isLoading[1] = false;                
                  
                  if (res.data.list.length < 10) {
                   
                   // this.$tip("没有更多数据了");
                    this.finished[1]  = true;
                  }
            }
           }).catch( error => {
              this.$tip(error)
           })
           user.listEngineerOrder ({"data": {"data":{"orderCateState":3},"pageNum": 1,"pageSize": 10},"requestId":new Date().getTime()}).then((res) => {
           
            if(res.code==200){ 
                   this.orderList[2]['orderArr'].push(... res.data.list)
                   this.loading[2] = false;
                  this.isLoading[2] = false;                
                  
                  if (res.data.list.length < 10) {
                   
                    //this.$tip("没有更多数据了");
                    this.finished[2]  = true;
                  }
            }
           }).catch( error => {
              this.$tip(error)
           })
           user.listEngineerOrder ({"data": {"data":{"orderCateState":12},"pageNum": 1,"pageSize": 10},"requestId":new Date().getTime()}).then((res) => {
           
            if(res.code==200){ 
                   this.orderList[3]['orderArr'].push(... res.data.list)
                   this.loading[3] = false;
                  this.isLoading[3] = false;                
                  
                  if (res.data.list.length < 10) {
                   
                  //  this.$tip("没有更多数据了");
                    this.finished[3]  = true;
                  }
            }
           }).catch( error => {
              this.$tip(error)
           })
           
    },
    wathch:{
        
    },
    computed:{
        orderCateStatecom:function(){
         
                 let ordercatestate=0;
                  
                  if(this.num==0){
                      return 5 
                  }
                   if(this.num==1){
                      return 2
                  }
                   if(this.num==2){
                       return 3
                  }
                   if(this.num==3){
                       return 12
                  }
                  if(this.num==4){
                       return 9
                  }
                  if(this.num==5){
                       return 6
                  }
                   
                  
          }
    },
    methods:{
      changeshow(){
          this.isShow=true;
      },
        getlist(){
          
          // for(var i=0;i<statelist.length;i++){
          //     await let orderdata = user.asyncEngineerOrder({"data": {"data":{"orderCateState":0},"pageNum": this.pageNum[this.num],"pageSize": 10},"requestId":new Date().getTime()})
          // }
          
           this.pageNum[this.num]++
               //获取列表数据this.orderCateState

           user.listEngineerOrder ({"data": {"data":{"orderCateState":this.orderCateStatecom},"pageNum": this.pageNum[this.num],"pageSize": 10},"requestId":new Date().getTime()}).then((res) => {
           
            if(res.code==200){ 
             // console.log(this.first) 
                      this.loading[this.num] = false;
             this.isLoading[this.num] = false; 
             res.data.list.forEach(item => {
                this.orderList[this.num]['orderArr'].push(item) 
             })
            // console.log(this.num)
             
             if (res.data.list.length < 10) {
             // console.log("finished");
           //   this.$tip("没有更多数据了");
              this.finished[this.num]  = true;
            }
            //  if(this.first){
            //     res.data.list.forEach(item => {
            //        switch(item.orderState){
            //           case 5:
                         
            //             break;
            //           case 2:
            //             this.orderList[1]['orderArr'].push(item)
            //           break;
            //           case 3:
            //             this.orderList[2]['orderArr'].push(item)
            //           break;
            //           case 12:
            //             this.orderList[3]['orderArr'].push(item)
            //           break;
            //           default:
            //             this.orderList[3]['orderArr'].push(item)
            //             break;
            //         }
            //          if (res.data.list.length<10||res.data.list.length==0) {
            //             this.finished = true;
            //       }
                 
            //    }); 
            //  }else{
            //     this.orderList[this.num]['orderArr']=[];
            //       this.orderList[this.num]['orderArr'].push(... res.data.list)
            //  }
               
             
              // console.log(this.orderList[2]['orderArr'])
            }else{
              this.$tip(res.message)
                      this.loading[this.num]  = false;
             this.isLoading[this.num]  = false;  
            }
                
          }).catch((error) => {
             // console.log(error)
                      this.loading[this.num]  = false;
             this.isLoading[this.num]  = false;  
            
          })
          
        },
       
        onRefresh() {
            //this.listdata=[];
            // this.orderList.forEach(item => {
            //       item['orderArr']=[];
            // })
            this.finished[this.num]=false;
            this.orderList[this.num]['orderArr']=[];
            this.pageNum[this.num]=0;
            this.tip="刷新成功"
            this.getlist()
          },
        onLoad() {
            if(!this.first){
                this.tip="加载成功"
                 this.getlist()
            }
            
        },
        changetitle(index){
            this.isShow=false;
            if(index==1){
                  this.secondtitle="失联订单"
                  this.num=4
            }
            if(index==2){
                   this.secondtitle="退单订单"
                   this.num=5
            }
            if(index==0){
                   this.secondtitle="争议订单"
                   this.num=4
            }
            this.getlist()

        },
        changehead(index){
              this.num=index
              if(index==3){
                this.secondtitle="争议订单"
              }
        }
    },
    mounted() {
     // let winHeight = document.documentElement.clientHeight                          //视口大小
     //   alert(document.getElementById('headtop').style.height)
     //let hhehe=document.getElementById('list-content').style.height =winHeight+'px'  //调整上拉加载框高度
           
      //   alert(hhehe)
      // this.$nextTick(() => {
      //   new BScroll('.scroll_wrap', {
      //     click: true
      //   })
      // })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .van-list{padding-bottom:50px;}
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
  .list-content{
      
    
    }
  .emptytip 
          padding-bottom 0!important
          text-align center!important
          border none
         
  .order_wrap
    width 100%
    height 100%
    .nav_list
      width 100%
      height 40px
      font-size: 14px;
      font-family: PingFangSC-Regular;
      color: rgba(112, 117, 127, 1);
      line-height: 20px;
      display flex
      justify-content space-between
      li
        height 100%
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
    .dis_order
      width 100%
      padding 0 16px
      height 54px
      line-height 54px
      box-sizing border-box
      font-size:18px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(58,61,74,1);
    .shade
      width 100%
      height 100%
      background:rgba(0,0,0,.4);
      position fixed
      top 0
      left 0
      z-index 100
      .list
        padding 0 16px
        position absolute
        top 55px
        left: 8px
        width:112px;
        
        background:rgba(255,255,255,1);
        border-radius:2px;
        box-sizing border-box
        
        .item
          width 100%
          height 50%
          text-align: center
          line-height 35px
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(112,117,127,1);
          bottom-border-1px($main)
        
    .scroll_wrap
      width 100%
  
      margin-top 8px
      &.active
      
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
            height 50px
            line-height 50px
            bottom-border-1px($main)
          .item_ft
            width 100%
            box-sizing border-box
            padding 0 16px
            color: rgba(58, 61, 74, 1);
            display flex
            justify-content space-between
            .user_info
              margin-top 16px
            .address_wrap
              margin-top 8px
            .imgWrap
              width 54px
              height 32px
              text-align right
              line-height 32px
              margin-top 20px
              border-left  1px solid $main
  
</style>
