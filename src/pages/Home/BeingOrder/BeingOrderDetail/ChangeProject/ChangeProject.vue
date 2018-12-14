<!--施工方案变更-->
<template>
  <section class="change_wrap">
    <TopHeader :title="title"/>
    <div class="outer_wrap">
      <ul class="name_list">
        <li class="name_item" :class="{on:num===0}" @click="num=0">综合布线</li>
        <li class="name_item" :class="{on:num===1}" @click="num=1">无线网组</li>
        <li class="name_item" :class="{on:num===2}" @click="num=2">网络优化</li>
        <li class="name_item" :class="{on:num===3}" @click="num=3">百兆/千兆交换机</li>
      </ul>
      <div class="scroll_wrap">
        <ul class="shop_list">
          <li class="shop_item">
            <img src="../../../../../../static/images/商品.jpg" class="shopImg">
            <div class="inner">
              <span>水星SG105P(千兆POE交接)</span>
              <div class="shop_cart">
                <span class="price">￥600/套</span>
                <div>
                  <transition name="move">
                    <img src="../../../../../../static/images/button_减.png" class="sub" v-show="count>0" @click="count--">
                  </transition>
                  <span class="num" v-show="count>0">{{count}}</span>
                  <img src="../../../../../../static/images/button_加.png" @click="countAdd">
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="btn">
      <div>
        <span class="all">合计</span>
        <span class="price">￥660元</span>
      </div>
      <div class="submit">提交</div>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "ChangeProject",
    data() {
      return {
        title: '服务方案变更',
        num: 1,
        count: 0
      }
    },
    methods: {
      countAdd() {
        this.count++
      }
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../../common/stylus/mixins.styl"
  .change_wrap
    width 100%
    height 100%
    .outer_wrap
      display flex
      .name_list
        width 88px
        height 553px
        .name_item
          width 100%
          padding 16px 14px
          box-sizing border-box
          text-align: center
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(112, 117, 127, 1);
          line-height: 20px;
          &.on
            font-weight: 500;
            color: rgba(58, 61, 74, 1);
            background #fff
      .scroll_wrap
        height 553px
        background #fff
        overflow hidden
      .shop_list
        width 287px
        .shop_item
          width 100%
          padding 13px 16px
          box-sizing border-box
          display flex
          .shopImg
            width 72px
            height 72px
            margin-right 8px
          .inner
            width 175px
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(58, 61, 74, 1);
            line-height: 22px;
            .shop_cart
              display: flex
              margin-top 10px
              justify-content space-between
              .price
                font-size: 14px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(238, 87, 74, 1);
                line-height: 22px;
              .sub
                &.move-enter-active, &.move-leave-active
                  transition all .7s
                &.move-enter, &.move-leave-to
                  opacity 0
                  transform translateX(20px) rotate(180deg)
              .num
                margin 0 6px
    .btn
      width 100%
      height 50px
      display flex
      align-items center
      justify-content space-between
      padding-left 16px
      box-sizing border-box
      font-family: PingFangSC-Medium;
      background #fff
      .all
        font-size: 16px;
        font-weight: 400;
        color: rgba(112, 117, 127, 1);
        line-height: 22px;
      .price
        font-size: 14px;
        font-weight: 500;
        color: rgba(236, 88, 79, 1);
        line-height: 20px;
      .submit
        width: 120px;
        height: 50px;
        background $red
        text-align: center
        line-height 50px
        font-size: 16px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
</style>
