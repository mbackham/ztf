<!--完善信息页面-->
<template>
  <section>
    <TopHeader :title="title"/>
    <div class="add_address" v-show="isRess" @click="$router.push('/address')">
      <img src="../../../../../static/images/icon_添加地址.png" alt="">
      <span>请添加服务地址</span>
      <img src="../../../../../static/images/icon_更多.png" class="more">
    </div>
    <div class="has_address" v-show="hasRess">
      <ul class="userInfo_list">
        <li class="userInfo_item" @click="$router.push('/address')">
          <img src="../../../../../static/images/icon_位置.png" class="img_one">
          <div class="item_wrap bottom">
            <span class="item_name">服务地址</span>
            <div class="serve_address ellipsis">
              <span>{{addr.city}}</span>
            </div>
            <img src="../../../../../static/images/icon_更多.png">
          </div>
        </li>
        <li class="userInfo_item item_left">
          <div class="item_wrap bottom">
            <span class="item_name">详细地址</span>
            <span class="res">{{addr.addr}}</span>
          </div>
        </li>
        <li class="userInfo_item">
          <img src="../../../../../static/images/icon_联系人.png" alt="" class="img_one">
          <div class="item_wrap bottom">
            <span class="item_name">联系人</span>
            <span class="res resman">{{addr.consignee}}</span>
          </div>
        </li>
        <li class="userInfo_item">
          <img src="../../../../../static/images/icon_手机.png" alt="" class="img_one">
          <div class="item_wrap">
            <span class="item_name">联系电话</span>
            <span class="res">{{addr.mobile}}</span>
          </div>
        </li>
        <img src="../../../../../static/images/地址条.png" alt="">
      </ul>
    </div>


    <div class="order_time">
      <img src="../../../../../static/images/icon_时间2.png" alt="">
      <span>预约上门时段</span>
    </div>
    <div class="start_end_time">
      <div class="start" :class="{height: endMonth&&endMonth&&endHours}" @click="starTime">
        <p>预约开始时间</p>
        <span>{{startTimeV}}</span>
      </div>
      <div class="end" :class="{height: endMonth&&endMonth&&endHours}" @click="enTime">
        <p>预约结束时间</p>
        <span>{{endTimeV}}</span>
      </div>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="datetime"
      :startDate="sTime"
      @confirm="turnTime"
      v-model="startTime">
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="pickerEnd"
      type="datetime"
      @confirm="turnTimeEnd"
      :startDate="eTime"
      v-model="endTime">
    </mt-datetime-picker>
    <ul class="server_list">
      <li class="item bottom">
        <span class="item_name">服务类型</span>
        <span class="item_content">{{typeP}}</span>
      </li>
      <li class="item bottom">
        <span class="item_name">服务项目</span>
        <span class="item_content">{{turnText}}</span>
      </li>
      <li class="item">
        <span class="item_name">上门服务预约金</span>
        <span class="price">￥{{appointment}}</span>
      </li>
    </ul>
    <p class="hint">提示：您支付的￥{{appointment}}上门服务预约金在工程师上门前退单可退还，在支付全部服务费用时可抵扣￥{{appointment}}服务费用。</p>
    <div class="pay">
      <div class="pay_sum">预约金
        <span class="price">￥{{appointment}}</span>
      </div>
      <!-- $router.push('/pay_page')? -->
      <div class="pay_btn" @click="payOrder">支付</div>
    </div>
  </section>
</template>

<script>
  import Shade from '../../../../components/Shade/Shade'
  import PayBtn from '../../../../components/PayBtn/PayBtn'
  import UserInfoList from '../../../../components/UserInfoList/UserInfoList'
  import {mapState,mapActions} from 'vuex'
  import {Toast,Indicator} from 'mint-ui'
  export default {
    name: "PerfectMessage",
    data() {
      return {
        title: '信息完善',
        isStartShow: false,//选择预约开始时间显示/隐藏
        isEndShow: false,//选择预约结束时间显示/隐藏
        sTime:new Date(),
        eTime:new Date(new Date().getTime()+300000),
        endTime: null,//结束时间显示/隐藏
        startMonth: '',//预约开始月份
        startDay: '',//预约开始日期
        startHours: '',//预约开始小时
        endMonth: '',//预约结束月份
        endDay: '',//预约结束日期
        endHours: '',//预约结束小时
        choseList:[],//服务列表
        turnText:null,//服务项目
        typeP:null,//服务类型
        isRess:true,//没选择地址时
        hasRess:false,//已有地址
        startTime:null,//预约开始i时间
        plstartTime:null,
        pendTime:null,
        upStart:null,//上传开始时间
        upEnd:null,//上传结束时间
      }
    },
    watch:{
      startTime(val,oldVal){
        console.log(val);
        let date=new Date(val);
        let year=date.getFullYear();
        let mon=date.getMonth()+1;
        if(mon<10){
          mon='0'+mon
        }
        let day=date.getDate();
        if(day<10){
          day='0'+day;
        }
        let hour=date.getHours();
        if(hour<10){
          hour="0"+hour
        }
        let min=date.getMinutes();
        if(min<10){
          min='0'+min;
        }
        let sec=date.getSeconds();
        if(sec<10){
          sec='0'+sec
        }
        this.plstartTime=year+'/'+mon+'/'+day+'/'+hour+':'+min;
        this.upStart=year+'-'+mon+'-'+day+' '+hour+':'+min+':'+sec;
        this.starTime_fn(this.plstartTime);
        this.upstartTimeV_fn(this.upStart)
      },
      endTime(val,oldVal){
        if(val.getTime()<new Date(this.startTimeV).getTime()){
          Toast('结束时间不得小于开始时间')
          val=new Date(new Date(this.startTimeV).getTime()+300000)
        }
        let date=new Date(val);
        let year=date.getFullYear();
        let mon=date.getMonth()+1;
        if(mon<10){
          mon='0'+mon
        }
        let day=date.getDate();
        if(day<10){
          day='0'+day;
        }
        let hour=date.getHours();
        if(hour<10){
          hour="0"+hour
        }
        let min=date.getMinutes();
        if(min<10){
          min='0'+min;
        }
        let sec=date.getSeconds();
        if(sec<10){
          sec='0'+sec
        }
        this.pendTime=year+'/'+mon+'/'+day+'/'+hour+':'+min;
        this.upEnd=year+'-'+mon+'-'+day+' '+hour+':'+min+':'+sec;
        this.endTime_fn(this.pendTime);
        this.upendTimeV_fn(this.upEnd)
      }
    },
    mounted(){
      // this.getDefaultAdd()
      if(this.addr.addr){
        this.isRess=false;
        this.hasRess=true;
      }else{
        this.isRess=true;
        this.hasRess=false;
      };
     
    },
    methods: {
      ...mapActions(['addr_fn','requireCateID_fn','typeTop_fn','starTime_fn','endTime_fn','upstartTimeV_fn','upendTimeV_fn','requireCateID_fn']),
      getDefaultAdd(){
        this.$Indicator.open()
        this.$axios.post(this.Url+'/api/memAddr/getMemAddr',{
          'requestId':this.stamp
        },{
          headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
          }
        }).then((res)=>{
          console.log(res,21332)
          this.$Indicator.close()
          this.addr_fn(res.data.data);
          if(this.addr.addr){
            this.isRess=false;
            this.hasRess=true;
          }else{
            this.isRess=true;
            this.hasRess=false;
          };
        }).catch((err)=>{
          console.log(err)
          this.$Indicator.close()
        })
      },
      turnTime(){
        console.log(this.sTime);
        if(this.startTime==null){
          let date=new Date(this.sTime);
          let year=date.getFullYear();
          let mon=date.getMonth()+1;
          if(mon<10){
            mon='0'+mon
          }
          let day=date.getDate();
          if(day<10){
            day='0'+day;
          }
          let hour=date.getHours();
          if(hour<10){
            hour="0"+hour
          }
          let min=date.getMinutes();
          if(min<10){
            min='0'+min;
          }
          let sec=date.getSeconds();
          if(sec<10){
            sec='0'+sec
          }
          this.plstartTime=year+'/'+mon+'/'+day+'/'+hour+':'+min;
          this.upStart=year+'-'+mon+'-'+day+' '+hour+':'+min+':'+sec;
          this.starTime_fn(this.plstartTime);
          this.upstartTimeV_fn(this.upStart)
        }else{
          let date=new Date(this.startTime);
          let year=date.getFullYear();
          let mon=date.getMonth()+1;
          if(mon<10){
            mon='0'+mon
          }
          let day=date.getDate();
          if(day<10){
            day='0'+day;
          }
          let hour=date.getHours();
          if(hour<10){
            hour="0"+hour
          }
          let min=date.getMinutes();
          if(min<10){
            min='0'+min;
          }
          let sec=date.getSeconds();
          if(sec<10){
            sec='0'+sec
          }
          this.plstartTime=year+'/'+mon+'/'+day+'/'+hour+':'+min;
          this.upStart=year+'-'+mon+'-'+day+' '+hour+':'+min+':'+sec;
          this.starTime_fn(this.plstartTime);
          this.upstartTimeV_fn(this.upStart)
        }
      },
      turnTimeEnd(){
        if(this.endTime==null){
          if(this.eTime.getTime()<new Date(this.startTimeV).getTime()){
            Toast('结束时间不得小于开始时间')
            this.eTime=new Date(new Date(this.startTimeV).getTime()+300000)
          }
          let date=new Date(this.eTime);
          let year=date.getFullYear();
          let mon=date.getMonth()+1;
          if(mon<10){
            mon='0'+mon
          }
          let day=date.getDate();
          if(day<10){
            day='0'+day;
          }
          let hour=date.getHours();
          if(hour<10){
            hour="0"+hour
          }
          let min=date.getMinutes();
          if(min<10){
            min='0'+min;
          }
          let sec=date.getSeconds();
          if(sec<10){
            sec='0'+sec
          }
          this.pendTime=year+'/'+mon+'/'+day+'/'+hour+':'+min;
          this.upEnd=year+'-'+mon+'-'+day+' '+hour+':'+min+':'+sec;
          this.endTime_fn(this.pendTime);
          this.upendTimeV_fn(this.upEnd)
        }else{
          if(this.endTime.getTime()<new Date(this.startTimeV).getTime()){
            Toast('结束时间不得小于开始时间')
            this.endTime=new Date(new Date(this.startTimeV).getTime()+300000)
          }
          let date=new Date(this.endTime);
          let year=date.getFullYear();
          let mon=date.getMonth()+1;
          if(mon<10){
            mon='0'+mon
          }
          let day=date.getDate();
          if(day<10){
            day='0'+day;
          }
          let hour=date.getHours();
          if(hour<10){
            hour="0"+hour
          }
          let min=date.getMinutes();
          if(min<10){
            min='0'+min;
          }
          let sec=date.getSeconds();
          if(sec<10){
            sec='0'+sec
          }
          this.pendTime=year+'/'+mon+'/'+day+'/'+hour+':'+min;
          this.upEnd=year+'-'+mon+'-'+day+' '+hour+':'+min+':'+sec;
          this.endTime_fn(this.pendTime);
          this.upendTimeV_fn(this.upEnd)
        }

      },
      starTime(){
        this.$refs.picker.open();
      },
      enTime(){
        this.$refs.pickerEnd.open();
      },
      onStartValuesChange(picker, values) {
        this.startMonth = values[0];
        this.startDay = values[1];
        this.startHours = values[2];
      },
      onEndValuesChange(picker, values) {
        this.endMonth = values[0];
        this.endDay = values[1];
        this.endHours = values[2];
      },
      selectStartTime() {
        this.isStartShow = false;
        this.startTime = true;
        this.isEndShow = true
      },
      selectEndTime() {
        this.isEndShow = false;
        this.endTime = true
      },
      payOrder(){//提交订单
        let _this=this;
        return new Promise((reject,resolve)=>{
          if(!_this.hasRess){
            Toast('请选择服务地址')
          }else{
            // _this.$axios.post(_this.Url+'')
            Indicator.open();
            // alert( _this.addr.addressId)
            _this.$axios.post(_this.Url+'/api/order/createOrder',{
              "data": {
                 "addressId": _this.addr.addressId,
                 "endTime":_this.upendTimeV,
                 "orderFrom":"3",
                 "orderRequire": [
                   {
                     "cateName": _this.typeP,
                     "remark": _this.turnText,
                     "requireCateId": _this.requireCateID,
                     "requireId": _this.requireID[0],
                     "requireName": _this.turnText
                   }
                 ],
                 "startTime": _this.upstartTimeV
               },
               "requestId": _this.stamp
            },
            {headers:{
              "Content-Type":"application/json",
              "token":localStorage.getItem('token')
            }}
            ).then((res)=>{
              // alert(res.data.message)
              // alert(res.data.message)
              // alert(res.data.data)
              Indicator.close();
              if(res.data.code!=200){
                Toast(res.data.message)
                return;
              }
              _this.typeV.length=0;
              _this.typeTop_fn('');
              _this.addr_fn('');
              _this.starTime_fn('');
              _this.endTime_fn('');
              _this.upstartTimeV_fn('');
              _this.upendTimeV_fn('');
              _this.requireCateID_fn('');
              _this.requireID.length=0;
              // alert(res.data.message);
              // localStorage.setItem('orderNum',res.data.data)
              this.$router.push({
                path:'/pay_page',
                query:{
                  Uid:res.data.data
                }
              });
             
              // let xCode=localStorage.getItem('wxCode');
              // location.href='http://qilia.581vv.com/cli/?code='+xCode+'&state=1#/pay_page?Uid='+res.data.data;
              reject();
            }).catch((err)=>{
              console.log(err);
              Indicator.close();
              resolve()
            })
          }
        })
      }
    },
    computed:{
      ...mapState(['appointment','_token','requireID','requireCateID','typeV','typeTop','addr','startTimeV','endTimeV','upstartTimeV','upendTimeV','requireCateID'])
    },
    destroyed(){
      // window.localStorage.clear('b')
    },
    components: {
      Shade,
      PayBtn,
      UserInfoList
    },
    created(){
      console.log(this.typeV,222)
      for(let i in this.typeV){
        if(this.typeV[i].requireName){
          this.choseList.push(this.typeV[i].requireName);
        }else{
          this.choseList.push(this.typeV[i]);
          this.requireCateID_fn('');
          this.requireID.length=0;
        }
      };
      this.turnText=this.choseList.join('/');
      console.log(this.turnText)
      this.typeP=this.typeTop;
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"
  span, img
    vertical-align middle

  .price
    font-size 14px
    font-family PingFangSC-Semibold
    font-weight 600
    color rgba(236, 88, 79, 1)
    line-height 22px

  .add_address
    width 100%
    height 68px
    line-height 68px
    padding 0 16px
    margin-bottom 4px
    box-sizing border-box
    background-color rgba(255, 255, 255, 1)
    background-image url("../../../../../static/images/地址条.png")
    background-repeat no-repeat
    background-position bottom
    position relative
    span
      margin-left 5px
      font-size 16px
      font-family PingFangSC-Regular
      font-weight 400
      color rgba(112, 117, 127, 1)
    .more
      position absolute
      right 16px
      top 50%
      transform translateY(-50%)
  .has_address
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
        .bottom
          bottom-border-1px(#E5EAF3)
        .item_name
          font-family PingFangSC-Regular
          font-weight 400
          color rgba(112, 117, 127, 1)
          line-height 22px
        input
          outline none
        .res, .serve_address
          margin-left 16px
        .resman
          margin-left: 30px
        .serve_address
          display inline-block
          width 222px
        .user_name
          margin-left 32px
        .img_one
          margin-right 10px
      .item_left
        padding-left 40px

  .order_time
    width 100%
    height 48px
    line-height 48px
    background-color rgba(255, 255, 255, 1)
    padding 0 17px
    box-sizing border-box
    bottom-border-1px(#E5EAF3)
    span
      margin-left 4px
      font-size 16px
      font-family PingFangSC-Medium
      font-weight 500
      color rgba(58, 61, 74, 1)
      line-height 22px

  .start_end_time
    width 375px
    height 56px
    display flex
    margin-bottom 8px
    background-color rgba(255, 255, 255, 1)
    background-image url("../../../../../static/images/icon_大箭头.png")
    background-repeat no-repeat
    background-position 50%
    box-shadow 0 0 0 0 rgba(229, 234, 243, 1)
    .start, .end
      width 50%
      line-height 56px
      position: relative
      &.height
        line-height 28px
      span
        color:#ec584f
        font-size: 15px
        font-weight: bold
        position: absolute
        top:14px
        left:24px
      p
        text-align center
        font-size 15px
        font-family PingFangSC-Regular
        font-weight 400
        color rgba(161, 167, 179, 1)
        margin-top:-5px

  .server_list
    background rgba(255, 255, 255, 1)
    padding 0 16px
    .bottom
      bottom-border-1px(#E5EAF3)
    .item
      height 48px
      font-size 16px
      display flex
      align-items center
      justify-content space-between
      .item_name
        font-family: PingFangSC-Regular
        font-weight: 400
        color rgba(112, 117, 127, 1)
        line-height 22px
      .item_content
        font-family PingFangSC-Regular
        font-weight 400
        color rgba(58, 61, 74, 1)
        line-height 22px

  .hint
    margin-top 7px
    padding 0 16px
    font-size 12px
    font-family PingFangSC-Regular
    font-weight 400
    color rgba(161, 167, 179, 1)
    line-height 18px
  .pay
      width 100%
      height 50px
      padding-left 16px
      box-sizing border-box
      background rgba(255, 255, 255, 1)
      box-shadow 0 1 0 0 rgba(229, 234, 243, 1)
      position fixed
      bottom 0
      display flex
      .pay_sum
        width 239px
        line-height 50px
        font-size 16px
        font-family PingFangSC-Regular
        font-weight 400
        color rgba(112, 117, 127, 1)
      .pay_btn
        width 120px
        line-height 50px
        text-align center
        font-size 16px
        font-family PingFangSC-Medium
        font-weight 500
        color rgba(255, 255, 255, 1)
        background rgba(236, 88, 79, 1)

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
</style>
