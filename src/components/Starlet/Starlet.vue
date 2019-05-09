<!--订单详情页面的星星组件-->
<template>
  <div class="star">
    <span class="star_item" v-for="(sc, index) in starClasses" :key="index" :class="sc"></span>
    <span class="score">{{score}}</span>
  </div>
</template>

<script>
  const CLASS_ON = 'on';
  const CLASS_HALF = 'half';
  const CLASS_OFF = 'off';
  export default {
    name: 'Starlet',
    props: {
      score: Number
    },
    computed: {
      starClasses() {
        const scs = [];
        const {score} = this;
        const scoreInteger = Math.floor(score);

        // 向scs中添加n个CLASS_ON
        for (let i = 0; i < scoreInteger; i++) {
          scs.push(CLASS_ON)
        }
        // 向scs中添加1/0个CLASS_HALF
        if (score * 10 - scoreInteger * 10 >= 5) {
          scs.push(CLASS_HALF)
        }
        // 向scs中添加n个CLASS_OFF
        while (scs.length < 5) {
          scs.push(CLASS_OFF)
        }
        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .star
    .star_item
      width 14px
      height 14px
      display inline-block
      background-repeat no-repeat
      &.on
        background url("../../../static/images/icon_全星.png")
      &.half
        background url("../../../static/images/icon_半星.png")
      &.off
        background url("../../../static/images/icon_空星.png")
    .score
      margin-left 10px
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(58, 61, 74, 1);
      line-height: 20px;
      margin-bottom 3px
</style>
