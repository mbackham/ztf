<!--新建服务地址页面-->
<template>
  <section>
    <TopHeader :title="title"/>
    <ul class="userInfo_list">
      <li class="userInfo_item" @click="isShow=true">
        <img src="../../../../../static/images/icon_位置.png" class="img_one">
        <div class="item_wrap bottom">
          <span class="item_name">服务地址</span>
          <div class="serve_address ellipsis">
            <span>{{city}}</span>
          </div>
          <img src="../../../../../static/images/icon_更多.png">
        </div>
      </li>
      <li class="userInfo_item item_left">
        <div class="item_wrap bottom">
          <span class="item_name">详细地址</span>
          <input type="text" placeholder="请填写详细地址" v-model="address">
        </div>
      </li>
      <li class="userInfo_item">
        <img src="../../../../../static/images/icon_联系人.png" alt="" class="img_one">
        <div class="item_wrap bottom">
          <span class="item_name">联系人</span>
          <input type="text" placeholder="请输入联系人姓名" v-model="name">
        </div>
      </li>
      <li class="userInfo_item">
        <img src="../../../../../static/images/icon_手机.png" alt="" class="img_one">
        <div class="item_wrap">
          <span class="item_name">联系电话</span>
          <input type="number" placeholder="请填写联系电话" v-model="phone">
        </div>
      </li>
      <img src="../../../../../static/images/地址条.png" alt="">
    </ul>
    <Shade v-if="isShow" :title="title"/>
    <div class="selection" v-show="isShow">
      <Picker v-on:getValue="have"/>
    </div>
    <footer class="save_btn" @click="changeAddress()">保存</footer>
  </section>
</template>
<script>
  import Shade from '../../../../components/Shade/Shade'
  import s from '../../../../../static/json/address4'
  import Picker from '../../../../components/Picker/Picker'
  import {Toast} from 'mint-ui'
  import {mapState} from 'vuex'
  export default {
    name: "NewAddress",
    data() {
      return {
        title: '新建服务地址',
        isShow: false, //遮罩层切换
        address: '',
        phone: '',
        name: '',
        city: '',
        siteArr: [
          {name: "三里屯太古里", text: "北京 朝阳区 建国路(路口)", siteImg: '/static/images/icon_位置.png'},
          {name: "三里屯太古里", text: "北京 朝阳区 建国路(路口)", siteImg: '/static/images/icon_位置.png'},
          {name: "三里屯太古里", text: "北京 朝阳区 建国路(路口)", siteImg: '/static/images/icon_位置.png'},
          {name: "三里屯太古里", text: "北京 朝阳区 建国路(路口)", siteImg: '/static/images/icon_位置.png'},
          {name: "三里屯太古里", text: "北京 朝阳区 建国路(路口)", siteImg: '/static/images/icon_位置.png'},
          {name: "三里屯太古里", text: "北京 朝阳区 建国路(路口)", siteImg: '/static/images/icon_位置.png'},
        ],
        ressMes:{},//地址信息
        addressId:'',
      }
    },
    computed:{
      ...mapState(['_token'])
    },
    methods:{
      isChange(){//判断是否为修改地址
        if(this.$route.query.mes){
          let changeAddmes=this.$route.query.mes
          this.city=changeAddmes.province+changeAddmes.city+changeAddmes.area+changeAddmes.street
          this.address=changeAddmes.addr;
          this.name=changeAddmes.consignee;
          this.phone=changeAddmes.mobile;
          this.addressId=changeAddmes.addressId;
        }
      },
      have(data) {
        this.city = data.infoName+data.cityName+data.aereName+data.streetName;
        this.isShow=data.isShow;
        this.ressMes=data;
      },
      changeAddress(){
        if(this.ressMes.aereID==''){
          Toast('请完善服务地址')
        }else if(this.address==''){
          Toast('请输入详细地址')
        }else if(this.name==''){
          Toast('请输入联系人')
        }else if(this.phone==''){
          Toast('请输入联系人电话')
        }else if(!/^1[3|4|5|7|8|9][0-9]\d{8}$/.test(this.phone)){
          Toast('请输入正确的手机号')
        }else{
          this.$Indicator.open()
          this.$axios.post(this.Url+'/api/memAddr/add',{
            "data":{
              "addr":this.address,//详细地址
              "addressId":this.addressId,//详细地址ID
              "area":this.ressMes.aereName,//区县地址
              "areaId":this.ressMes.aereID,//区县ID
              "city":this.ressMes.cityName,//城市
              "cityId":this.ressMes.cityID,//城市ID;
              "consignee":this.name,//联系人
              "isDefault":0,//是否设置默认地址
              "mobile":this.phone,//联系电话
              "province":this.ressMes.infoName,//省份
              "provinceId":this.ressMes.provincesID,//省份ID
              "street":this.ressMes.streetName,//街道,
              "streetId":this.ressMes.streetID//街道ID
            },
            "requestId":this.stamp
          },{headers:{"Content-Type":"application/json","token":localStorage.getItem('token')
        }}).then((res)=>{
          console.log(res)
          this.$Indicator.close()
          if(res.data.code==200){
            Toast('保存成功');
            setTimeout(()=>{
              this.$router.back();
            },1000)
          }
        }).catch((err)=>{
          this.$Indicator.close()
          console.log(err)
        })
        }

      }
    },
    components: {
      Shade,
      Picker
    },
    mounted(){
      this.isChange()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"

  .userInfo_list
    background-color rgba(255, 255, 255, 1)
    .userInfo_item
      height 48px
      display flex
      align-items center
      padding-left 17px
      font-size 16px
      .item_wrap
        height 100%
        width 335px
        padding-right 16px
        box-sizing border-box
        display flex
        align-items center
        box-shadow 0 0 0 0 rgba(229, 234, 243, 1)
        input 
         border none
      .bottom
        bottom-border-1px(#E5EAF3)
      .item_name
        font-family PingFangSC-Regular
        font-weight 400
        color rgba(112, 117, 127, 1)
        line-height 22px
      input
        outline none
      input, .serve_address
        margin-left 16px
      .serve_address
        display inline-block
        width 222px
      .user_name
        margin-left 32px
      .img_one
        margin-right 10px
    .item_left
      padding-left 40px

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
    .adress_show
      width 100%
      padding 0 16px
      box-sizing border-box
      height 48px
      line-height 48px
      font-size 14px
      font-family PingFangSC-Regular
      font-weight 400
      color rgba(58, 61, 74, 1)
      box-shadow 0px 0px 0px 0px rgba(229, 234, 243, 1)
      bottom-border-1px(#E5EAF3)
      span
        margin-right 28px

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
</style>
