<!--首页-->
<template>
  <section class="home_wrap">
    <header class="header">
      <nav class="navBar ellipsis">
        <img src="../../../static/images/icon_16px_位置.png" alt="">
        <span class="address">海航实业大厦</span>
      </nav>
      <input type="text" class="search" placeholder="请输入搜索" @click="$router.push('/search')">
    </header>
    <van-pull-refresh v-model='loading' @refresh="onRefresh"> 
    <div class="hd_wrap">
      <!-- <div class="home_img ">
       <img :src="`http://domch.cn/file-api/image/${item.imagePath}`" v-for="(item , index) in imgData" :key="index*Math.random()" class="home_img">
      </div> -->
      <swiper :imgs="imgS"/>
       <ul class="btn_wrap">
        <li class="btn_item" @click="$router.push('/wait_order')">
          <img src="../../../static/images/icon_待预约.png" alt="">
          <p>待预约</p>
        </li>
        <li class="btn_item" @click="$router.push('/being')">
          <img src="../../../static/images/icon_处理中.png" alt="">
          <p>处理中</p>
        </li>
        <li class="btn_item" @click="$router.push('/finish')">
          <img src="../../../static/images/icon_已完成.png" alt="">
          <p>已完成</p>
        </li>
        <li class="btn_item" @click="$router.push('/get_order')">
          <img src="../../../static/images/icon_抢单.png" alt="">
          <p>抢单</p>
        </li>
        <li class="btn_item" @click="$router.push('/trouble')">
          <img src="../../../static/images/icon_故障申报.png" alt="">
          <p>故障申报</p>
        </li>
      </ul>
      
    </div>
    <section class="scroll_wrap">
      <div class="outer_wrap" >
       <ul class="inner_wrap" v-for='(item,index) in yuyueData' :key="index" >
            <li class="title" @click='orderCateStateName (item.orderCateStateName)'>
              <span>{{item.orderCateStateName}}</span>
              <img src="../../../static/images/icon_查看详情.png" alt="">
            </li>
            <li class="item" v-for="(item2,index) in item.order"  :key="index" >
              <div class="item_hd">
                <div>
                  <span>订单号</span>
                  <span>{{item2.orderId}}</span>
                </div>
                <div class="change"></div>
              </div>
              <p>{{item2.orderRequire[0].cateName}}</p>
              <div class="item_ft">
                <img src="../../../static/images/icon_14px_时间1.png" alt="">
                <span>{{item2.createTime }}至 {{item2.endTime}}</span>
              </div>
            </li>
          </ul>
        
      </div>
    </section>
    </van-pull-refresh> 

  </section>
</template>

<script>
  import Swiper from '../../components/swiper'
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import user from "@/api/model/user"

  export default {
    name: "Home",
    components:{
      Swiper
    },
     data() {
      return {
        imgData:[],
        yuyueData:{},
        imgS:[],
         tip:"加载成功",
        loading:false,
        finished:false,
        postdata:{"requestId":new Date().getTime()},
        postImgData:{ "data": 2, "requestId": new Date().getTime()},
       }
    },
   methods:{
      orderCateStateName(state){
        if(state == '待预约'){
          this.$router.push('/wait_order')
        }else if(state == '处理中'){
          this.$router.push('/being')
        }else if(state == '可抢订单'){
          this.$router.push('/get_order')
        }else if(state == '故障申报'){
          this.$router.push('/trouble')
        }else{
          this.$router.push('/finish')
        }
      },
        onLoad() {
            
            this.tip="加载成功"
            this.getlist()
        },
        getlist(){
         user.homelist(this.postdata).then((res)=>{
           // this.loading = false
                console.log(res)
            if(res.code == 200){
              this.yuyueData = res.data
              console.log(this.yuyueData)

            }
               this.loading=false
          }).catch((err)=>{
            console.log(err)
             this.loading=false
            })
         
      },
      getimg(){
          user.homeimg(this.postImgData).then((res =>{
        if(res.code == 200){
          this.imgData = res
        for(let i in this.imgData){
          this.imgS.push(this.imgData[i])
          console.log( this.imgS)

           }
          }
         // this.loading=false
          })).catch((err =>{
            this.$tip(err)
            this.loading=false
          })
        )
      },
      onRefresh(){
          this.tip="刷新成功"
         this.getlist()

         this.getimg()
         
      }
    },

       
    
    created(){
       this.getlist()
       this.getimg()
    },

    mounted() {
       const token = localStorage.getItem("token")

      this.$nextTick(function() {
        new BScroll('.scroll_wrap', {
          click: true
        });
      })
       } ,
   
      //获取图片

    
    // axios.post("http://domch.cn/app-api/api/part/selectPartContent",{
    //   data:2,
    //  requestId: new Date().getTime()
    // },{
    //   headers:{
    //     token
    //   }
    // }).then(res =>{
    //   this.imgData = res.data.data
    // //  console.log(this.imgData);
    //   for(let i in this.imgData){
    //     this.imgS.push(this.imgData[i])
    //   }
    // }).catch(err =>{
    //   this.$tip(err)
    // })
    //待预约
     // axios.post('http://domch.cn/app-api/api/order/listEngineerIndexOrder',{
     //    requestId: requestId
     //     },{
     //    headers:{
     //    token
     //   }
     //  }).then(res => {
     //    this.yuyueData = res.data.data
     //    //console.log( this.yuyueData)
     //  }).catch(err => {
     //    this.$tip(err)
     //  })
  
     
    
  
    
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'swiper/dist/css/swiper.min.css';
  @import "../../common/stylus/mixins.styl"
  .home_wrap
    width 100%
    height 100%
    .header
      width 100%
      height 70px
      padding 15px 16px 0
      box-sizing border-box
      display flex
      justify-content space-between
      align-items center
      background: rgba(255, 255, 255, 1);
      .navBar
        font-size 16px
        width 125px
        .address
          font-family PingFangSC-Medium
          font-weight 500
      .search
        width: 211px
        height: 32px
        padding-left 32px
        box-sizing border-box
        background-color rgba(244, 244, 244, 0.9)
        border-radius: 2px
        color #A1A7B3
        outline none
        font-size 14px
        background-image: url('../../../static/images/icon_搜索.png')
        background-repeat no-repeat
        background-position 10px center
        &::-webkit-input-placeholder /*Webkit browsers*/
          color: #ccc

    .hd_wrap
      padding 0 8px
      background: rgba(255, 255, 255, 1);
      .home_imgs
       
        height: 140px;
        box-shadow: 0 6px 14px -4px rgba(39, 41, 53, 0.4);
        border-radius: 4px;
        display: flex;
        img
          float: left;
          width:100vw;
      .btn_wrap
        width: 100%
        padding 0 10px 0 9px
        box-sizing border-box
        background: rgba(255, 255, 255, 1)
        clearFix()
        .btn_item
          float left
          width: 20%
          height: 107px;
          text-align: center
          padding-top 20px
          box-sizing border-box
          img
            width: 40px;
            height: 44px;
          p
            font-size: 13px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(58, 61, 74, 1);
            margin-top 10px
      

    .scroll_wrap
      width 100%
      height calc(100vh - 360px)
      overflow hidden
      .outer_wrap
        padding-bottom 8px
        .inner_wrap
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
                font-weight: bold;
                color: rgba(236, 88, 79, 1);
              .btn
                width: 80px;
                height: 32px;
                text-align: center
                line-height 32px
                color: rgba(255, 255, 255, 1);
                background: rgba(236, 88, 79, 1);
                border-radius: 2px;
</style>
