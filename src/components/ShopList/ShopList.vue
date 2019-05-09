<!--需求提交商品列表组件-->
<template>
  <div class="scroll_wrap">
    <ul class="product_list">
      <li class="product_item" v-for="(pro,index) in productArr[num].productList" :key="index">
        <div class="item_img">
          <div class="checked" @click="changeCheck($event)"></div>
          <img :src="pro.shopImg" class="product_img">
        </div>
        <div class="item_text">
          <p class="product_name ellipsis">{{pro.name}}</p>
          <p class="explain ellipsis">{{pro.name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "ShopList",
    props: {
      num: Number
    },
    data() {
      return {
        productArr: [
          {
            productList:
              [
                {
                  shopImg: "/static/images/商品图.jpg",
                  name: "水星SG105P(千兆POE交接)水星SG105P(千兆POE交接)",
                  explain: "说明文字说明文字说明文字说明文字说明文字"
                },
                {
                  shopImg: "/static/images/商品.jpg",
                  name: "水星SG105P(千兆POE交接)水星SG105P(千兆POE交接)",
                  explain: "说明文字说明文字说明文字说明文字说明文字"
                },
                {
                  shopImg: "/static/images/商品图.jpg",
                  name: "水星SG105P(千兆POE交接)水星SG105P(千兆POE交接)",
                  explain: "说明文字说明文字说明文字说明文字说明文字"
                },
                {
                  shopImg: "/static/images/商品.jpg",
                  name: "水星SG105P(千兆POE交接)水星SG105P(千兆POE交接)",
                  explain: "说明文字说明文字说明文字说明文字说明文字"
                },
                {
                  shopImg: "/static/images/商品图.jpg",
                  name: "水星SG105P(千兆POE交接)水星SG105P(千兆POE交接)",
                  explain: "说明文字说明文字说明文字说明文字说明文字"
                },
                {
                  shopImg: "/static/images/商品.jpg",
                  name: "水星SG105P(千兆POE交接)水星SG105P(千兆POE交接)",
                  explain: "说明文字说明文字说明文字说明文字说明文字"
                },
                {
                  shopImg: "/static/images/商品图.jpg",
                  name: "水星SG105P(千兆POE交接)水星SG105P(千兆POE交接)",
                  explain: "说明文字说明文字说明文字说明文字说明文字"
                },
                {
                  shopImg: "/static/images/商品.jpg",
                  name: "水星SG105P(千兆POE交接)水星SG105P(千兆POE交接)",
                  explain: "说明文字说明文字说明文字说明文字说明文字"
                },
              ]
          }
        ]
      }
    },
    methods: {
      changeCheck(e) {
        if (e.target.className.indexOf("on") === -1) {
          e.target.className = 'checked on'
        } else {
          e.target.className = 'checked'
        }
      },
      getNeedList(){
        let _this=this;
        _this.$axios.post(_this.Url+'/api/require/listRequireCate',{
          "requestId":_this.stamp
        },
        {
          headers:{
            "Content-Type":"application/json",
            "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiI5IiwiaXNzIjoienRmZ2ouY29tIiwiZXhwIjoxNTQ1NDQzNzU2LCJ1c2VySWQiOiI1MDc2NjAzODA5OTk2ODAiLCJpYXQiOjE1NDQxNDc3NTZ9.omAEJzqG4o6dixiVzX0uUA1nHXBJhpp2-tWWxf7eQNY"
          }
        }
        ).then((res)=>{
            console.log(res)
            _this.list=res.data.data;
          }).catch((err)=>{
            console.log(err)
          })
      }
    },
    created(){
      this.getNeedList()
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
  .scroll_wrap
    width 100%
    overflow hidden
    height 409px
    .product_list
      width 100%
      padding-left 16px
      box-sizing border-box
      background rgba(255, 255, 255, 1)
      .product_item
        height 96px
        display flex
        padding 16px 16px 16px 0
        box-sizing border-box
        bottom-border-1px(#E5EAF3)
        .item_img
          display flex
          align-items center
          .checked
            width 36px
            height 36px
            margin-right 5px
            background url("../../../static/images/icon_未选中（大）.png") no-repeat
            background-position center center
            border-radius 50%
            &.on
              background url("../../../static/images/icon_选中（大）.png") no-repeat
              background-position center center
          .product_img
            width 64px
            height 64px
            border-radius 2px
        .item_text
          width 220px
          margin-left 16px
          .product_name
            font-size 16px
            font-family PingFangSC-Medium
            font-weight 500
            color rgba(58, 61, 74, 1)
            line-height 22px
          .explain
            font-size 14px
            font-family PingFangSC-Regular
            font-weight 400
            color rgba(112, 117, 127, 1)
            line-height 20px
</style>
