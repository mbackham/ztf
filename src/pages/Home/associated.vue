<!--更换号码页面-->
<template>
  <section>
   <!-- <TopHeader :title="title">

    </TopHeader> -->
	<p class="associated_title">绑定手机</p>
    <ul class="change_list">
      <li class="change_one">
        <span class="name">手机号</span>
        <input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="phone">
      </li>
      <li class="change_two">
        <div class="code">
          <span>验证码</span>
          <input type="tel" placeholder="请输入验证码" maxlength="6" style="width: 100px;" v-model="code">
        </div>
        <button class="getCode" :class="{sendCode:computeTime>0}" @click="getCode" :disabled="computeTime>0">
          {{computeTime > 0 ? `重新获取${computeTime}s` : '获取验证码'}}
        </button>
      </li>
    </ul>
    <p class="saveChange">
      <button type="button" name="button" @click="savePhone">提交</button>
    </p>
  </section>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {mapState} from 'vuex';
  export default {
    name: "ChangeNum",
    data() {
      return {
        title: '绑定手机',
        isShow: false,
        phone: '',
        computeTime: 0,//倒计时时间
        code:'',
		    grapCode:this.$route.query.grapCode,
        isbind:false
      }
    },
    created(){
     // alert(this.userNum)
    },
    
    methods: {
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
      getCode() {
        if (!this.isRightPhone) {
          Toast({
            message: '请输入正确的手机号！',
            duration: 2000
          });
          return false;
        } else {
          this.computeTime = 60;
          const interId = setInterval(() => {
            if (this.computeTime <= 0) {
              clearInterval(interId);
              this.computeTime = 0;
              return
            }
            this.computeTime--;
          }, 1000)
          this.$axios.post(this.Url+'/login/sendAuthCode',{
            "data": this.phone,
            "requestId": this.stamp
          },
          {
            headers:{
              "Content-Type":"application/json",
              "token":localStorage.getItem('token')
            }
          }
        ).then((res)=>{
          console.log(res)
          if(res.data.code==200){
              this.isbind=true;
          }
        

        }).catch((err)=>{
          console.log(err)
        })
        }
      },
      savePhone(){
        if(this.phone==''){
         
           Toast({
            message: '请输入手机号',
            duration: 1000
          });
        }else if(this.code==''){
         
          Toast({
            message: '请输入验证码',
            duration: 1000
          });
        }else{
          
        	this.$axios.post(this.Url+'/api/user/bindingMobile',{
        		"data":
        			{
        				"authCode":this.code,
        				"code": this.GetRequest().code,
        				"mobile": this.phone,
        				"sourceFrom": 1
        			},
        			"requestId": this.stamp
        			},{headers:{
        				'Content-Type':'application/json',
        				'token':localStorage.getItem('token')
        			}}).then((res)=>{
                 if(res.data.code==200){
                     Toast({
                      message: '绑定成功',
                      duration: 1000
                    });
                      this.$router.push('/home')
                      
                 }
        				console.log(res);
        			
        			}).catch((err)=>{
                console.log(err)
                Toast({
                  message: '未知异常,请稍后再试',
                  duration: 1000
                });
        		
        			})
        }
      }
    },
    computed: {
      ...mapState(['_token','userNum']),
      //手机号正则验证
      isRightPhone() {
        return /^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.phone)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .change_list
    width 100%
    font-size: 14px
    margin-top 8px
    padding-left 16px
    box-sizing border-box
    background: rgba(255, 255, 255, 1)
    .change_one
      width: 100%
      height: 48px
      line-height 48px
      padding-right 16px
      box-sizing border-box
      box-shadow: 0 0 0 0 rgba(229, 234, 243, 1)
    .change_two
      width: 100%
      height: 48px
      display flex
      align-items center
      justify-content space-between
      padding-right 16px
      box-sizing border-box
      box-shadow: 0 0 0 0 rgba(229, 234, 243, 1)
      bottom-border-1px(#E5EAF3)
      font-family: PingFangSC-Regular
      .getCode
        height 100%
        color: rgba(238, 81, 71, 1)
        line-height 48px
        background transparent
        border none
        &.sendCode
          color #F6A8A3
    .change_one, .change_two
      .name
        color: rgba(58, 61, 74, 1)
        line-height: 20px
      .info
        color: rgba(58, 61, 74, 1)
        line-height: 20px
      input
        outline none
        color: rgba(58, 61, 74, 1)
        margin-left 16px
        &::-webkit-input-placeholder /*Webkit browsers*/
          color: #ccc
  .saveChange
    width: 96%
    margin:0 auto
    height: 40px
    background: red
    margin-top:15px
    button
      width: 100%
      height:100%
      background: #ec584f
      outline:none
      border:0
      font-size: 16px
      color:white

   .associated_title
	   width:100%
	   height:50px
	   text-align:center
	   line-height:50px
	   background:white
	   font-size:18px
</style>
