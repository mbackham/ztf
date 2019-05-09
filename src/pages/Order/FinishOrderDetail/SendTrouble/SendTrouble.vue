<!--故障申报填写页面-->
<template>
  <section class="send_wrap">
    <TopHeader :title="title"/>
    <AllOrderInfo>
      <span slot="state" class="state">已完成</span>
    </AllOrderInfo>
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
    <div class="ft_btn on">提 交</div>
  </section>
</template>

<script>
  import AllOrderInfo from '../../../../components/AllOrderInfo/AllOrderInfo'
  import TextWrap from '../../../../components/TextWrap/TextWrap'

  export default {
    name: "SubmitTrouble",
    data() {
      return {
        title: '故障申报',
      }
    },
    components: {
      AllOrderInfo,
      TextWrap,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .send_wrap
    width 100%
    height 100%
    .state
      color: rgba(46, 171, 89, 1);
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
