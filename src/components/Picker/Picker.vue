<template>
  <!--居住地址三级联动选项-->
  <section>
    <!-- <div class="adress_show ellipsis">
      <div class="area" @click="provinceSelected()">{{Province?Province:info[province-1].name}}</div>
      <div class="area" @click="citySelected()" :class="City?'':'on'">{{City?City:'请选择'}}</div>
      <div class="area" @click="districtSelected()" :class="District?'':'on'" v-show="City">
        {{District?District:'请选择'}}
      </div>
    </div> -->
    <div class="header">
      <img src="../../../static/images/icon_删除.png" @click="closeAdd">
      <span class="cheeck_btn">选择地址</span>
      <span class="make_sure" @click="turnAdd">确定</span>
    </div>
    <p class="showAdd">
      <span @click="showInfo">{{infoName}}</span>
      <span @click="showCityS">{{cityName}}</span>
      <span @click="showAere">{{aereName}}</span>
      <span @click="showStreetT">{{streetName}}</span>
    </p>
    <div class="scroll_wrap">
      <ul ref="selectUl" class="selectUl">
        <li class="addList" v-for="(pro,index) in info" :key="`A-${index}`" @click="getProvinceId(index)"
            v-show="showProvince">{{pro.areaName}}
        </li>
        <li class="addList" v-for="(city,indexT) in infoCity" :key="`B-${indexT}`" @click="getCityId(indexT)"
            v-show="showCity">{{city.areaName}}
        </li>
        <li class="addList" v-for="(aere,indexR) in infoAere" :key="`C-${indexR}`" @click="getDistrictId(indexR)"
            v-show="showDistrict">{{aere.areaName}}
        </li>
        <li class="addList" v-for="(street,indexF) in infoStreet" :key="`D-${indexF}`" ref="street" @click="turnArea(indexF)"
            v-show="showStreet">{{street.areaName}}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import {Toast} from 'mint-ui'
  export default {
    name: 'Picker',
    data() {
      return {
        area: '',
        showChose: false,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showCityList: false,
        showDistrictList: false,
        province: 1,
        city: 3,
        district: '',
        GetProvinceId: 2,
        District: false,
        Province: false,
        City: false,
        showStreet:false,
        // v-for循环判断是否为当前
        selected: false,
        provincesID:'',//省份ID
        info: [],//省份
        infoName:'',//省份名称
        cityName:'',//城市名称
        aereName:'',//区县名称
        streetName:'',//街道名称
        infoCity:[],//城市
        cityID:'',//城市ID
        infoAere:[],//区县
        aereID:'',//区县ID
        infoStreet:[],//街道
        streetID:'',//街道ID
        addMes:{
          infoName:'',
          cityName:'',
          aereName:'',
          streetName:'',
          provincesID:'',
          cityID:'',
          aereID:'',
          streetID:'',
          isShow:false
        }
      }
    },
    computed:{
      ...mapState(['_token'])
    },
    methods: {
      closeAdd: function () {
        this.showProvince=true,
        this.showCity= false,
        this.showDistrict= false,
        this.showStreet=false;
        this.sendValue(this.addMes)
      },
      _filter(add, name, code) {
        let result = [];
        for (let i = 0; i < add.length; i++) {
          if (code == add[i].id) {
            result = add[i][name];
          }
        }
        return result;
      },
      showInfo(){
        this.showProvince=true,
        this.showCity= false,
        this.showDistrict= false,
        this.showStreet=false;
      },
      showCityS(){
        this.showProvince=false,
        this.showCity= true,
        this.showDistrict= false,
        this.showStreet=false;
      },
      showAere(){
        this.showProvince=false,
        this.showCity= false,
        this.showDistrict= true,
        this.showStreet=false;
      },
      showStreetT(){
        this.showProvince=false,
        this.showCity= false,
        this.showDistrict= false,
        this.showStreet=true;
      },
      getProvinceId: function (index) {
        // console.log(this.info[index]);
        this.infoName=this.info[index].areaName;
        this.provincesID=this.info[index].areaId;
        this.$axios.post(this.Url+'/api/area/list',{
          'data':{
            'areaLevel':2,
            'upperAreaId':this.provincesID
          },
          'requestId':this.stamp
        },{
          headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
          }
        }).then((res)=>{
          console.log(res);
          this.infoCity=res.data.data;
        })
        // this.province = code;
        // this.Province = input;
        this.showProvince = false;
        this.showCity = true;
        // this.showDistrict = false;
        // this.showCityList = this._filter(this.info, 'city', this.province);
        // // 点击选择当前
        // this.info.map(a => a.selected = false);
        // this.info[index].selected = true;
        // this.$refs.selectUl.scrollTop = 0;
      },
      getCityId: function (index) {
        // this.city = code;
        // this.City = input;
        this.showProvince = false;
        this.showCity = false;
        this.showDistrict = true;
        this.cityID=this.infoCity[index].areaId;
        this.cityName=this.infoCity[index].areaName;
        this.$axios.post(this.Url+'/api/area/list',{
          'data':{
            'areaLevel':3,
            'upperAreaId':this.cityID
          },
          'requestId':this.stamp
        },{
          headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
          }
        }).then((res)=>{
          console.log(res);
          this.infoAere=res.data.data;
        })
        // this.showDistrictList = this._filter(this.showCityList, 'district', this.city);
        // // 选择当前添加active
        // this.showCityList.map(a => a.selected = false);
        // this.showCityList[index].selected = true;
        // this.$refs.selectUl.scrollTop = 0;
      },
      getDistrictId: function (index) {
        this.aereID=this.infoAere[index].areaId;
        this.aereName=this.infoAere[index].areaName;
        this.showStreet=true;
        this.showProvince = false;
        this.showCity = false;
        this.showDistrict = false;
        this.$axios.post(this.Url+'/api/area/list',{
          'data':{
            'areaLevel':4,
            'upperAreaId':this.aereID
          },
          'requestId':this.stamp
        },{
          headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
          }
        }).then((res)=>{
          console.log(res);
          this.infoStreet=res.data.data;
        })
      },
      turnArea(index){
        this.streetName=this.infoStreet[index].areaName;
        this.streetID=this.infoStreet[index].areaId;
        this.showProvince=false,
        this.showCity= false,
        this.showDistrict= false,
        this.showStreet=true;
        for(let i in this.$refs.street){
          this.$refs.street[i].style.color='black';
          this.$refs.street[index].style.color='#ec584f';
        }
        // this.sendValue(this.addMes)
      },
      //给父组件传值
      sendValue(val) {
        this.$emit('getValue', val);
      },
      turnAdd(){
        if(this.infoName==''){
          Toast('请选择省份')
        }else if(this.cityName==''){
          Toast('请选择城市')
        }else if(this.aereName==''){
          Toast('请选择区县')
        }else{
          this.showProvince=true,
          this.showCity= false,
          this.showDistrict= false,
          this.showStreet=false;
          this.addMes.infoName=this.infoName;
          this.addMes.cityName=this.cityName;
          this.addMes.aereName=this.aereName;
          this.addMes.streetName=this.streetName;
          this.addMes.streetID=this.streetID;
          this.addMes.provincesID=this.provincesID;
          this.addMes.cityID=this.cityID;
          this.addMes.aereID=this.aereID;
          this.sendValue(this.addMes)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap',{
          click: true
        })
      });
      this.$axios.post(this.Url+'/api/area/list',{
        'data':{
          'areaLevel':1,
          'upperAreaId':0
        },
        'requestId':this.stamp
      },{
        headers:{
          'Content-Type':'application/json',
          'token':localStorage.getItem('token')
        }
      }).then((res)=>{
        console.log(res);
        this.info=res.data.data
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
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
    .area
      display inline-block
      margin-right 28px
      position relative
      &.on
        &::after
          width 42px
          height 2px
          content ''
          position absolute
          left 50%
          transform translateX(-50%)
          bottom 1px
          background #EE5147
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
  .showAdd
    width: 100%
    height: 35px
    line-height: 35px
    font-size: 15px
    padding-left:15px
    border-top:1px solid #eee;
    border-bottom:1px solid #eee
    span
      margin-right: 15px
  .scroll_wrap
    width 100%
    height 435px
    padding 0 16px
    box-sizing border-box
    overflow hidden
    .selectUl
      font-size: 14px
      font-family: PingFangSC-Regular
      font-weight: 400
      color: rgba(58, 61, 74, 1)
      .addList
        height 50px
        line-height 50px
        color:black
        &.active
          color: rgba(238, 81, 71, 1);
          background url("../../../static/images/icon_选中.png") no-repeat
          background-position center
</style>
