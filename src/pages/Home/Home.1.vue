<!--首页-->
<template>
  <section class="home_wrap">
    <header class="header">
      <nav class="navBar">
        <img src="../../../static/images/icon_首页_位置@2x.png"  class="mapicon">
        <span class="address">{{region}}</span>
        <!-- <img src="../../../static/images/icon_首页_更多.png" alt=""> -->
        <img src="../../../static/images/icon_首页_客服@2x.png" alt="" class="service_icon"  @click="$router.push('/call')">
      </nav>
      <!-- <input type="text" class="search" placeholder="请输入搜索" @click="$router.push('/search')">
      <img src="../../../static/images/icon_搜索.png" alt="" class="search_icon"> -->
    </header>
    <div class="viewImg">
      <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-if="swiperImg.length>0"  v-for="( item ,index ) in swiperImg" :key="index">
            <img :src="`${imgurl}/image/${item.smallImagePath}`" >
          </div>
          <!-- <div class="swiper-slide">
            <img src="../../../static/images/客服.jpg" alt="">
          </div>
          <div class="swiper-slide">
            <img src="../../../static/images/客服.jpg" alt="">
          </div> -->
      </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
</div>
    </div>
    <ul class="btn_list">
      <li class="btn_item" @click="$router.push('/need_put')">
        <img src="../../../static/images/icon_提交需求@2x.png" alt="">
        <span>需求提交</span>
      </li>
      <li class="btn_item">
        <img src="../../../static/images/icon_优惠券@2x.png" alt="">
        <span>优惠券</span>
      </li>
      <li class="btn_item">
        <img src="../../../static/images/icon_线上商城@2x.png" alt="">
        <span>线上商城</span>
      </li>
      <li class="btn_item" @click="$router.push('/project')">
        <img src="../../../static/images/服务方案@2x.png" alt="">
        <span>服务方案</span>
      </li>
      <li class="btn_item" @click="$router.push('/send_trouble')">
        <img src="../../../static/images/故障方案@2x.png" alt="">
        <span>故障申报</span>
      </li>
    </ul>
    <img src="../../../static/images/icon_banner.png" alt="" class="home_img">
    <ul class="way_list">
      <li class="way_item item_right item_bottom" @click="$router.push('/need_put')">
        <img src="../../../static/images/首页_综合布线@2x.png" alt="">
      </li>
      <li class="way_item item_bottom" @click="$router.push('/need_put')">
        <img src="../../../static/images/首页_无线网组@2x.png" alt="">
      </li>
      <li class="way_item item_right" @click="$router.push('/need_put')">
        <img src="../../../static/images/首页_网络优化@2x.png" alt="">
      </li>
      <li class="way_item" @click="$router.push('/need_put')">
        <img src="../../../static/images/首页_宽带测速@2x.png" alt="">
      </li>
    </ul>
    <router-view/>
  </section>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {Toast} from 'mint-ui'
import Swiper from 'swiper'
  import user from "@/api/user"
import 'swiper/dist/css/swiper.min.css'
import wx from 'weixin-js-sdk'
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole

//  import AMap from 'AMap'
  export default {
    name: "Home",
    data(){
      
      return {
        imgurl:"http://domch.cn/file-api",
				phone: '',
				computeTime: 0,//倒计时时间
				code:'',
        region:'...',//地区
        bindingMobile:-1,
        isuserwechat:false,
        componenname:"",
        swiperImg:[]
      }
    },

    computed:{
      ...mapState(['_token']),
			//手机号正则验证
			isRightPhone() {
				return /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.phone)
			}
    },
    beforeRouteEnter (to, from, next) {
         if( localStorage.getItem('bindingMobile')==0&&!from.name){
              _this.$router.push({
									path:'/associated',
									query:{
										grapCode:_this.$Grap.code
									}
								})
          }
          next()
    },
    beforeRouteLeave (to, from, next) {
     // if(to.name!="order"||to.name!="mine"||to.name!="mine"){ 
      if(to.meta.homebackstop){
         next(false)
      }else{
        next()
      }
    },
    methods:{
      ...mapActions(['token_fn','customer_fn','appointment_fn']),
      getConfig(){//获取系统配置
        let _this=this;
        _this.$axios.post(_this.Url+'/api/conf/getSmConf',{

          "requestId":_this.stamp
        }).then((res)=>{
          _this.customer_fn(res.data.data.csPhone);
          _this.appointment_fn(res.data.data.subscribeFee);
        })
      },
      GetRequest() {  
          var url = location.search; //获取url中"?"符后的字串  
          var theRequest = new Object();  
          if (url.indexOf("?") != -1) {  
              var str = url.substr(1);  
              var strs = str.split("&");  
              for(var i = 0; i < strs.length; i ++) {  
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
              }  
          }  
          return theRequest;  
      },
      getLogin(){//微信授权登录
        
        let _this=this;
        // alert('调用微信登陆')
      //  setTimeout(()=>{
          // _this.$Indicator.open();
          // _this.$axios.post(_this.Url+'/login/oauthLogin',{
          //   "data":{
					// 		"clientType": "WEIXIN",
					// 		"clientVersion": "1.0.0",
          //     "code":_this.$Grap.code,
          //     "sourceFrom":1
          //   },
          //   "requestId":_this.stamp
          // },
          // {headers:{
          //   "Content-Type":"application/json"
          // }})
          user.oauthLogin({ 
            "data":{
							"clientType": "WEIXIN",
							"clientVersion": "1.0.0",
              "code":_this.$Grap.code,
              "sourceFrom":1
            },
            "requestId":_this.stamp
          }).then((res)=>{
           console.log(res)
            if(res.code!=200){             
             Toast({
                message:res.message,
                duration:2000
              })
              return;
           }     
            localStorage.setItem('token',res.data.token);
           // this.getConfig();
            this.selectPartContent()
            this.getLocationPage();
            this.isuserwechat=true          
            if(res.rescode==1){
             
							if(res.data.bindingMobile==1){ //绑定了手机 
                 
                 _this.$router.push('/home')
                
							}else{
               // alert('ss')
								_this.$router.push({
									path:'/associated',
									query:{
										grapCode:_this.$Grap.code
									}
								})
              }
              localStorage.setItem('bindingMobile',res.data.bindingMobile) //是否绑定了手机
               localStorage.setItem('iswechatlogin',1);
                
            }else{
              Toast({
                message:'未知异常，请稍后再试',
                duration:2000
              })
              // setTimeout(()=>{
              //   _this.$router.push('/login')
              // },2100)
            }
          }).catch((err)=>{
						console.log(err)
						// Toast('未知异常，请稍后再试');
          //  _this.$Indicator.close();
						// _this.$router.push('/login')
					})
       // },500)
      },
      //获取幻灯片
      selectPartContent(){
    
           user.selectPartContent({
                 data: 1,
                requestId:this.stamp
              })
              .then(res=>{
                console.log(res);
                if(res.code == 200){
             
                    this.swiperImg .push(...res.data)
                  console.log( this.swiperImg)
                  setTimeout(function(){
                          var mySwiper = new Swiper ('.swiper-container', {
                      loop: true, // 循环模式选项

                      // 如果需要分页器
                      pagination: {
                        el: '.swiper-pagination',
                      },
                    })
                  },0)
                  
              }
               // swiperImg
              }).catch(error => {
               // console.log(error);
              })
      },
          showCityInfo() {
            //实例化城市查询类
            var citysearch = new AMap.CitySearch();
            var _this=this;
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity(function(status, result) {
              console.log(status, result)
                if (status === 'complete' && result.info === 'OK') {
                
                    if (result && result.city && result.bounds) {
                        var cityinfo = result.city;
                        var citybounds = result.bounds;
                        console.log(cityinfo)
                        _this.region=cityinfo;
                        //地图显示当前城市
                       // map.setBounds(citybounds);
                    }
                } else {
                  console.log(result)
                     _this.region= result.info;
                }
            });
        },
         getLocationPage(){
           
             var  _this = this;
             const url =location.href.split('#')[0]
             _this.$axios.post(_this.Url+'/api/user/getWxJsSdkConf',{
               'data':url, 
               'requestId':_this.stamp
             },{
               headers:{
                 'Content-Type':'application/json',
                 'token': localStorage.getItem('token')
               }
             }).then((resgeo)=>{
              const result = resgeo.data;
              wx.config({
                debug: true, 
                 appId: result.data.appId, // 必填，公众号的唯一标识
                 timestamp:result.data.timestamp, // 必填，生成签名的时间戳
                 nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
                 signature: result.data.signature,// 必填，签名
                 jsApiList: [
                   'getLocation',
                 ] 
              });
             }).catch((err) =>{
                 console.log(err)
             })
         }
     
  
    },
  
    mounted(){
     let vConsole = new VConsole() // 初始化
      var _this=this;

      if(localStorage.getItem('token')){
            this.selectPartContent();
          this.getLocationPage();
           
      }else{
        this.getLogin()
        setTimeout(function(){
           _this.getLocationPage();
        },6000)
      }
    

        wx.ready(()=>{  
                
              if(!localStorage.getItem('region')){ 
                   
                        wx.getLocation({
                          type:'wgs84',
                          success:function(res){
                                var lat     = res.latitude;
                                var number  = String(lat).replace(/^(.*\..{6}).*$/,"$1");
                                var lats    = Number(number);
                                var lng     = res.longitude;
                                var numberT = String(lng).replace(/^(.*\..{6}).*$/,"$1");
                                var lngs    = Number(numberT);
                              
                                _this.$axios.post(
                                  'https://restapi.amap.com/v3/geocode/regeo?parameters&key=6b40a990bebaa40169bae9ccec916867&location='+
                                  lngs+','+lats+'&sig=b86edc53ff7835dd27e897ac7af3abef&output=JSON').then((res)=>{
                                    _this.region = res.data.regeocode.addressComponent.district;
                                    localStorage.setItem('region',_this.region)
                                  
                                  })
                          },
                          cancel:function(res){
                            alert('用户拒绝共享位置信息')
                          }
                        })
                 
              } else{
                  _this.region =localStorage.getItem('region');
              }  
         
        })



          var map = new AMap.Map("container", {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 13
    });
  
    
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .mapicon
    width 16px
  .home_wrap
    width 100%
    height 100%
    padding 30px 8px 0
    border-bottom 1px solid #D7DBE3
    box-sizing border-box
    background-image url("../../../static/images/首页_背景.png")
    background-repeat no-repeat
    background-size 100%
    .header
      width 100%
      .navBar
        font-size 16px
        padding 0px 8px 0 10px
        position relative
        img
          vertical-align middle
        .address
          font-family PingFangSC-Medium
          font-weight 500
          color rgba(255,255,255,1)
          vertical-align middle
        .service_icon
          width 30px
          position absolute
          top 1px
          right 16px
      .search
        width 100%
        height 36px
        margin-top 11px
        padding-left 40px
        box-sizing border-box
        background rgba(255,255,255,1)
        border-radius 4px
        color #A1A7B3
        font-size 14px
        &::-webkit-input-placeholder/*Webkit browsers*/
          color:#ccc
      .search_icon
        position absolute
        top 70px
        left 25px
    .home_img
      width 100%
    .viewImg
      width 100%
      height 152px

      margin 20px 0 21px
      box-shadow 0 6px 22px -4px rgba(27,31,51,0.4)
      border-radius 4px
      .swiper-container
        height: 100%
        .swiper-wrapper
          height: 100%
          .swiper-slide
            height: 100%
            img
              object-fit cover
              width 100%
              height 100%
              border-radius 4px
    .btn_list
      width 100%
      display flex
      margin-bottom 12px
      .btn_item
        width 20%
        
        display flex
        justify-items center
        align-items center
        flex-direction column
        img
          width 75%
        span
          margin-top 8px
          font-size 13px
          font-family PingFangSC-Medium
          font-weight 500
          color rgba(58,60,63,1)
          line-height 18px
    .way_list
      width 100%
      margin-top 10px
      clearFix()
      .way_item
        width 176px
        float left
        img
          width 100%
          height 100%
      .item_bottom
        margin-bottom 8px
      .item_right
        margin-right 7px
		.modePhone
			width:300px
			height:220px
			background:white
			position fixed
			top:50%
			left: 50%
			margin-top:-110px
			margin-left:-150px
			z-index:2
			border-radius:8px
			overflow:hidden
			.subBtn
				.turnB
					width:100%
					height 40px
					margin-top:30px
					border:0
					background:#ee5147
					color white
					font-size:14px
			.modePhone_title
				color:#666
				width:100%
				text-align:center
				padding-top:30px
				box-shadow:border-box
				font-size:16px
			.change_list
				width 100%
				font-size: 14px
				margin-top 8px
				padding-left 16px
				box-sizing border-box
				background: rgba(255, 255, 255, 1)
				li
				 bottom-border-1px(#E5EAF3)

				.change_one
					width: 100%
					height: 48px
					line-height 48px
					padding-right 16px
					box-sizing border-box
					box-shadow: 0 0 0 0 rgba(229, 234, 243, 1)
					margin-top:10px
				.change_two
					width: 100%
					height: 48px
					display flex
					align-items center
					justify-content space-between
					padding-right 16px
					box-sizing border-box
					box-shadow: 0 0 0 0 rgba(229, 234, 243, 1)

					font-family: PingFangSC-Regular
					.getCode
						height 100%
						color: rgba(238, 81, 71, 1)
						line-height 48px
						background transparent
						border none
						font-size 14px
						&.sendCode
							color #F6A8A3
				.change_one, .change_two
					.name
						color: rgba(58, 61, 74, 1)
						line-height: 20px
					.info
						color: rgba(58, 61, 74, 1)
						line-height: 20px
						font-size 18px
					input
						outline none
						color: rgba(58, 61, 74, 1)
						margin-left 16px
						&::-webkit-input-placeholder /*Webkit browsers*/
							color: #ccc
							font-size 14px
		.modePhone_mask
			width:100%
			height:100%
			background:rgba(0,0,0,.5)
			position fixed
			top:0
			left:0
			z-index:1
</style>
