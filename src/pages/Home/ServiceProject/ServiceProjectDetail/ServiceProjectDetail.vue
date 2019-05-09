<!--服务方案详情页面-->
<template>
  <section>
    <TopHeader :title="title"/>
    <div class="title">订单信息</div>
    <ul class="order_list">
      <li class="order_item">
        <span class="order_text">订单号</span>
        <span class="order_num">{{orderInfo.orderId}}</span>
      </li>
      <li class="order_item">
        <span class="order_status">订单状态</span>
        <span class="order_ing" :class="changeClass(orderInfo.orderStateName)">{{orderInfo.orderStateName}}</span>
      </li>
    </ul>
    <div class="title">服务方案</div>
    <div class="scroll_wrap">
      <ul class="server_list">
        <li class="server_item" v-for="(server,index) in serverArr" :key="index">
          <div class="outer_wrap">
            <div>
              <img :src="`http://domch.cn/file-api/image/${server.prodImagePath}`" class="item_img" v-if="server.prodImagePath">
              <span class="name">{{server.prodName}}</span>
            </div>
            <div>
              <span class="sum">x{{server.prodNum}}</span>
              <span class="price">￥{{server.totalPrice}}</span>
            </div>
            <span class="triangle"></span>
          </div>
          <ul class="item_list" v-show="server.prodMaterial">
            <li class="shop_item" v-for="(item, index) in server.prodMaterial" :key="index">
              <div class="name">{{item.materialName}}</div>
              <div class="count_wrap">
                <span class="sum">x{{item.materialNum}}</span>
                <span class="price">￥{{item.totalPrice}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  export default {
    name: "ServiceProjectDetail",
    data() {
      return {
        title: '服务方案详情',
        isShow: false,
        orderInfo: this.$route.query.info, //订单号
        serverArr: []
      }
    },
    computed:{
      ...mapState(['_token'])
    },
    created() {
      const {orderInfo} = this;
      const id = orderInfo.orderId;
      this.$axios.post(this.Url+'/api/order/getOrderServiceDetail', {
          "data": id,
          "requestId":this.stamp,
        },
        {
          headers: {
            "token":localStorage.getItem('token')
          }
        }).then(res => {
        const result = res.data;
        if (result.code === 200) {
          this.serverArr = result.data;
        }
      })
    },
    methods:{
      //改变状态框的背景色
      changeClass(s) {
        switch (s) {
          case '待分配':
            return 'pink';
          case '施工中':
            return 'yellow';
          case '已完成':
            return 'green';
        }
      },
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true,
        })
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"

  .order_list
    width 100%
    padding 0 16px
    box-sizing border-box
    margin-bottom 8px
    font-family PingFangSC-Medium
    background rgba(255, 255, 255, 1)
    .order_item
      height 48px
      display flex
      justify-content space-between
      align-items center
      font-size: 14px
      bottom-border-1px(#E5EAF3)
      .order_text, .order_status
        font-weight: 400
        color: rgba(112, 117, 127, 1)
        line-height: 20px
      .order_num
        font-weight: 400
        color: rgba(58, 61, 74, 1)
        line-height: 20px
      .order_ing
        font-weight: 400
        color: #f8a210
        line-height: 20px
        &.pink
          color: rgba(238, 81, 71, 1);
        &.yellow
          color: rgba(248, 162, 16, 1);
        &.green
          color: rgba(46, 171, 89, 1);
  .title
    width 100%
    height 48px
    padding 0 16px
    box-sizing border-box
    line-height 48px
    box-shadow 0 0 0 0 rgba(229, 234, 243, 1)
    font-size 16px
    font-weight 500
    color rgba(58, 61, 74, 1)
    background rgba(255, 255, 255, 1)
    bottom-border-1px(#E5EAF3)

  .scroll_wrap
    width 100%
    height 400px
    overflow hidden
    background rgba(255, 255, 255, 1)
    .server_list
      width 100%
      margin-bottom 8px
      font-family PingFangSC-Medium
      .server_item
        width 100%
        line-height 60px
        padding 0 16px
        box-sizing border-box
        font-size: 14px
        font-family: PingFangSC-Regular
        font-weight: 400
        .name
          color rgba(55, 57, 61, 1)
          line-height 20px
          margin-left 5px
        .sum
          font-weight: 400
          color: rgba(55, 57, 61, 1)
          line-height: 20px
          margin-right 43px
        .price
          font-weight 500
          color rgba(55, 57, 61, 1)
          line-height 20px
        .outer_wrap
          position relative
          display flex
          justify-content space-between
          align-items center
          span, img
            vertical-align middle
          .item_img
            width 36px
            height 36px
            border-radius: 2px
          .triangle
            position absolute
            left 18px
            bottom 0
            width: 0
            height: 0
            border-width: 3px
            border-style: solid;
            border-color: transparent transparent #E5EAF3 transparent; /*透明 透明  灰*/
            display block
        .item_list
          width 100%
          background: rgba(249, 251, 254, 1);
          box-shadow: 0px 1px 0px 0px rgba(229, 234, 243, 1), 0px 0px 0px 0px rgba(229, 234, 243, 1);
          .shop_item
            height 48px
            display flex
            align-items center
            justify-content space-between
            .name
              color rgba(58, 61, 74, 1)
            .count_wrap
              display flex
              justify-content space-between
              .price
                text-align right
                display inline-block
                width 45px
</style>
