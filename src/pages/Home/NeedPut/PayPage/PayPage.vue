<template>
  <section>
    <TopHeader :title="title"/>
    <div class="hint_wrap" v-show="isShow">
      <img src="../../../../../static/images/icon_通知.png" alt="">
      <span>请在 {{withinT}} 前完成支付！</span>
      <img src="../../../../../static/images/icon_通知关闭1.png" class="close" @click="isShow=false">
    </div>
    <div class="money_box">
      <div>
        <p class="title">预约金</p>
      </div>
      <div class="money_num">￥{{appointment}}</div>
    </div>
    <ul class="payment_list">
      <li class="payment_item" v-for="(pay,index) in payMentArr" :key="index">
        <img src="../../../../../static/images/微信支付.png">
        <span class="pay_name">{{pay.name}}</span>
        <span class="checked" :class="{on: index===num}" @click="payWay(index)"></span>
      </li>
    </ul>
    <p class="agree">
      <img src="../../../../../static/images/icon_未选中（小）.png" v-if="isChecked" @click="updataImg">
      <img src="../../../../../static/images/icon_选中（小）.png" v-else @click="updataImg">
      我同意并遵守<span @click="$router.push('/agreement')">《客户服务协议》</span>
    </p>
    <div class="hint_box">提示：装维人员上门前 2小时内 不允许用户执行退单操作，在支付全部服务费时可抵扣 ￥{{appointment}} 服务费</div>
    <footer class="pay_btn" @click="payMount">支付</footer>

  </section>
</template>

<script>
import {Indicator,Toast} from 'mint-ui'
import {mapState} from 'vuex'
import wx from 'weixin-js-sdk'
  export default {
    name: "PayPage",
    data() {
      return {
        title: '支付预约金',
        num: 0,
        isChecked: true,
        isShow: true,
        payMentArr: [
          {name: '微信支付', imgUrl: '../../../../../static/images/微信支付.png'},
          // {name: '支付宝支付', imgUrl: '../../../../../static/images/支付宝.png'}
        ],
        dateT:new Date(),
        withinT:null,//支付过期时间
        orderNum:null,//订单号
        wxjson:{}
      }
    },
    computed:{
      ...mapState(['_token','appointment'])
    },
    methods: {
      updataImg() {
        this.isChecked = !this.isChecked
      },
      payWay(index){//支付方式
        console.log(index);
        this.num=index
      },
      payMount(){//支付  0微信  1支付宝
        // if(this.num==0){
      
        let _this=this;
        if(this.isChecked){
          Toast('请同意客户服务协议')
        }else{
          Indicator.open();
          this.$axios.post(_this.Url+'/api/pay/wxMpPay',{
            "data": {
              "orderId": _this.orderNum,
              "payCate": 1
            },
            "requestId": _this.stamp
          },{
            headers:{
              "Content-Type":"application/json",
              "token": localStorage.getItem("token") //_this._token
            }
          }).then((res)=>{
            //alert(res.data.message)
            console.log(res)
            Indicator.close();
            _this.wxjson=res.data.data;
            _this.wx_pay()
          }).catch((err)=>{
            console.log(err)
          })
        }
      },
        wx_pay(){
                let _this=this;
               
                // _this.$axios.post(_this.Url+'/api/user/getWxJsSdkConf',{
                //   'data':url,//_this.urls,
                //   'requestId':_this.stamp
                // },{
                //   headers:{
                //     'Content-Type':'application/json',
                //     'token': localStorage.getItem('token')
                //   }
                // }).then((res)=>{
                //   let result = res.data
                // // alert(result.data.signature)
                //   wx.config({
                //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                //     appId: result.data.appId, // 必填，公众号的唯一标识
                //     timestamp:result.data.timestamp, // 必填，生成签名的时间戳
                //     nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
                //     signature: result.data.signature,// 必填，签名
                //     jsApiList: [
                //       'chooseWXPay'
                //     ] // 必填，需要使用的JS接口列表
                //   });
                  
                 // wx.ready(()=>{
                    wx.chooseWXPay({
                      appId:_this.wxjson.appId,
                      nonceStr:_this.wxjson.nonceStr,
                      timestamp:_this.wxjson.timeStamp,//支付签名时间戳
                      package:_this.wxjson.wxpayPackage,//支付签名随机串
                      signType:_this.wxjson.signType,//签名方式
                      paySign:_this.wxjson.sign,//支付签名
                      success:((res)=>{
                        if(res.errMsg == 'chooseWXPay:ok'){
                          //支付成功
                          Toast('支付成功')
                      
                            _this.$router.push('/home')
                        
                        }else{
                          Toast('支付失败'+res.errMsg)
                        }
                      }),
                      cancel:((res)=>{
                        //支付取消
                        Toast('支付取消')
                      }),
                      fail:((res)=>{
                        //支付异常
                        Toast('支付异常，请稍后再试'+JSON.stringify(res))
                      })
                    })
                //  })
                  // wx.error(function(res){
                  // alert('error'+JSON.stringify(res))
                  // })
              
              }
      
    },
    created(){
      let a=this.dateT.getTime()+24*60*60*1000;
      let b=new Date(a);
      let year=b.getFullYear();
      let mon=b.getMonth()+1;
      if(mon<10){
        mon='0'+mon
      }
      let day=b.getDate();
      if(day<10){
        day='0'+day
      }
      this.withinT=year+'-'+mon+'-'+day;
      this.orderNum=this.$route.query.Uid
    },
    mounted() {
        let url = encodeURIComponent(location.href.split('#')[0])
        this.$axios.post(this.Url+'/api/user/getWxJsSdkConf',{
                  'data':url,//_this.urls,
                  'requestId':this.stamp
                },{
                  headers:{
                    'Content-Type':'application/json',
                    'token': localStorage.getItem('token')
                  }
                }).then((res)=>{
                  let result = res.data
                // alert(result.data.signature)
                  wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: result.data.appId, // 必填，公众号的唯一标识
                    timestamp:result.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
                    signature: result.data.signature,// 必填，签名
                    jsApiList: [
                      'chooseWXPay'
                    ] // 必填，需要使用的JS接口列表
                  });
                    })
              
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"

  .hint_wrap
    width 100%
    height 40px
    line-height 40px
    background rgba(254, 236, 207, 1)
    font-size 14px
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(248, 162, 16, 1)
    padding 0 16px
    box-sizing border-box
    position relative
    img, span
      vertical-align middle
    .close
      position absolute
      top 13px
      right 16px

  .money_box
    width 100%
    height 72px
    background: rgba(255, 255, 255, 1)
    padding 16px 16px
    box-sizing border-box
    display flex
    justify-content space-between
    align-items center
    .title
      font-size 18px
      font-family PingFangSC-Medium
      font-weight bold
      color rgba(58, 61, 74, 1)
      // margin-bottom 8px
    .detail
      font-size: 14px
      font-family: PingFangSC-Regular
      font-weight: 400
      color: rgba(112, 117, 127, 1)
      line-height: 20px
    .money_num
      font-size 20px
      font-family PingFangSC-Medium
      font-weight 500
      color rgba(236, 88, 79, 1)
      line-height 24px

  .payment_list
    width 100%
    padding-left 16px
    box-sizing border-box
    background rgba(255, 255, 255, 1)
    margin-top 8px
    .payment_item
      height 56px
      line-height 56px
      position relative
      bottom-border-1px(#E5EAF3)
      img, span
        vertical-align middle
      img
        margin-right 5px
      .pay_name
        font-size: 16px
        font-family: PingFangSC-Regular
        font-weight: 400
        color: rgba(58, 61, 74, 1)
        line-height: 22px
      .checked
        display inline-block
        width 16px
        height 16px
        position absolute
        right 16px
        top 17px
        background url("../../../../../static/images/icon_未选中（小）.png") no-repeat
        &.on
          background url("../../../../../static/images/icon_选中（小）.png") no-repeat

  .agree
    margin-top 16px
    padding-left 16px
    font-size: 14px
    font-family: PingFangSC-Regular
    font-weight: 400;
    color: rgba(161, 167, 179, 1);
    line-height: 20px;
    img, span
      vertical-align middle
    span
      color #EE5147

  .hint_box
    padding 0 16px
    font-size: 14px
    font-family: PingFangSC-Regular
    font-weight: 400;
    color: rgba(161, 167, 179, 1);
    line-height: 18px;
    margin-top 8px

  .pay_btn
    width 100%
    height 50px
    text-align center
    line-height 50px
    position fixed
    bottom 0
    background rgba(236, 88, 79, 1)
    font-size 16px
    font-family PingFangSC-Medium
    font-weight 500
    color rgba(255, 255, 255, 1)
</style>
