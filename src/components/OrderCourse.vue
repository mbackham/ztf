<template>
  <div class="order_course" v-if="orderCourse.length>0">
    <div class="title">订单历程</div>
    <ul class="time_list">
      <li class="time_item" v-for="(item,index) in orderCourse" :key="index">
        <div class="data">
          <span>{{item.createTime}}</span>
        </div>
        <div class="pwrap" :class="{left:item.operType===0}">
          <p class="pone">{{item.operName}}</p>
          <p class="ptwo">
            {{item.remark}}
            <!--<span class="money on">￥100</span>-->
          </p>
          <span class="dian" :class="{on:item.operType===0}"></span>
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
  @import "../common/stylus/mixins.styl"
  .order_course
    width 100%
    padding 0 16px 24px 0
    box-sizing border-box
    background #fff
    .title
      
      font-size: 16px;
      font-weight: 500;
      color: rgba(58, 61, 74, 1);
      line-height: 48px;
      width: 100%;
      height: 48px;
      padding 0
      box-sizing border-box
      bottom-border-1px($main)
      padding-left 15px
    .time_list
      position relative
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
          text-align center
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
