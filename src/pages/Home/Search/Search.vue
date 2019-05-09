<!--搜索页面-->
<template>
  <section class="search_wrap">
    <header class="search_header">
      <img src="../../../../static/images/icon_返回.png" alt="" class="return" @click="$router.back()">
      <input type="text" placeholder="请输入客户姓名、订单号">
    </header>
    <div class="hot_search">
      <p class="title">热门搜索</p>
      <ul class="search_list">
        <li class="search_item">上门维修</li>
        <li class="search_item">上门安装</li>
        <li class="search_item">网络</li>
        <li class="search_item">装网线</li>
        <li class="search_item">明线方布</li>
      </ul>
    </div>
    <div class="history_search">
      <p class="title">历史搜索</p>
      <ul>
        <li class="history_item">
          <img src="../../../../static/images/icon_时间.png" alt="">
          <span>明线放布</span>
          <img src="../../../../static/images/icon_删除.png" alt="" class="delete">
        </li>
        <li class="history_item">
          <img src="../../../../static/images/icon_时间.png" alt="">
          <span>明线放布</span>
          <img src="../../../../static/images/icon_删除.png" alt="" class="delete">
        </li>
        <li class="history_item">
          <img src="../../../../static/images/icon_时间.png" alt="">
          <span>明线放布</span>
          <img src="../../../../static/images/icon_删除.png" alt="" class="delete">
        </li>
        <li class="clear_search">清空搜索记录</li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Search"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .search_wrap
    z-index 1000
    font-size 14px
    width 100%
    box-shadow:0 0 0 0 rgba(229,234,243,1)
    .title
      font-family PingFangSC-Regular
      font-weight 400
      color rgba(110,114,122,1)
      line-height 20px
    .search_header
      width 100%
      height 64px
      padding 26px 16px 6px
      box-sizing border-box
      bottom-border-1px(#E5EAF3)
      background rgba(255,255,255,1)
      .return
        margin-right 11px
        vertical-align middle
      input
        width 311px
        height 32px
        padding-left 32px
        box-sizing border-box
        vertical-align middle
        outline none
        background-color rgba(244,244,244,1)
        background-image url("../../../../static/images/icon_搜索.png")
        background-repeat no-repeat
        background-position 10px center
        border-radius 2px
        opacity 0.9
        &::-webkit-input-placeholder/*Webkit browsers*/
          color:#ccc
    .hot_search
      padding 12px 16px 8px
      box-sizing border-box
      margin-bottom 8px
      width 100%
      background rgba(255,255,255,1)
      .search_list
        clearFix()
        margin-top 9px
        .search_item
          font-family PingFangSC-Regular
          font-weight 400
          color rgba(112,117,127,1)
          line-height 20px
          padding 8px 16px
          box-sizing border-box
          float left
          margin 0 8px 8px 0
          background rgba(238,240,246,1)
          border-radius 2px
    .history_search
      width 100%
      background rgba(255,255,255,1)
      padding 12px 0 0 16px
      box-sizing border-box
      .history_item
        color rgba(58,61,74,1)
        padding 14px 16px 14px 0
        bottom-border-1px(#E5EAF3)
        img
          vertical-align middle
        .delete
          float right
      .clear_search
        text-align center
        padding 14px 0
</style>
