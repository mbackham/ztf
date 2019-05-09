<!--订单评价页面-->
<template>
  <section class="rating_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div class="outer_wrap">
        <div class="user_wrap">
          <img :src="orderInfo.engineerAvatar" alt="">
          <p>{{orderInfo.engineerName}}</p>
        </div>
        <div class="all_rating">
          <div @click="goodOn">
            <img src="../../../../../static/images/icon_好评_默认.png" v-if="good">
            <img src="../../../../../static/images/icon_好评_选中.png" v-else>
            <p>很好</p>
          </div>
          <div @click="notBadOn">
            <img src="../../../../../static/images/icon_中评_默认.png" v-if="notBad">
            <img src="../../../../../static/images/icon_中评_选中.png" v-else>
            <p>还不错</p>
          </div>
          <div @click="badOn">
            <img src="../../../../../static/images/icon_差评_默认.png" v-if="bad">
            <img src="../../../../../static/images/icon_差评_选中.png" v-else>
            <p>不满意</p>
          </div>
          <div class="rating_title">整体评价</div>
        </div>
        <ul class="star_list">
          <li class="star_item" v-for="(item,i) in item_title" :key="i">
            <div class="name">{{item.tagCname}}</div>
            <div>
              <img v-for="(ele,j) in EvaluationAllCount" :key="j"
                   :src="EvaluationAllCount[i].Evaluation>j?'../../../static/images/icon_评价_全星.png':'../../../static/images/icon_评价_空星.png'"
                   @click="setShow(i,j)"/>
            </div>
          </li>
        </ul>
        <div class="text_wrap">
          <textarea cols="30" rows="10" placeholder="请输入您的详细评价~" v-model="text"></textarea>
          <span class="inner">140字以内</span>
          <div class="photo_wrap">
            <div class="photo_"></div>
            <div>
              <p class="add">添加图片</p>
              <p class="max">最多上传3张</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ft_btn" :class="{on:text.length>0}" @click="submit(orderInfo.orderId)">提 交</div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import {Toast} from 'mint-ui'
  export default {
    name: "RatingOrder",
    data() {
      return {
        title: '发表评价',
        isShow: false,
        good: 0,
        notBad: 1,
        bad: 2,
        text: '',
        orderInfo: this.$route.query.orderInfo,
        item_title: "",
        // goodImg: ,
        // notImg: ,
        EvaluationAllCount: [
          {"Evaluation": 0},
          {"Evaluation": 0},
          {"Evaluation": 0},
          {"Evaluation": 0},
          {"Evaluation": 0}
        ]
      }
    },
    created() {
      //获取评价列表
      this.$axios.post(this.Url+'/api/comment/getCommentStar',
        {
          data: {
            cateName: ""
          },
          "requestId":this.stamp,
        },
        {
          headers: {
            "token":localStorage.getItem('token')
          }
        }
      ).then(res => {
        this.item_title = res.data.data.tagScore;
      })
        .catch(err => {
          console.log(err);
        });
      //新增用户评价
    },
    mounted() {
      this.$Indicator.close();
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    },
    computed:{
      ...mapState(['_token'])
    },
    methods: {
      goodOn() {
        this.good = !this.good;
        this.notBad = true;
        this.bad = true
      },
      notBadOn() {
        this.notBad = !this.notBad;
        this.good = true;
        this.bad = true
      },
      badOn() {
        this.bad = !this.bad;
        this.notBad = true;
        this.good = true
      },
      setShow(type, i) {
        this.EvaluationAllCount[type].Evaluation = i + 1;
      },
      submit(id) {
        if (this.text.length <= 0) {
          return
        } else {
          this.$axios.post(this.Url+'/api/comment/addComment',
            {
              "data": {
                "commDesc": this.text,
                "commImageId": [],
                "commResult": "1",
                "orderId": id,
                "tagScore":[]
              },
              "requestId":this.stamp,
            },
            {
              headers: {
                "token":localStorage.getItem('token')
              }
            }
          ).then(res => {
            const result = res.data;
            console.log(result);
            Toast('评价成功');
            setTimeout(()=>{
              this.$router.back()
            },2000)
          }).catch(err => {
            console.log(err);
          });
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"
  .rating_wrap
    width 100%
    height 100%
    background: rgba(255, 255, 255, 1);
    .scroll_wrap
      position: fixed;
      top: 64px;
      left: 0;
      bottom 0
      width: 100%;
      overflow: hidden;
      .outer_wrap
        width 100%
        padding 0 16px
        box-sizing border-box
        .user_wrap
          padding 16px 0
          text-align: center
          img
            width: 56px;
            height: 56px;
            border-radius 50%
            margin-bottom 8px
          p
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(58, 61, 74, 1);
            line-height: 22px;
        .all_rating
          width 100%
          height 99px
          padding 0 60px
          position relative
          text-align: center
          box-sizing border-box
          display flex
          align-items center
          justify-content space-between
          bottom-border-1px($main)
          top-border-1px($main)
          p
            margin-top 8px
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(58, 61, 74, 1);
            line-height: 20px;
          .rating_title
            position absolute
            top -10px
            left 50%
            transform translateX(-50%)
            z-index 100
            background #fff
            width 88px
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(112, 117, 127, 1);
            line-height: 20px;
        .star_list
          width: 100%;
          margin-bottom: 8px;
          .star_item
            width: 100%;
            height: 54px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name
              font-size: 14px;
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
        .text_wrap
          width 100%
          padding-bottom 48px
          position relative
          textarea
            width: 343px;
            height: 120px;
            padding 8px
            box-sizing border-box
            border transparent
            font-size 14px
            outline none
            font-family: PingFangSC-Regular;
            background: rgba(238, 240, 246, 1);
            border-radius: 2px;
            &::-webkit-input-placeholder /*Webkit browsers*/
              color: rgba(161, 167, 179, 1);
              line-height: 20px;
          .inner
            position absolute
            top 50%
            transform translateY(-150%)
            right 8px
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(176, 182, 194, 1);
            line-height: 16px;
          .photo_wrap
            width 100%
            display flex
            align-items center
            margin-top 16px
            .photo_
              width 56px
              height 56px
              background: rgba(249, 251, 254, 1);
              border-radius: 2px;
              border: 1px solid #D7DBE3;
              background url("../../../../../static/images/icon_上传照片.png") no-repeat
              background-position center center
              margin-right 8px
            .add
              font-size: 14px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(58, 61, 74, 1);
              line-height: 20px;
            .max
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(176, 182, 194, 1);
              line-height: 16px;
    .ft_btn
      width 100%
      height 50px
      position fixed
      bottom 0
      text-align: center
      background: rgba(215, 219, 227, 1);
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      &.on
        background: rgba(238, 81, 71, 1);
        color: rgba(255, 255, 255, 1);
</style>
