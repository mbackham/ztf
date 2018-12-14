<!--服务方案详情页面-->
<template>
  <section>
    <TopHeader :title="title"/>
    <div class="servicebox">
      <div class="scroll_wrap wrapleft">
        <aside class="serviceplan ">
            <div class="service" v-for="(item,index) in service" :key="item.prodCate.prodCateId" @click="changeserviceplan(index)" :class='{"activebg":index==serviceindex}'>
              <span>{{item.prodCate.cateName}}</span>
            </div>
        </aside>
      </div>
      <div class="scroll_wrap wrapright">
        <section class="serviceplandetail">
              
                <ul class="scroll_ul" v-if="service.length>0">
                 <!-- <template  v-for='item in service[serviceindex]'> -->
                  <li v-for='(items,index) in service[serviceindex].prod' :key="items.prodId" class="liLists" @click="$router.push({path:'/changeservicedetail',query:{prodId:items.prodId,prodPrice:items.prodPrice}})" >
                      <div class="icon">
                        
                        <img :src="`http://domch.cn/file-api/image/${items.prodImagePath}`" width="60" height='60' class="imgs">
                      </div>

                      <div class="content">
                        <div class="conLists">
                          <span>{{items.prodName}}</span>
                        </div>
                        <div class="price">
                          <span>￥{{items.prodPrice}}/{{items.unitName}}</span>
                        </div>
                        <div class='conts'>
                            <img  v-if="items.num!=0" src="../../../static/images/button_减.png" @click="minus(index,items.num)" >
                           <span v-if="items.num!=0">{{items.num}}</span>
                           <img src="../../../static/images/button_加.png" @click="add(index,items.num)" >
                         
                         
                          <!-- <control 
                           :items='items'
                          @add='add' 
                          @decr='decr'>
                        </control> -->
                        </div>
                        
                      </div>
                   </li>
                   <!-- </template> -->
                </ul>
               
        </section>
      </div>
    </div>
    <div class="bottom-part">
      <div class="total-price">
        <span>合计:￥{{money.toFixed(2)}}</span>
      </div>
      <div class="submit" @click="changeOrderService" >
        提交
      </div>
    </div>
   
  </section>
</template>

<script>
import control from "@/pages/Order/control"
import BScroll from 'better-scroll'
import order from "@/api/model/order"
 import base from '@/api/base'; 
  export default {
    name: "ServiceProjectDetail",
    components:{
      control
    },
    data() {
      return {
        title: '服务方案变更',
        first:false,
        serviceindex:0,
        service:[	],
        money:0,
        
        orderProd:[]
    
       
      }
    },
    created() {
    
      order.listProdCateProd({"requestId":new Date().getTime()}).then((res) => {
               
                          if(res.code==200){ 
                               var that=this;
                               this.service.push(...res.data)
                              // console.log(this.service[this.serviceindex].prod)
                               this.service.forEach(item =>{
                                  item.prod.forEach(items =>{
                                      //items.num=0;
                                      that.$set(items,'num',0)
                                     // alert(items.num)
                                  })
                               })
                             
                              console.log(this.service)
                              
                                
                          }else{
                              this.$tip(res.message)
                          }
                      }).catch((error) => {
                              this.$tip(error)
                                
                      })
     
    },
    methods:{
      //提交
      changeOrderService(){
              this.service.forEach(item =>{
                item.prod.forEach(items =>{
                   items.num>0&&this.orderProd.push( { "prodId": items.prodId, "prodNum": items.num })
                })
              })
             order.changeOrderService({  "data": { "orderId": this.$route.query.orderId, "orderProd": this.orderProd},  "requestId":new Date().getTime() }).then((res) => {
               
                          if(res.code==200){ 
                               var that=this;
                               this.service.push(...res.data)
                             
                               this.service.forEach(item =>{
                                  item.prod.forEach(items =>{                                     
                                      that.$set(items,'num',0)                                    
                                  })
                               })
                               this.$router.go(-2)
                              //console.log(this.service)
                              
                                
                          }else{
                              this.$tip(res.message)
                          }
                      }).catch((error) => {
                              this.$tip(error)
                                
                      })
      },
      totlemoney(){
            this.money=0;
             this.service.forEach(item =>{
                  item.prod.forEach(items =>{
                      //items.num=0;
                      if(items.num>0){
                        this.money+=items.num*items.prodPrice
                      }
                      
                      
                  })
                })
      },
      changeserviceplan(index){
               this.serviceindex=index
      },
   
      minus(index ,num){   
                
          this.service[this.serviceindex]['prod'][index].num--
          this. totlemoney();

      },
      add(index,num){
          
          this.service[this.serviceindex]['prod'][index].num++
          this. totlemoney();
        
        
      
       
      }
    },
     mounted() {

   }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .wrapright
     flex 2
  .wrapleft
    flex 1 
    
  .activebg
    background #fff
  im
  .servicebox
      display flex
    // flex-flow row
    width 100px
    display flex
    position absolute
    top 70.14
    .serviceplan
        flex 0 0 100
        width 100px
        background #f3f5f7
      .service
         display table
         font-size 16px
         line-height 55px
         margin-right 10px
         width 100%
         span
           display table-cell
           text-align center
           vertical-align middle
           border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .scroll_wrap
        height 300px
       .serviceplandetail
           height:600px
           overflow: hidden
           .liLists
              display flex
              margin-bottom 5px
              
              padding 10px
              border-bottom 1px solid rgba(7, 17, 27, 0.1)
              .icon
                  flex 0 0 80px
                  margin-right 10px
              .price
                   font-size 14px
                   margin-top 10px
                   color red
                   
              .content
                flex 1
                margin-top 5px
                .conLists
                   font-size 15px
                //.conts
              .conts
                position:relative;
                right:10px;
                text-align right
                font-size 14px
  .bottom-part
    position:absolute
    bottom:0
    left:0
    width:100%
    height:50px
    background:#ccc
    display:flex
    .total-price
      flex:0 0 250px
      text-align:left
      overflow:auto
      span
        display:inline-block
        font-size:17px
        float:right
        margin-top 16px
        margin-right 38px
    .submit
      flex:1
      height:50px
      background:red
      text-align:center
      font-size:20px
      color:#f3f5f7
      font-weight:600
      line-height:46px

















  // .order_list
  //   width 100%
  //   padding 0 16px
  //   box-sizing border-box
  //   margin-bottom 8px
  //   font-family PingFangSC-Medium
  //   background rgba(255, 255, 255, 1)
  //   .order_item
  //     height 48px
  //     display flex
  //     justify-content space-between
  //     align-items center
  //     font-size: 14px
  //     bottom-border-1px(#E5EAF3)
  //     .order_text, .order_status
  //       font-weight: 400
  //       color: rgba(112, 117, 127, 1)
  //       line-height: 20px
  //     .order_num
  //       font-weight: 400
  //       color: rgba(58, 61, 74, 1)
  //       line-height: 20px
  //     .order_ing
  //       font-weight: 400
  //       color: #f8a210
  //       line-height: 20px
  //       &.pink
  //         color: rgba(238, 81, 71, 1);
  //       &.yellow
  //         color: rgba(248, 162, 16, 1);
  //       &.green
  //         color: rgba(46, 171, 89, 1);
  // .title
  //   width 100%
  //   height 48px
  //   padding 0 16px
  //   box-sizing border-box
  //   line-height 48px
  //   box-shadow 0 0 0 0 rgba(229, 234, 243, 1)
  //   font-size 16px
  //   font-weight 500
  //   color rgba(58, 61, 74, 1)
  //   background rgba(255, 255, 255, 1)
  //   bottom-border-1px(#E5EAF3)

  // .scroll_wrap
  //   width 100%
  //   height 400px
  //   overflow hidden
  //   background rgba(255, 255, 255, 1)
  //   .server_list
  //     width 100%
  //     margin-bottom 8px
  //     font-family PingFangSC-Medium
  //     .server_item
  //       width 100%
  //       line-height 60px
  //       padding 0 16px
  //       box-sizing border-box
  //       font-size: 14px
  //       font-family: PingFangSC-Regular
  //       font-weight: 400
  //       .name
  //         color rgba(55, 57, 61, 1)
  //         line-height 20px
  //         margin-left 5px
  //       .sum
  //         font-weight: 400
  //         color: rgba(55, 57, 61, 1)
  //         line-height: 20px
  //         margin-right 43px
  //       .price
  //         font-weight 500
  //         color rgba(55, 57, 61, 1)
  //         line-height 20px
  //       .outer_wrap
  //         position relative
  //         display flex
  //         justify-content space-between
  //         align-items center
  //         span, img
  //           vertical-align middle
  //         .item_img
  //           width 36px
  //           height 36px
  //           border-radius: 2px
  //         .triangle
  //           position absolute
  //           left 18px
  //           bottom 0
  //           width: 0
  //           height: 0
  //           border-width: 3px
  //           border-style: solid;
  //           border-color: transparent transparent #E5EAF3 transparent; /*透明 透明  灰*/
  //           display block
  //       .item_list
  //         width 100%
  //         background: rgba(249, 251, 254, 1);
  //         box-shadow: 0px 1px 0px 0px rgba(229, 234, 243, 1), 0px 0px 0px 0px rgba(229, 234, 243, 1);
  //         .shop_item
  //           height 48px
  //           display flex
  //           align-items center
  //           justify-content space-between
  //           .name
  //             color rgba(58, 61, 74, 1)
  //           .count_wrap
  //             display flex
  //             justify-content space-between
  //             .price
  //               text-align right
  //               display inline-block
  //               width 45px
</style>
