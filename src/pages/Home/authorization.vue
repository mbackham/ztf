<!--首页-->
<template>
  <section>
    
  </section>
</template>

<script>
 import user from "@/api/user"

//  import AMap from 'AMap'
  export default {
    name: "authorization",
    data(){
      
      return {
        
      }
    },
    mounted() {
        this.getLogin();
    },
    methods:{
   
                getLogin(){//微信授权登录
                    
                    let _this=this;
                
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
                    
                        if(res.rescode==1){
                             let url = 'http://zhongtongfu-wx-test.uworks.cc/cli/dist/#/home';
                             window.location.href = url
                        
                        //                 if(res.data.bindingMobile==1){ //绑定了手机 
                            
                        //     _this.$router.push('/home')
                            
                        //                 }else{
                       
                        //                     _this.$router.push({
                        //                         path:'/associated',
                        //                         query:{
                        //                             grapCode:_this.$Grap.code
                        //                         }
                        //                     })
                        // }
                        localStorage.setItem('bindingMobile',res.data.bindingMobile) //是否绑定了手机
                        // localStorage.setItem('iswechatlogin',1);
                            
                        }else{
                        Toast({
                            message:'未知异常，请稍后再试',
                            duration:2000
                        })
                       
                        }
                    }).catch((err)=>{
                                    console.log(err)
                             
                      })
        
                },
                
  
    }
  }
</script>


