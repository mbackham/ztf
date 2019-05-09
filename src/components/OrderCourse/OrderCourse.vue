<template>
  <div class="order_course" v-if="orderCourse">
    <ul class="time_list">
      <li class="title">订单历程</li>
      <li class="time_item" v-for="(item,index) in orderCourse" :key="index">
        <div class="data">
          <span>{{item.createTime}}</span>
        </div>
        <div class="pwrap">
          <p class="pone">{{item.operName}}</p>
          <p class="ptwo">
            {{item.remark}}
            <!--<span class="money on">￥100</span>-->
          </p>
          <span class="dian"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "OrderCourse",
    data() {
      return {}
    },
    props: {
      orderCourse: Array
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .order_course
    width 100%
    padding 0 16px 24px 16px
    box-sizing border-box
    background #fff
    .time_list
      position relative
      .title
        margin-top 8px
        font-size: 16px;
        font-weight: 500;
        color: rgba(58, 61, 74, 1);
        line-height: 48px;
        width: 375px;
        height: 48px;
        bottom-border-1px($main)
      .time_item
        width 100%
        display flex
        box-sizing border-box
        justify-content space-between
        font-family: PingFangSC-Regular
        margin-top 14px
        img
          margin 0 8px
          width 26px
          height 26px
        .data
          text-align right
          color #B0B6C2
          font-size: 14px;
          padding-left 20px
        .pwrap
          padding-left 15px
          box-sizing border-box
          color: #B0B6C2
          width 50%
          height 60px
          border-left 1px dashed $red
          position relative
          &.left
            border-left 1px solid #B0B6C2
          .pone
            font-size: 14px;
            line-height: 20px;
          .ptwo
            font-size: 12px;
            line-height: 16px;
            .money
              &.on
                color: $red
          .dian
            position absolute
            left 0
            top 0
            display inline-block
            width 14px
            height 14px
            border 4px solid $red
            box-sizing border-box
            transform translate(-50%,-100%)
            border-radius 50%
            &.on
              width 8px
              height 8px
              background:rgba(176,182,194,1);
              border none
</style>
