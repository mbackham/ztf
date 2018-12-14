<!--故障申报详情页面-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title">
      <img src="../../../../../static/images/icon_位置.png" slot="add" class="server_icon" @click="$router.push({path:'/callService'})">
    </TopHeader>
    <!-- 故障订单 ordersrc=='服务方案待确认'-->
    <div class="order_state" v-show="isShow"  v-if="orderCateName=='故障订单'" >
      <div>
        <img src="../../../../../static/images/icon_16px_位置3.png" alt="">
        <span>您有一份故障申报(客户在施工后订单出现故障)</span>
      </div>
      <img src="../../../../../static/images/icon_取消5.png" @click="isShow=false">
    </div>
      <!-- 故障订单 -->
      <!-- 用户驳回了您的方案 -->
    <div class="order_state" v-show="isShow"  v-if="ordersrc=='用户驳回服务方案'"  >
      <div>
        <img src="../../../../../static/images/icon_16px_位置3.png" alt="">
        <span>用户驳回了您的方案</span>
      </div>
      <img src="../../../../../static/images/icon_取消5.png" @click="isShow=false">
    </div>
      <!-- 用户驳回了您的方案 -->
       <!-- 服务方案待确认 -->
    <div class="order_state" v-show="isShow"  v-if="ordersrc=='服务方案待确认'"  style="background:#ffe5b3;" >
      <div>
        <img src="../../../../../static/images/icon_16px_位置5.png" alt="">
        <span style="color:#ffa41a;">客户正在确认您的服务方案~</span>
      </div>
      <img src="../../../../../static/images/icon_取消5.png" @click="isShow=false">
    </div>
      <!-- 服务方案待确认 -->
       <!-- 施工方案已确认 -->
    <div class="order_state" v-show="isShow"  v-if="ordersrc=='服务方案已确认，待施工'" style="background:#e5fff5;" >
      <div>
        <img src="../../../../../static/images/icon_16px_位置4.png" alt="">
        <span style="color:#00cc7a;">施工方案已确认</span>
      </div>
      <img src="../../../../../static/images/icon_取消4.png" @click="isShow=false">
    </div>
      <!-- 施工方案已确认 -->
    <div class="scroll_wrap">
      <div>
        <div class="order_num">
          <span>订单号  {{orderId}}</span>
          <span> {{orderdetail.orderStateName}} <span v-if="orderdetail.orderCateName">({{orderdetail.orderCateName}})</span></span>
        </div>
        <div class="item_ft">
          <div>
            <div class="user_info">
              <span>{{orderdetail.consignee}}</span>
              <span>{{orderdetail.engineerMobile}}</span>
            </div>
            <div class="address_wrap">
              <img src="../../../../../static/images/icon_16px_位置.png" alt="">
              <span>{{`${orderdetail.province} ${orderdetail.city} ${orderdetail.area} ${orderdetail.street} ${orderdetail.addr}`}}</span>
            </div>
          </div>
            <a :href="'tel:' + orderdetail.engineerMobile" >
            <div class="imgWrap">
              <img src="../../../../../static/images/icon_24px_联系.png" alt="">
            </div>
          </a>
           </div>
        <!--v-for="( item , index ) in orderdetail.orderRequire" :key="index" -->
        <ul class="server_list">
          <li class="ser_item">
            <span class="name">服务类型</span>
            <span>{{orderdetail.orderRequire[0]['cateName']}}</span>
          </li>
          <li class="ser_item">
            <span class="name">服务项目</span>
            <span><i v-for="( item , index ) in orderdetail.orderRequire" :key="index">{{item.requireName}} </i> </span>
          </li>
          <li class="time">
            <p>预约上门时间</p>
            <div>
              <img src="../../../../../static/images/icon_14px_时间.png" alt="">
              <span v-if="appointmentTimeshow">{{orderdetail.startTime}}</span> <span  v-if="appointmentTimeshow"> 至 </span><span  v-if="appointmentTimeshow">{{orderdetail.endTime}}</span>
              <span v-if="!appointmentTimeshow">{{appointmentTime}}</span>
            </div>
            <div class="btn_wrap onlybtnwrap" style="margin-top:10px;border:none;">
          <div class="btn one"  v-if="ordersrc==3"  @click="outcontact">转为失联订单</div>
            <div class="btn one" @click="changeHtml"  v-if="ordersrc=='待施工'&&orderCateName!='争议订单'|| ordersrc=='用户驳回服务方案' ||ordersrc=='服务方案已确认，待施工' ||ordersrc=='服务方案待确认'">转为争议订单</div>
            <div class="btn two" @click="completconstru"  v-if="ordersrc=='服务方案已确认，待施工'">施工完成</div>
            <div class="btn two"  v-if="ordersrc=='待施工'&&orderCateName!='争议订单' || ordersrc=='用户驳回服务方案' ||ordersrc=='服务方案待确认'"  @click="applicacancel">申请退单</div>
            <div class="btn two"  v-if="ordersrc==3" @click="isStartShow=true" >确认上门时间</div>
             <div class="btn one three"  v-if="ordersrc=='时间待确认'"  @click="outcontact">转为失联订单</div>
              <div class="btn one three" @click="changeHtml"  v-if="ordersrc=='施工完成'">转为争议订单</div>
         </div>
          </li>
          
        </ul>
        
        <ul class="things_list">
            <!-- 携带物料 -->
          <!-- <li class="title"  v-if="orderdetail.orderService.length>0">携带物料</li>
          <li class="things_item" v-for="(item ,index ) in orderdetail.orderService" :key="index*Math.random()"> 
            <template v-for="(itemson , indexson ) in item.prodMaterial">
            <ul :key="indexson">
              <li class="outer_wrap">
                <div>
                  <img src="../../../../../static/images/商品.jpg" class="item_img">
                  <span class="name">{{itemson.materialName}}</span>
                </div>
                <div>
                  <span class="sum">1{{item.unit}}</span>
                  <span class="price">￥{{item.totalPrice}}</span>
                </div>
              </li>
            </ul>
            </template>
          </li> -->
           <!-- 携带物料 -->
          <!-- 服务方案 -->
         <li class="title clearfix"  v-if="ordersrc=='待施工'&&orderCateName!='争议订单'"><span class="fl">服务方案 </span><span class="fr serviceplan"  @click="$router.push({path:'/changeservice',query: {orderId:orderId}})">提交服务方案</span></li>
          <li class="title clearfix"  v-if="orderdetail.orderService.length>0"><span class="fl">服务方案 </span><span class="fr" @click="$router.push({path:'/ServiceProDetail',query: {orderId:orderId,stata:state}})">查看全部<van-icon name="arrow" /></span></li>
          <li class="things_item" v-for="item  in orderdetail.orderService" :key="item.prodId"> 
            <!-- <template v-for="(itemson , indexson ) in item.prodMaterial"> -->
            <!-- <ul :key="indexson"> -->
              <div class="outer_wrap">
                <div>
                  <img :src="`${baseurl}image/${item.prodImagePath}`" class="item_img">
                  <span class="name">{{item.prodName}}</span>
                </div>
                <div>
                  <span class="sum">*{{item.prodNum}}</span>
                  <span class="price">￥{{item.totalPrice}}</span>
                </div>
              </div>
            <!-- </ul> -->
            <!-- </template> -->
          </li>
       
          <!-- 服务方案 -->
         
          <li class="money_list">
            <span class="name">应付服务费</span>
            <span class="money">￥{{orderdetail.serviceFee}}</span>
          </li>
          <li class="money_list">
            <span>
              <img src="../../../../../static/images/矩形.png" alt="">
              <span>应付服务费</span>
            </span>
            <span class="money">{{orderdetail.serviceFee}}</span>
          </li>
          <li class="money_list">
            <span class="all_money">实付金额</span>
            <span class="all">￥{{orderdetail.finalFee}}</span>
          </li>
           
        </ul>
         <div class="btn_wrap">
         
            <div class="btn two"  v-if="ordersrc=='用户驳回服务方案' ||ordersrc=='服务方案已确认，待施工' || ordersrc=='服务方案待确认'"  @click="$router.push({path:'/changeservice',query: {orderId:orderId}})" style="margin:0 auto;">变更</div>
           
         </div>
         <OrderCourse :orderCourse="orderCoursedata"></OrderCourse>
        <!-- <textInp text="备注" v-if="ordersrc==11"></textInp> -->
        <userstar v-if="ordersrc=='已完成'"></userstar>
        <div class="send_wrap"  v-if="ordersrc=='已取消'&&orderCateName=='退单订单'||ordersrc=='待上门'&&orderCateName=='退单订单'||orderCateName=='争议订单'||orderCateName=='失联订单'||orderCateName=='故障订单'">
          <div class="title">申报内容</div>
          <ul class="send_list">
            <li class="send_item one">
              <span class="name">提交时间</span>
              <span class="right">{{orderdetail.abnormalCreateTime}}</span>
            </li>
            <li class="send_item two">
              <span class="name">用户反馈</span>
              <span class="right">{{orderdetail.abnormalRemark}}</span>
            </li>
            <li class="send_item two" style="justify-content:flex-start;" v-if="orderdetail.abnormalImagePath.length>0">
             <img  :src="`${baseurl}image/${item}`" v-for="(item , index ) in orderdetail.abnormalImagePath" :key="index*Math.random()" class="imgshenbao">
            </li>
          </ul>
        </div>
       <textInp :text="text" v-if="ordersrc=='待完成订单信息'&&orderCateName!=='故障订单'" :textShow.sync="textShow" src=2 @addemitimgid="addemitimgid" />
      </div>
       
    </div>
    
    <!-- <div class="see_btn" @click="$router.back()" v-if="ordersrc==11 || ordersrc==10">查看全部故障申报</div>  -->
    <div class="see_btn" @click="finishOrder" v-if="ordersrc=='待完成订单信息'">确认提交</div>
     <div class="appointmentbtn appointmentbtnleft" v-if="ordersrc==3 ||changeafter" style="width:50%;"   @click="applicacancel">退单</div> 
    <div class="appointmentbtn appointmentbtnright"  v-if="ordersrc==3 ||changeafter" style="width:50%;" @click="modSubscribeTime">提交</div>
     <Shade v-show="textShow || isStartShow ||loser ||clearshow" @closeshade="closeshade"/>
     <textInp :text="text" v-show="textShow" @emitevent="emitevent" src=1 /> 
      <!-- 拒绝时间 -->
    <div class="loser_success" v-show="loser">
      <img src="../../../../../static/images/错误2.png">
      <p class="p1">客户拒绝了您的预约时间 !</p>
      <p class="p2">更改后的预约时间{{updatetime}}</p>
      <div class="btn" ><div style="color:#000;" @click="loser=false">确认</div><div @click="timeupdate">更改</div></div>
    </div>
 <!-- 拒绝时间 -->
     <!-- 确认上门时间 -->
     <div class="selection" v-show="isStartShow">
      <div class="header">
        <!-- <img src="../../../../../static/images/icon_取消7.png" @click="isStartShow=false"> :textShow.sync="textShow"-->
        <span class="cheeck_btn">确认上门时间</span>
        <!-- <span class="make_sure">确定</span> -->
      </div>
      <!-- <mt-picker :slots="slots" @change="onStartValuesChange"></mt-picker> -->
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        @cancel="cancelTime"
        @confirm="confirmTime"
        :formatter="formatter"
      />
    </div>

 
  </section>

</template>

<script>
//时间戳转日期
// function timestampToTime(timestamp) {
//         var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//         var Y = date.getFullYear() + '-';
//         var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//         var D = date.getDate() + ' ';
//         var h = date.getHours() + ':';
//         var m = date.getMinutes() + ':';
//         var s = date.getSeconds();
//         return Y+M+D+h+m+s;
//     }
  //import BScroll from 'better-scroll'

function formatTen(num) { 
return num > 9 ? (num + "") : ("0" + num); 
} 
 
function formatDate(date) { 
var year = date.getFullYear(); 
var month = date.getMonth() + 1; 
var day = date.getDate(); 
var hour = date.getHours(); 
var minute = date.getMinutes(); 
var second = date.getSeconds(); 
return year + "-" + formatTen(month) + "-" + formatTen(day) + " " + formatTen(hour)+ ":" + formatTen(minute) ; 
} 

import order from "@/api/model/order"
import  OrderCourse from "@/components/OrderCourse"
import  userstar from "@/components/userstar"
import  textInp from "@/components/TextInput/TextInput"
 import base from '@/api/base'; 
   import Shade from '@/components/Shade/Shade'
  export default {
    name: "TroubleOrderDetail",
    data() {
      return {
        changeafter:false,
        loser:false,
       appointmentTime:'',
       appointmentTimeshow:true,
        minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      orderCateName:"",
     updatetime:"",
      currentDate: new Date(),
       orderCate:-1,
        src:2,
        title: '订单详情',
        text:"备注",
        textShow:false,
        ordersrc:-1,
        state:"",
        baseurl:"",
        isShow: true,
        orderId:"",
        postdata:{data:{orderId:""},"requestId":new Date().getTime()},
        finishOrderdata:{  "data": {  "imageId": [   ], "orderId": "",    "remark": ""  },  "requestId": new Date().getTime()},
       
        orderdetail:{abnormalImagePath:[],orderService:[],orderComment:{},orderRequire:[{cateName:""}]},
        orderCoursedata:[],
        orderCourselength:0,
        isStartShow:false,
        clearshow:false
    
      }
    },
    components:{OrderCourse,textInp,userstar,Shade},
     //过滤器的本质 就是一个有参数有返回值的方法
        filters:{
          //顾虑状态
            orderdata:function(myInput){
              //  console.log(arg1);
                //根据业务需要，对传来的数据进行处理
                // 并返回处理后的结果
                var result ="";
                if(myInput==0){
                      result="待处理"
                }
                if(myInput==1){
                      result="完成"
                }
                if(myInput==5){
                      result="处理中"
                }
                return result;
            }
        },
        watch:{
            src(curVal,oldVal){
　　　　　　　　　　if(curVal==1){
                       this.text="备注"
                   }
　　　　　　　　},
        },
        methods:{
          modify(){

          },
          //点击shade关闭shade
          closeshade(){
                this.textShow =false;
                this.isStartShow=false;
                this.loser=false;
                this.clearshow=false;
          },
          //时间更改
          timeupdate(){
                  this.isStartShow=true
                  this.loser=false
                  this.clearshow=true
          },
          //补齐资料
          finishOrder(){
                this.finishOrderdata.data.orderId=this.orderId;
                 order.finishOrder(this.finishOrderdata).then((res) => {
               
                          if(res.code==200){  
                               this.getdetail()
                                
                          }else{
                              this.$tip(res.message)
                          }
                      }).catch((error) => {
                              this.$tip(error)
                                
                      }) 
          },
          addemitimgid(val){
                //this.finishOrderdata.data.imageId.push(...val);
                this.finishOrderdata.data.imageId=val.backImageId;
                this.finishOrderdata.data.remark=val.backReason;
                //console.log(val)
               // console.log( this.finishOrderdata.data.imageId)
          },
          //修改预约时间
          modSubscribeTime(){
              order.modSubscribeTime({ "data": {  "orderId": this.orderId,  "subscribeTime": this.appointmentTime },  "requestId": new Date().getTime()}).then((res) => {
               
                          if(res.code==200){  
                                 this.$tip(res.message)
                                
                          }else{
                              this.$tip(res.message)
                          }
                      }).catch((error) => {
                              this.$tip(error)
                                
                      }) 
          },
             
          emitevent(val){
             this.textShow=false;
             
             //退单
             if( this.src==3){

            
                this.postdata.data.backImageId=val.backImageId;
                this.postdata.data.backReason=val.backReason;
              
               
                order.applyOrderBack(this.postdata).then((res) => {
               
                          if(res.code==200){  
                               this.getdetail()
                                
                          }else{
                              this.$tip(res.message)
                          }
                      }).catch((error) => {
                              this.$tip(error)
                                
                      }) 
              }
              //转为失联
              if( this.src==4){

            
                this.postdata.data.backImageId=val.backImageId;
                this.postdata.data.remark=val.backReason;
              
               
                order.turnOrderLost(this.postdata).then((res) => {
               
                          if(res.code==200){  
                               this.getdetail()
                                
                          }else{
                              this.$tip(res.message)
                          }
                      }).catch((error) => {
                              this.$tip(error)
                                
                      }) 
              }
              //转为争议
              if( this.src==1){

            
                this.postdata.data.backImageId=val.backImageId;
                this.postdata.data.remark=val.backReason;
              
               
                order.turnOrderDispute(this.postdata).then((res) => {
               
                          if(res.code==200){  
                               this.getdetail()
                                
                          }else{
                              this.$tip(res.message)
                          }
                      }).catch((error) => {
                              this.$tip(error)
                                
                      }) 
              }
             //   
          },
          cancelTime(){ //取消timepicker
                 this.isStartShow=false;
                 this.clearshow=false;
          },
          confirmTime(value){ //确定timepicker
              
              this.isStartShow=false;
              if(clearshow){
                  this.changeafter=true;
              }
              this.clearshow=false;
              //console.log(value)
             // var beformTime=value;
             // var afterTime=formatDate(value);

              this.appointmentTime=formatDate(value);
              this.appointmentTimeshow=false;
          },
          formatter(type, value) {
            if (type === 'year') {
              return `${value}年`;
            } else if (type === 'month') {
              return `${value}月`
            }else if (type === 'day') {
              return `${value}日`
            }else if (type === 'hour') {
              return `${value}时`
            }else if (type === 'minute'){
                return `${value}分`
            }
            return value;
          },
          comfirmTime(){

          },
           onStartValuesChange(picker, values) {
              this.startMonth = values[0];
              this.startDay = values[1];
              this.startHours = values[2];
            },
            outcontact(){
                  this.textShow = true;
              this.text = '失联申请';
              this.src=4;
            },
            changeHtml() {
              this.textShow = true;
              this.text = '争议申请';
              this.src=1;
            },
            applicacancel(){
                this.textShow = true;
                this.text = '退单申请';
                this.src=3;
            },
            completconstru(){  //施工完成
                     order.finishService({"data":this.orderId,"requestId":new Date().getTime()}).then((res) => {
               
                          if(res.code==200){  
                               this.getdetail()
                                
                          }else{
                              this.$tip(res.message)
                          }
                      }).catch((error) => {
                              this.$tip(error)
                                
                      }) 
            },
            getdetail(){ //获取订单详情
                   order.getOrderDetail({"data":this.orderId,"requestId":new Date().getTime()}).then((res) => {
               
                        if(res.code==200){                  
                            this.orderdetail=res.data
                            //this.ordersrc=res.data.orderState   
                            this.ordersrc=res.data.orderStateName  
                            this.state=res.data.orderStateName   
                            this.orderCate =res.data.orderCate 
                            this.orderCateName   =  res.data.orderCateName   
                            if(res.data.orderStateName =="用户拒绝预约时间"){
                              this.updatetime= res.data.subscribeTime
                              this.loser=true;
                            }
                        }else{
                                this.$tip(res.message)
                        }
                    }).catch((error) => {
                                this.$tip(error)
                              
                    }) 
            }
        },
    mounted() {
       this.baseurl=base.portSRCFile
      this.orderId=this.$route.query.orderId
      this.postdata.data.orderId=this.orderId
      var timestamp=new Date().getTime()+30*12*60*30*1000;
     // timestampToTime(timestamp)
      
     // this.maxDate= new Date(timestamp)
     // console.log(new Date(timestamp))
       this.getdetail()
         
      //获取订单历程
        order.listOrderCourse({"data":this.orderId,"requestId":new Date().getTime()}).then((res) => {
               
              if(res.code==200){  
                  this.orderCoursedata.push(...res.data)
             
                  
                    
              }else{

              }
          }).catch((error) => {
                        console.log(error)
                    
          })
          
    
    }
  }
    // /deep/ .van-picker-column:nth-child(1){display:none;}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"
  .onlybtnwrap:before{
        background-color:transparent!important;
  }
  i{font-style:normal;}
  .detail_wrap .btn_wrap:before{height:0!important;}
  .serviceplan{border:1px solid  #ccc;line-height:24px;padding:2px 10px;margin-top:12px;}
  .fl{float:left;}
  .fr{float:right;font-size:12px;margin-right:5px;}
  .clearfix:after{content:'';display:block;clear:both;}
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
      display flex
      div
        flex 1

  .selection
      width 100%
      height 280px
      position fixed
      bottom 0
      z-index 100
      background rgba(255, 255, 255, 1)
      .header
        height 52px
        padding 0 16px
        font-size 16px
        display flex
        justify-content center
        align-items center
        bottom-border-1px(#E5EAF3)
      
        img, span
          vertical-align middle
        .cheeck_btn
          font-family PingFangSC-Medium
          font-weight 500
          color rgba(58, 61, 74, 1)
          line-height 22px
         
        .make_sure
          font-family PingFangSC-Regular
          font-weight 400
          color rgba(236, 88, 79, 1)
          line-height 22px
  .detail_wrap
    width 100%
    height 100%
    .order_state
      width 100%
      height 40px
      background #FCDCDA
      padding 0 16px
      box-sizing border-box
      display flex
      align-items center
      justify-content space-between
      
      span
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #EC584F;
        line-height: 20px;
    .scroll_wrap
      width 100%
      
     
      .title
        width 100%
        height 56px
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(58, 61, 74, 1);
        line-height: 56px;
        bottom-border-1px($main)
      .order_num
        width 100%
        height 60px
        background url("../../../../../static/images/订单详情背景.png")
        display flex
        align-items center
        justify-content space-between
        padding 0 16px
        box-sizing border-box
        span
          font-size: 14px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
      .item_ft
        width 100%
        height 82px
        box-sizing border-box
        padding 0 16px
        color: rgba(58, 61, 74, 1);
        display flex
        justify-content space-between
        font-family: PingFangSC-Regular;
        background #fff
        bottom-border-1px($main)
        .user_info
          margin-top 16px
          span
            font-size: 16px;
            font-weight: 400;
            color: rgba(58, 61, 74, 1);
            line-height: 22px;
        .address_wrap
          margin-top 8px
          span
            font-size: 14px;
            font-weight: 400;
            color: rgba(112, 117, 127, 1);
            line-height: 20px;
        .imgWrap
          width 54px
          height 32px
          text-align right
          line-height 32px
          margin-top 20px
          border-left 1px solid $main
      .server_list
        width 100%
        box-sizing border-box
        padding 0 16px
        background #fff
        font-family: PingFangSC-Regular;
        margin-bottom 8px
        .ser_item
          width 100%
          height 48px
          display flex
          align-items center
          justify-content space-between
          bottom-border-1px($main)
          span
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(55, 57, 61, 1);
            line-height: 20px;
          .name
            color: rgba(112, 117, 127, 1);
        .time
          width 100%
         
          padding 16px 0
          box-sizing border-box
          p
            font-size: 16px;
            font-weight: 400;
            color: rgba(58, 61, 74, 1);
            line-height: 22px;
            margin-bottom 8px
          span
            font-size: 14px;
            color: rgba(112, 117, 127, 1);
            line-height: 20px;
      .things_list
        width 100%
        padding 0 16px
        box-sizing border-box
        background #fff
        margin-bottom 8px
        .things_item
          bottom-border-1px($main)
          .outer_wrap
            width 100%
            height 60px
            display flex
            justify-content space-between
            align-items center
            font-size: 14px;
            .item_img
              width 36px
              height 36px
              border-radius: 2px
            .name
              color rgba(55, 57, 61, 1)
              line-height 20px
              margin-left 5px
            .sum
              font-weight: 400
              color: rgba(55, 57, 61, 1)
              line-height: 20px
              margin-right 43px
            .price
              font-weight 500
              color rgba(55, 57, 61, 1)
              line-height 20px
        .money_list
          width 100%
          height 56px
          display flex
          align-items center
          justify-content space-between
          bottom-border-1px($main)
          font-size: 14px;
          font-family: PingFangSC-Regular;
          .name
            font-weight: 400;
            color: rgba(55, 57, 61, 1);
            line-height: 20px;
          .money
            font-weight: 500;
            color: rgba(238, 87, 74, 1);
            line-height: 20px;
          .all_money
            font-size 16px
          .all
            font-size: 16px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(236, 88, 79, 1);
            line-height: 22px;
      .send_wrap
        width 100%
        height 211px
        padding 0 16px
        box-sizing border-box
        background #fff
        margin-bottom 10px
        .send_list
          width 100%
          box-sizing border-box
          background #fff
          font-family: PingFangSC-Regular;
          margin-bottom 8px
          padding-bottom 30px
          .one
            height 50px
          .two
            padding 14px 0
            .imgshenbao
              width 80px
              height 80px

          .send_item
            width 100%
            display flex
            align-items center
            justify-content space-between
            bottom-border-1px($main)
            span
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(55, 57, 61, 1);
              line-height: 20px;
            .right
              display inline-block
              width 65%
              text-align right
            .name
              color: rgba(112, 117, 127, 1);
    .appointmentbtn
      width 50%
      height 48px
      text-align: center
      line-height 48px
      background $red     
      font-size:14px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      z-index 90000
    .appointmentbtnleft
      position fixed
      left 0
      bottom 0
      background #ccc
      color #000
    .appointmentbtnright
      position fixed
      right 0
      bottom 0

    .see_btn
      width 100%
      height 48px
      text-align: center
      line-height 48px
      background $red
      position fixed
      bottom 0
      font-size:14px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      z-index 9000000000000000000
   
    .btn_wrap
          width 100%
         
          top-border-1px($main)
          display flex
          align-items center
          justify-content space-between
          font-size: 14px;
          font-family: PingFangSC-Regular;
          .btn
            width: 45%;
            height: 32px;
            line-height 32px
            text-align: center
            border-radius: 2px;
          .one
            box-sizing border-box
            background: rgba(249, 251, 254, 1);
            border: 1px solid #CACFD7;
          .two
            background: rgba(236, 88, 79, 1);
            color: rgba(255, 255, 255, 1);
          .three
             width: 80%
             margin 0 auto
          
</style>
