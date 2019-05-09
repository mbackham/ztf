<!--信息修改页面-->
<template>
  <section>
    <TopHeader :title="title">
      <img src="../../../../static/images/icon_返回.png" class="return" @click="$router.back()" slot="return">
    </TopHeader>
    <ul class="user_info">
      <li class="info_item item_first">
        <div class="name">头像</div>
        <div style="margin-left:250px">
          <img :src="`http://domch.cn/file-api/image/${menMes.avatarUrl}`" class="headImg">
          <input type="file" ref="file" name="" value="" class="chanPic" @change="upAvatars">
          <img src="../../../../static/images/icon_更多.png" alt="">
        </div>
        <div class="v-simple-cropper">
          <div class="v_cropper_layer" ref="layer">
            <div class="layer_header">
              <button class="cancel" @click="cancelHandle">取消</button>
              <button class="confirm" @click="confirmHandle">确定</button>
            </div>
            <img ref="cropperImg" />
          </div>
        </div>
      </li>
      <li class="info_item">
        <div class="name">姓名</div>
        <input type="text" name="" value="" v-model="menMes.memName" style="outline:none;text-align:right;">
      </li>
      <li class="info_item">
        <div class="name">联系电话</div>
        <input type="text" name="" value="" v-model="menMes.relaPhone"  style="outline:none;text-align:right;">
      </li>
      <li class="info_item" @click="isShow=true">
        <div class="name">地址选择</div>
        <div>
          <span class="info">{{city}}</span>
          <img src="../../../../static/images/icon_更多.png">
        </div>
      </li>
      <li class="info_item">
        <div class="name">详细地址</div>
        <input type="text" placeholder="请输入您的详细地址" class="input" v-model="menMes.addr">
      </li>
    </ul>
    <Shade v-if="isShow" :title="title"/>
    <div class="selection" v-show="isShow">
      <Picker v-on:getValue="have"/>
    </div>
    <footer class="save_btn" @click="saveMes()">保存</footer>
    <div class="save_success" v-show="isShowT">
      <div class="outer_wrap">
        <img src="../../../../static/images/icon_弹窗_完成.png" alt="">
        <p class="win">信息修改成功 !</p>
        <p class="five">5秒后跳转到个人中心页面~</p>
        <div class="sureBtn" @click="isShowT=false">确定</div>
      </div>
    </div>
  </section>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {mapState} from 'vuex'
  import Cropper from 'cropperjs'
  import Shade from '../../../components/Shade/Shade'
  import Picker from '../../../components/Picker/Picker'
  import '@/assets/css/cropper.min.css'
  export default {
    name: "v-simple-cropper",
    data() {
      return {
        title: '信息修改',
        isShowT: false,
        menMes:{},
        isShow:false,
        ressMes:{},
        city:'...'
      }
    },
    components:{
      Picker,
      Shade
    },
    computed:{
      ...mapState(['_token'])
    },
    methods:{
      have(data) {//地址信息
        this.city = data.infoName+data.cityName+data.aereName+data.streetName;
        this.isShow=data.isShow;
        this.ressMes=data;
      },
      //初始化Cropper
      initCro () {
        var cropperImg = this.$refs['cropperImg']
        this.cropper = new Cropper(cropperImg, {
          aspectRatio: 1 / 1,
          dragMode: 'move',
          viewMode:1,
          guides:false,
          cropBoxMovable:false,
          minCropBoxWidth:350,
          minCropBoxHeight:350,
          cropBoxResizable:false
        })
      },
      upAvatars(e){//用户选择图片
        let _this=this;
        let file=e.target.files[0];
        let URL=window.URL||window.webkitURL;
        _this.$refs['layer'].style.display='block';
        _this.cropper.replace(URL.createObjectURL(file))

      },
      cancelHandle () {  //取消裁剪
        this.cropper.reset()
        this.$refs['layer'].style.display = 'none'
        this.$refs['file'].value = '';
      },
      confirmHandle(){//确定裁剪
        let _this=this;
        return new Promise((reject,resolve)=>{
          let cropBox=_this.cropper.getCropBoxData();
          let cropCanvas=_this.cropper.getCroppedCanvas({
            width:cropBox.width*2,
            height:cropBox.height*2,
            borderRadius:50
          });
          let imgData=cropCanvas.toDataURL('image/jpeg',1);
          let basePic=imgData.split(','),mime=basePic[0].match(/:(.*?);/)[1],
          bstr=atob(basePic[1]),n=bstr.length , u8basePic=new Uint8Array(n);
          while(n--){
            u8basePic[n]=bstr.charCodeAt(n);
          }
          let files= new File([u8basePic],"123.png",{type:mime});
          console.log('裁剪后文件',files);
          this.cropper.reset()
          this.$refs['layer'].style.display = 'none'
          this.$refs['file'].value = '';
          Toast({
            message:'该功能暂未开放，敬请期待',
            duration:2000
          })
          reject();
        })
      },
      getUserMes(){
        this.$axios.post(this.Url+'/api/mem/info',{
          "requestId":this.stamp
        },
        {headers:{
          "Content-Type":"application/json",
          "token":localStorage.getItem('token')
        }}
      ).then((res)=>{
        console.log(res);
        this.city=res.data.data.province+res.data.data.city+res.data.data.area
        this.menMes=res.data.data;
      }).catch((err)=>{
        console.log(err)
      })
    },
    saveMes(){
      this.$Indicator.open()
      this.$axios.post(this.Url+'/api/mem/mod',{
        "data":{
          "addr":this.menMes.addr,//详细地址
          "area":this.ressMes.aereName,//区县
          "areaId":this.ressMes.aereID,//区域ID
          "avatarId":"",//头像ID
          "avatarUrl":"",//头像地址
          "city":this.ressMes.cityName,//城市
          "cityId":this.ressMes.cityID,//城市ID
          "memName":this.menMes.memName,//姓名
          "province":this.ressMes.infoName,//省份
          "provinceId":this.ressMes.provincesID,//省份ID
          "relaPhone":this.menMes.relaPhone,//联系电话
          "street":this.ressMes.streetName,//街道
          "streetId":this.ressMes.streetID//街道ID
        },
        "requestId":this.stamp
      },
      {
        "headers":{
          "Content-Type":"application/json",
          "token":localStorage.getItem('token')
        }
      }
    ).then((res)=>{
      this.$Indicator.close()
      this.isShowT=true;
      setTimeout(()=>{
        this.$router.push('/mine')
      },5000)
      }).catch((err)=>{
        console.log(err)
      })
    }
    },
    mounted(){
      this.initCro()
    },
    created(){
      this.getUserMes()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .user_info
    width 100%
    margin-top 8px
    padding-left 16px
    box-sizing border-box
    background: rgba(255, 255, 255, 1)
    span, img
      vertical-align middle
    .info_item
      width: 100%
      height: 48px
      display flex
      align-items center
      justify-content space-between
      padding-right 16px
      box-sizing border-box
      box-shadow: 0 0 0 0 rgba(229, 234, 243, 1)
      bottom-border-1px(#E5EAF3)
      font-size:14px
      position: relative
      .headImg
        width:40px
        height:40px
        border-radius 50%
      .chanPic
        width:40px
        height:40px
        border-radius 50%
        position: absolute
        right: 30px
        opacity: 0
      .name
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(112,117,127,1);
        line-height:20px;
      .info
        color:rgba(58,61,74,1);
        line-height:20px;
      .input
        outline:none!important
        border:0
        text-align: right
    .item_first
      height 68px
      .v-simple-cropper
        .v_cropper_layer
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
          z-index: 9999;
          display: none;
          .layer_header
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            background: #fff;
            width: 100%;
            height: 50px;
            padding-top:5px!important;
            padding: 0 .2rem;
            box-sizing: border-box;
          .cancel
            line-height: 40px;
            background: inherit;
            border: 0;
            outline: 0;
            float: left;
            margin-left:20px!important;
            font-size: 15px
          .confirm
            line-height: 40px;
            background: inherit;
            border: 0;
            outline: 0;
            float: left;
            margin-right:20px;
            font-size: 15px
          .confirm
            float: right;
          img
            position: inherit!important;
            border-radius: inherit!important;
            float: inherit!important;
  .selection
    width 100%
    height 530px
    position fixed
    bottom 0
    z-index 100
    background rgba(255, 255, 255, 1)
    .header
      height 52px
      padding 0 16px
      font-size 16px
      display flex
      justify-content space-between
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
  .save_btn
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
  .save_success
    width 100%
    height 100%
    position fixed
    top 0
    z-index 100
    background:rgba(60,64,72,0.8)
    .outer_wrap
      position fixed
      left 50%
      top 50%
      padding-top 24px
      box-sizing border-box
      text-align: center
      transform translate(-50%,-50%)
      width:311px
      height:250px
      background:rgba(255,255,255,1)
      border-radius:2px
      .win
        font-size:16px
        font-family:PingFangSC-Medium
        font-weight:500
        color:rgba(58,61,74,1)
        line-height:22px
      .five
        margin-top 7px
        font-size:14px
        font-family:PingFangSC-Regular
        font-weight:400
        color:rgba(112,117,127,1)
        line-height:21px
      .sureBtn
        width:311px
        height:48px
        line-height 48px
        position absolute
        bottom 0
        box-shadow:0 1px 0 0 rgba(229,234,243,1)
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(236,88,79,1);
</style>
