<!--我的星级页面-->
<template>
  <section class="star_wrap">
    <MyHeader :title="title"/>
    <div class="ft_wrap">
      <div class="asset">
        <div class="num">
          <span>好评</span>
          <p>{{star.goodNum}}</p>
        </div>
        <div class="num">
          <span>中评</span>
          <p>{{star.middleNum}}</p>
        </div>
        <div class="num">
          <span>差评</span>
          <p>{{star.badNum}}</p>
        </div>
      </div>
    </div>
    <ul class="star_list">
      <li class="star_item" v-for="(item , index) in star.tagScore" :key="index">
        <div class="name">{{item.tagCname}}</div>
        <div>
          <span>
            <img src="../../../../static/images/icon_16px星星.png" alt="" v-for="n in item.commScore" :key="n+100">
          
            <img src="../../../../static/images/icon_16px_星星_未选中.png" alt=""  v-for="n in (5 - item.commScore)" :key="n-48">
          </span>
          <span class="score">{{item.commScore}}</span>
        </div>
      </li>
   
      
  
    </ul>
  </section>
</template>

<script>

import user from "@/api/model/user"
  export default {
    name: "MyStar",
    data() {
      return {
        title: '我的星级',
        star:{tagScore:[]}
      }
    },
    created(){
        //获取用户信息
       
         this.getlist();

    },
    methods:{
        getlist(){
               var that=this;
         user.getCommentStar({"requestId": new Date().getTime()}).then( ( res ) => {
         
              if(res.code==200){  
                console.log(res)            
                      // alert(typeof(res.data))
                      that.star=Object.assign(that.star,res.data);
                      // this.star.tagScore.forEach( item =>{
                      //       item.unstarcor=
                      // })
                      //that.serviceList.push(...res.data)
                     // console.log(that.serviceList)
              
              }else{
                this.$tip(res.message)
              }
         }).catch( (error) => {
            console.log(error)
         })
        }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .star_wrap
    width 100%
    height 100%
  .ft_wrap
    width: 359px;
    height: 87px;
    line-height 43px
    padding 0 24px
    margin -30px auto 0
    box-sizing border-box
    position relative
    z-index 10
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 6px -1px rgba(36, 37, 41, 0.1);
    .asset
      display flex
      justify-content space-between
      .num
        text-align: center
        font-family: PingFangSC-Regular;
        span
          line-height: 20px
          font-size: 14px;
          color: rgba(112, 117, 127, 1);
        p
          font-size: 24px;
          font-family: DINPro-Medium;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          line-height: 31px
  .star_list
    width 100%
    height 476px
    padding 0 24px
    box-sizing border-box
    background:rgba(255,255,255,1);
    .star_item
      width 100%
      height 54px
      display flex
      align-items center
      justify-content space-between
      .name
        font-size:16px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(58,61,74,1);
        line-height:22px;
      .score
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(92,97,111,1);
        line-height:17px;
</style>
