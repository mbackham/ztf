<!--需求提交页面-->
<template>
  <section class="need_wrap">
    <TopHeader :title="title"/>
    <section class="nav_wrap">
      <div class="title">服务类型</div>
      <ul class="nav_list">
        <li class="nav_item ellipsis" v-for="(item,index) in list" :key="index" :class="{active:item.state==2}" @click="choseType(index)">{{item.cateName}}</li>
        <li class="nav_item" :class="{active:anthoner===2}" @click="anthon">其他</li>
      </ul>
    </section>
    <div class="scroll_wrap" v-show="isAnthon">
      <ul class="product_list">
        <li class="product_item" v-for="(pro,index) in typeList" :key="index">
          <div class="item_img">
            <div class="checked" @click="changeCheck($event,index)" ref="chec"></div>
            <img :src="`http://domch.cn/file-api/image/${pro.requireImagePath}`" class="product_img">
          </div>
          <div class="item_text">
            <p class="product_name ellipsis">{{pro.requireName}}</p>
            <p class="explain ellipsis">{{pro.requireDesc}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="post_need" v-show="isShow">
      <div class="text_box">
        <p class="title">问题描述</p>
        <textarea class="textCon"
        cols="30" rows="10" placeholder="请详细描述您的需求"
        v-model="anThonText"
        ></textarea>
      </div>
      <p class="hint">提示：此为非标准订单，在您提交以后客服会帮您转化为标准订单</p>
    </div>
    <footer class="next_step" @click="nextWay()">
      下一步
    </footer>
  </section>
</template>

<script>
  import SendNeed from '../../../components/SendNeed/SendNeed'
  import BScroll from 'better-scroll'
  import {Toast} from 'mint-ui';
  import {mapState,mapActions} from 'vuex';
  import wx from 'weixin-js-sdk';
  export default {
    name: "NeedPut",
    data() {
      return {
        color:0,
        anthoner:0,
        title: '需求提交',
        num: 0,
        isShow: false,
        isChecked: false,
        isAnthon:true,
        list:[],
        turnList:[],//选项列表
        typeList:[],//数据列表
        type:null,
        requireId:null,
        anThonText:'',//其他描述
      }
    },
    computed:{
      ...mapState(['typeV','requireID','_token'])
    },
    methods: {
      ...mapActions(['typeTop_fn','requireCateID_fn']),
      getNeedList(){//获取需求列表
        let _this=this;
        _this.$axios.post(_this.Url+'/api/require/listRequireCate',{
          "requestId":_this.stamp
        },
        {
          headers:{
            "Content-Type":"application/json",
            "token":localStorage.getItem('token')
          }
        }
        ).then((res)=>{
            console.log(res)
            _this.list=res.data.data;
            _this.list[0].state=2;
            _this.requireId=res.data.data[0].requireCateId
          }).catch((err)=>{
            console.log(err)
          })
      },
      getTypeList(){
        this.$axios.post(this.Url+'/api/require/listRequire',{
          "data":this.requireId,
          "requestId":this.stamp
        },{
          headers:{
            "Content-Type":"application/json",
            "token":localStorage.getItem('token')
          }
        }).then((res)=>{
          this.typeList=res.data.data;
          console.log(res)
        })
      },
      anthon(){
        this.anthoner=2;
        for(let i in this.list){
          this.list[i].state=1;
        };
        this.isAnthon=false;
        this.isShow=true;
        this.typeTop_fn('其他')
      },
      choseType(index){
        this.isAnthon=true;
        this.isShow=false;
        this.anthoner=1;
        for(let i in this.list){
          this.list[i].state=1;
          this.list[index].state=2;
        };
        this.requireId=this.list[index].requireCateId;
        this.getTypeList();
        this.typeTop_fn(this.list[index].cateName);
        this.requireCateID_fn(this.list[index].requireCateId);

        this.typeV.length=0;
        for(let i in this.$refs.chec){
          this.$refs.chec[i].className='checked'
        }
      },
      changeCheck(e,index) {//用户选择需求
        if (e.target.className.indexOf("on") === -1) {
          e.target.className = 'checked on';
          this.typeV[index]=this.typeList[index];
          this.requireID[index]=this.typeList[index].requireId
        } else {
          e.target.className = 'checked';
          this.typeV.splice(index,1);
          this.requireID.splice(index,1)
        }
      },
      nextWay(){//下一步
        let _this=this;
        if(this.isAnthon){
          if(_this.typeV.length<1){
            Toast('请选择至少一项服务需求')
          }else{
            _this.$router.push({
              path:'/perfect'
            })
          }
        }else{
          if(_this.anThonText===''){
            Toast('请输入问题描述')
          }else{
            _this.typeV.push(_this.anThonText)
            _this.$router.push({
              path:'/perfect'
            })
          }
        }
      },
    },
    created(){
      this.getNeedList()
    },
    mounted(){
      setTimeout(()=>{
        this.getTypeList()
      },1000)
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .active
    color:white!important
    background: #ec584f!important
  .need_wrap
    width 100%
    height 100%
    font-size 14px
    box-shadow: 0 0 0 0 rgba(229, 234, 243, 1)
    position relative
    .nav_wrap
      margin-bottom 8px
      background rgba(255, 255, 255, 1)
      .title
        padding 0 16px
        box-sizing border-box
        width: 1005;
        height: 48px;
        line-height 48px
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(58, 61, 74, 1);
      .nav_list
        width 100%
        padding 0 8px 0 16px
        box-sizing border-box
        clearFix()
        .nav_item
          float left
          width: 108px
          height: 36px
          line-height 36px
          margin 0 9px 8px 0
          background: rgba(238, 240, 246, 1)
          border-radius: 2px
          box-shadow 0 0 0 0 rgba(229, 234, 243, 1)
          font-size 14px
          font-family PingFangSC-Regular
          font-weight 400
          text-align: center
          color rgba(112, 117, 127, 1)
          &.isChecked
            color: rgba(255, 255, 255, 1);
            background: rgba(238, 81, 71, 1);
    .scroll_wrap
      width 100%
      overflow hidden
      height calc(100vh - 120px)
      .product_list
        width 100%
        padding-left 16px
        box-sizing border-box
        background rgba(255, 255, 255, 1)
        .product_item
          height 96px
          display flex
          padding 16px 16px 16px 0
          box-sizing border-box
          bottom-border-1px(#E5EAF3)
          .item_img
            display flex
            align-items center
            .checked
              width 36px
              height 36px
              margin-right 5px
              background url("../../../../static/images/icon_未选中（大）.png") no-repeat
              background-position center center
              border-radius 50%
              &.on
                background url("../../../../static/images/icon_选中（大）.png") no-repeat
                background-position center center
            .product_img
              width 64px
              height 64px
              border-radius 2px
          .item_text
                width 220px
                margin-left 16px
                .product_name
                  font-size 16px
                  font-family PingFangSC-Medium
                  font-weight 500
                  color rgba(58, 61, 74, 1)
                  line-height 22px
                .explain
                  font-size 14px
                  font-family PingFangSC-Regular
                  font-weight 400
                  color rgba(112, 117, 127, 1)
                  line-height 20px
    .post_need
                    width 100%
                    height 100%
                    top 208px
                    background: white
                    .text_box
                      width 100%
                      padding 0 16px 16px
                      box-sizing border-box
                      background rgba(255, 255, 255, 1)
                      .title
                        height 48px
                        line-height 48px
                        font-size 16px
                        font-family PingFangSC-Medium
                        font-weight 500
                        color rgba(58, 61, 74, 1)
                      .textCon
                        outline none
                        font-size 14px
                        width 343px
                        height 180px
                        border none
                        padding 8px
                        box-sizing border-box
                        background rgba(238, 240, 246, 1)
                        border-radius 2px
                        font-family: PingFangSC-Regular;
                        resize: none
                        &::-webkit-input-placeholder /*Webkit browsers*/
                          color: #A1A7B3
                          font-size: 14px;
                    .hint
                      padding 0 16px
                      margin-top 8px
                      font-size: 12px
                      font-family PingFangSC-Regular
                      font-weight 400
                      color rgba(161, 167, 179, 1)
                      line-height 18px
    .next_step
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
