<template>
  <section class="my_wrap">
    <header class="my_header">
      <div class="server_icon">
        <img src="../../../static/images/icon_客服.png" @click="$router.push({path:'/callService'})">
      </div>
      <div class="user">
        <div class="imgbox">
             <van-uploader :after-read="onRead" accept="image/gif, image/jpeg,image/png"  >
              
              </van-uploader>
            <img :src="`${baseurl}image/${avatarPath}`" class="header_img">
        </div>
        <div class="name_wrap">
          <p class="name">{{username}}</p>
          <!-- <p class="see">查看并编辑个人资料</p> -->
        </div>
      </div>
    </header>
    <div class="asset">
      <div class="num">
        <span>总资产(元)</span>
        <p>{{totlemoney}}</p>
      </div>
      <div class="asset_btn" @click="$router.push('/funddetail')">
        <img src="../../../static/images/icon_我的资金.png" alt="">
        <span>资金详情</span>
      </div>
    </div>
    <ul class="list">
      <li class="item" @click="$router.push('/seeaddress')">
        <img src="../../../static/images/icon_位置查看.png" alt="">
        <div class="outer">
          <span>地址查看</span>
          <img src="../../../static/images/标题_首页.png" alt="">
        </div>
      </li>
      <li class="item" @click="$router.push('/seeserve')">
        <img src="../../../static/images/icon_服务查看.png" alt="">
        <div class="outer">
          <span>服务查看</span>
          <img src="../../../static/images/标题_首页.png" alt="">
        </div>
      </li>
      <li class="item" @click="$router.push('/mystar')">
        <img src="../../../static/images/icon_我的星级.png" alt="">
        <div class="outer">
          <span>我的星级</span>
          <img src="../../../static/images/标题_首页.png" alt="">
        </div>
      </li>
      <li class="item" @click="$router.push('/setting')">
        <img src="../../../static/images/icon_设置.png" alt="">
        <div class="outer">
          <span>我的设置</span>
          <img src="../../../static/images/标题_首页.png" alt="">
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
   import user from "@/api/model/user"
   import base from '@/api/base'; 
     import file from '@/api/model/file';
  export default {
    name: "Mine",
     data() {
      return {
        baseurl:"",
        totlemoney:0,
        username:"",
        avatarPath:"",
        computeTime: 0,//倒计时时间
        phone: '',//手机号
        code: '',//验证码
        logindata:{data:{userType:2,clientType:"WEIXIN",clientVersion:"1.0.0"},"requestId": new Date().getTime()}
      }
    },
    created(){
      this.baseurl=base.portSRCFile
        //获取用户信息
         user.userInfo({"requestId": new Date().getTime()}).then( ( res ) => {
              if(res.code==200){  
                console.log(res)            
                      this.username=res.data.userName;
                      this.avatarPath=res.data.avatarPath
                      localStorage.setItem('userid',res.data.userId)
                     
              
              }else{
                this.$tip(res.message)
              }
         }).catch( (error) => {
            console.log(error)
         })
          //获取总金额
          user.totlemoney({"requestId": new Date().getTime(),"data":1}).then( ( res ) => {
                if(res.code==200){  
                  console.log(res)            
                        this.totlemoney=res.data.totalAmount;
                
                }else{
                  this.$tip(res.message)
                }
          }).catch( (error) => {
            console.log(error)
         })

    },
    methods: {
         
      onRead(e) {
        //注意，我们这里没有使用form表单提交文件，所以需要用new FormData来进行提交
                let fd= new FormData();
                fd.append("file", e.file);//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
                
                file.uploadimg(fd)
                    //成功回调
                    .then(resouter => {
                      if(resouter.code==200){
                          console.log(resouter)
                          var avatarpath=resouter.data[0].storePath
                           user.mod({"data":resouter.data[0]['fileId'], "requestId": new Date().getTime()})
                          //成功回调
                          .then(res => {
                            if(res.code==200){
                                this.avatarPath=avatarpath
                             }
                        
                          }) 
                          .catch(err => {this.$tip(err);})
                                                 
                      }
                        
                     }) //将服务器返回的图片链接添加进img数组，进行预览展示
                    //失败回调
                    .catch(err => {this.$tip(err);});
                    


          console.log(file)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .imgbox
    position relative
  .van-uploader
    z-index 1000
    opacity 0
    position absolute
    left 0
    top 0
    bottom 0
    right 0
  .my_wrap
    width 100%
    height 100%
    .my_header
      width 100%
      height 180px
      padding 33px 17px 0
      box-sizing border-box
      background url("../../../static/images/我的_背景1.png") no-repeat
      background-size 100%
      .server_icon
        width 100%
        text-align right
      .user
        width 100%
        display flex
        align-items center
        .header_img
          width 72px
          height 72px
          border-radius 50%
        .name_wrap
          margin-left 12px
          font-family: PingFangSC-Medium;
          .name
            font-size: 18px;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 25px;
          .see
            font-size: 14px;
            font-weight: 400;
            color: rgba(241, 188, 181, 1);
            line-height: 20px;
    .asset
      width: 359px;
      height: 96px;
      margin -30px auto 0
      padding 0 24px
      box-sizing border-box
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 6px -1px rgba(36, 37, 41, 0.1);
      display flex
      justify-content space-between
      align-items center
      margin-bottom 8px
      .num
        font-family: PingFangSC-Regular;
        span
          line-height: 20px
          font-size: 14px;
          color: rgba(112, 117, 127, 1);
        p
          font-size: 30px;
          font-family: DINPro-Medium;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          line-height: 38px;
      .asset_btn
        width: 111px;
        height: 32px;
        line-height 32px
        text-align: center
        color: #F35745
        border 2px solid #F35745
        border-radius 25px
    .list
      width 100%
      height 413px
      padding-left 16px
      box-sizing border-box
      background rgba(255, 255, 255, 1)
      .item
        height 56px
        display flex
        justify-content space-between
        align-items center
        .outer
          width 322px
          height 100%
          display flex
          align-items center
          justify-content space-between
          padding-right 16px
          box-sizing border-box
          bottom-border-1px($main)
          span
            font-size: 16px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(67, 74, 90, 1);
            line-height: 22px;
</style>
