<!--故障申报填写页面-->
<template>
  <section class="back_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <AllOrderInfo :orderInfo="orderInfo"/>
      <div class="text_wrap">
        <textarea cols="30" rows="10" placeholder="请输入您的申报原因~" v-model="sendText"></textarea>
        <div class="photo_wrap">
          <div class="photo_"></div>
          <div>
            <slot name="send_name"></slot>
            <p class="max">最多上传3张</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ft_btn" @click="sendTrouble" :class="{on: sendText.length>0}">提交</div>
  </section>
</template>

<script>
  import AllOrderInfo from '../../../../components/AllOrderInfo/AllOrderInfo'
  import {Toast} from 'mint-ui'
  import {mapState} from 'vuex'

  export default {
    name: "SubmitTrouble",
    data() {
      return {
        title: '故障申报',
        orderInfo: this.$route.query.orderInfo,
        sendText: ''
      }
    },
    computed:{
      ...mapState(['_token'])
    },
    methods: {
      //点击提交按钮发送申报
      sendTrouble() {
        const {sendText, orderInfo} = this;
        const id = orderInfo.orderId;
        if (sendText.length <= 0) {
          return
        } else {
          this.$axios.post(this.Url+'/api/order/turnOrderDispute', {
              "data": {
                "imageId": [],
                "orderId": id,
                "remark": sendText
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
            if (result.code === 200) {
              Toast('提交成功');
              setTimeout(()=>{
                this.$router.back();
              },2000)
            }
          })
        }
      }
    },
    components: {
      AllOrderInfo
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"
  .back_wrap
    width 100%
    height 100%
    .scroll_wrap
      position: fixed;
      top: 64px;
      bottom 0
      left: 0;
      width: 100%;
      overflow: hidden;
      .state
        color: rgba(248, 162, 16, 1);
      .order_msg
        width 100%
        margin-bottom 8px
        padding 0 16px
        box-sizing border-box
        background #fff
        .title
          font-size: 16px;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          line-height: 48px;
          width: 375px;
          height: 48px;
          bottom-border-1px($main)
        .item_msg
          width 100%
          height 48px
          display flex
          align-items center
          justify-content space-between
          font-size: 14px;
          bottom-border-1px($main)
          .name
            color: rgba(112, 117, 127, 1);
          .type, .problem
            color: rgba(58, 61, 74, 1);
      .text_wrap
        width 100%
        padding 0 16px 48px 16px
        box-sizing border-box
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
      line-height 50px
      background: rgba(215, 219, 227, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      &.on
        background: rgba(238, 81, 71, 1);
</style>
