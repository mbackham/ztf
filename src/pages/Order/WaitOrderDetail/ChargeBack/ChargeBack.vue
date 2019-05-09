<!--申请退单页面-->
<template>
  <section class="back_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <div>
        <FinishOrderInfo>
          <span slot="state" class="state">待确认上门</span>
        </FinishOrderInfo>
        <div class="back_sum">
          <span class="text">退单金额</span>
          <span class="num">￥1700</span>
        </div>
        <div class="title">退单原因</div>
        <ul class="back_list">
          <li class="back_item">
            <span class="cause">不想做了（协议退单）</span>
            <span class="checked" @click="change($event)"></span>
          </li>
          <li class="back_item">
            <span class="cause">服务工程师态度不好（客服退单）</span>
            <span class="checked" @click="change($event)"></span>
          </li>
          <li class="back_item">
            <span class="cause">服务工程师的方案不符合我的需求（客服退单）</span>
            <span class="checked" @click="change($event)"></span>
          </li>
        </ul>
        <div class="text_wrap">
          <textarea cols="30" rows="10" placeholder="请输入您的申报原因~"></textarea>
          <div class="photo_wrap">
            <div class="photo_"></div>
            <div>
              <slot name="send_name"></slot>
              <p class="max">最多上传3张</p>
            </div>
          </div>
        </div>
        <div class="hint">提示：装维人员上门前
          <span>2小时内</span>
          不允许用户端执行退单操作。
        </div>
      </div>
    </div>
    <div class="ft_btn">提交</div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import FinishOrderInfo from '../../../../components/FinishOrderInfo/FinishOrderInfo'
  import TextWrap from '../../../../components/TextWrap/TextWrap'

  export default {
    name: "ChargeBack",
    data() {
      return {
        title: '申请退单'
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    },
    methods:{
      change(e){
        e.target.className = 'checked on'
      }
    },
    components: {
      FinishOrderInfo,
      TextWrap
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"
  .back_wrap
    width 100%
    height 100%
    .scroll_wrap
      width 100%
      height 603px
      .state
        color: rgba(248, 162, 16, 1);
      .back_sum
        width: 100%;
        height: 56px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 0 0 0 rgba(229, 234, 243, 1);
        margin 8px 0
        display flex
        align-items center
        justify-content space-between
        padding 0 16px
        box-sizing border-box
        .text
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          line-height: 22px;
        .num
          width: 60px;
          height: 26px;
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(236, 88, 79, 1);
          line-height: 22px;
      .title
        width 100%
        height 48px
        font-size: 16px;
        padding-left 16px
        box-sizing border-box
        font-family: PingFangSC-Medium;
        background: rgba(255, 255, 255, 1);
        font-weight: 500;
        color: rgba(58, 61, 74, 1);
        line-height: 48px;
        bottom-border-1px($main)
      .back_list
        width 100%
        padding-left 16px
        box-sizing border-box
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 0 0 0 rgba(229, 234, 243, 1)
        .back_item
          width 100%
          height 48px
          padding-right 16px
          box-sizing border-box
          bottom-border-1px($main)
          display flex
          align-items center
          justify-content space-between
          .cause
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(58, 61, 74, 1);
            line-height: 20px;
          .checked
            width 20px
            height 20px
            display inline-block
            background url("../../../../../static/images/icon_未选中（大）.png") no-repeat
            &.on
              background url("../../../../../static/images/icon_选中（大）.png") no-repeat
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
      .text_outer
        width 100%
        padding 0 16px
        box-sizing border-box
        background: rgba(255, 255, 255, 1);
        .name
          width: 100%;
          height: 48px;
          line-height 48px
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(58, 61, 74, 1);
      .hint
        width 100%
        height 120px
        padding 0 16px
        box-sizing border-box
        font-size: 12px;
        margin-top 8px
        font-family: PingFangSC-Regular;
        color: rgba(161, 167, 179, 1);
        line-heidght: 18px;
        span
          color: $red
          font-weight 500
    .ft_btn
      width 100%
      height 50px
      position fixed
      bottom 0
      text-align: center
      line-height 50px
      background:rgba(238,81,71,1);
      color:rgba(255,255,255,1);
      font-size:16px;
      font-family:PingFangSC-Medium;
      font-weight:500;
</style>
