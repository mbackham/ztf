<!--评价文本框组件-->
<template>
  <div class="text_wrap">
    <textarea cols="30" rows="10" placeholder="请输入您的详细评价~"></textarea>
    <span class="inner">140字以内</span>
    <div class="photo_wrap">
      <div class="photo_"></div>
      <div>
        <slot name="send_name"></slot>
        <p class="max">最多上传3张</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TextWrap"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
        background url("../../../static/images/icon_上传照片.png") no-repeat
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
</style>
