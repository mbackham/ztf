<!--已完成订单详情页面-->
<template>
  <section class="detail_wrap">
   
   
    
          <div class="rating_wrap">
            <div class="title">用户评价</div>
            <div class="rating_hd">
              <img src="../../static/images/icon_好评.png" alt="">
              <p>{{commenttext}}</p>
            </div>
            <ul class="star_list">
              <li class="star_item"  v-for="(item , index) in star.tagScore" :key="index">
                <div class="name">{{item.tagCname}}</div>
                <div>
                <span>
                  <img src="../../static/images/icon_16px星星.png" alt=""  v-for="n in item.commScore" :key="n+100">
                 
                  <img src="../../static/images/icon_16px_星星_未选中.png" alt=""   v-for="n in (5 - item.commScore)" :key="n-48">
                </span>
                  <span class="score">{{item.commScore}}</span>
                </div>
              </li>
             
            </ul>
          </div>

  </section>
</template>

<script>
  import BScroll from 'better-scroll'
import user from "@/api/model/user"
  export default {
    name: "WaitOrderDetail",
    data() {
      return {
        title: '订单详情',
        isShow: true,
        star:{tagScore:[]},
        commenttext:""
      }
    },
    mounted() {
       user.getCommentStar({"requestId": new Date().getTime()}).then( ( res ) => {
         
              if(res.code==200){  
                console.log(res)            
                      // alert(typeof(res.data))
                      this.star=Object.assign({},this.star,res.data);
                      var totle=0;
                      res.data.tagScore.forEach(item => {
                         totle+=item.commScore
                      })

                      if(totle>20){
                         this.commenttext="非常棒";
                      }
                       if(totle<21&&totle>10){
                         this.commenttext="不错";
                      }
                      if(totle<11){
                         this.commenttext="有点差劲";
                      }
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
        
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/stylus/mixins.styl"
  
    .detail_wrap
      padding-bottom 20px
           
      .rating_wrap
        width 100%
        padding 0 16px 24px 16px
        box-sizing border-box
        background #fff
        padding-bottom 23px
        .title
          font-size: 16px;
          text-align: left
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          line-height: 56px;
          bottom-border-1px($main)
        .rating_hd
          text-align: center
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(55, 57, 61, 1);
          line-height: 20px;
          padding-bottom 24px
          img
            margin 16px 0 14px
        .star_list
          width 100%
          height 275px
          padding 0 24px
          box-sizing border-box
          background: rgba(255, 255, 255, 1);
          .star_item
            width 100%
            height 54px
            display flex
            align-items center
            justify-content space-between
            .name
              font-size: 16px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(58, 61, 74, 1);
              line-height: 22px;
            .score
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(92, 97, 111, 1);
              line-height: 17px;
            .blank
              width 100%
              height 40px
              background #fff
</style>
