<!--服务方案列表-->
<template>
  <section>
    <TopHeader :title="title"/>
    <div class="scroll_wrap">
      <ul class="project_list">
        <li class="pro_item" v-for="(item,index) in list" :key="index" @click="bbb(index)">
          <div class="outer_wrap" @click="isShow1=!isShow1">
            <div>{{item.prodCate.cateName}}</div>
            <div>
              <img src="../../../../static/images/icon_展开.png" v-if="isShow1">
              <img src="../../../../static/images/icon_收起.png" v-else>
            </div>
          </div>
          <ul class="item_list" v-show="item.undefined">
            <li
            class="list_item" v-for="(itemT,index) in item.prod"  :key="index"
             @click="$router.push({path:'/every_detail', query: {prodId: itemT.prodId}})">
             {{itemT.prodName}}</li>
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
    name: "ServiceProject",
    data() {
      return {
        title: '服务方案',
        isShow1: true,
        list:[],
        //isShow2: null,
        // isShow3: false,
      }
    },
    computed:{
      ...mapState(['_token'])
    },
    mounted() {
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true,
        })
      })
      this.serverType()
    },
    methods:{
      //  getList(index){//获取详情
      //   let token=sessionStorage.getItem('userToken');
      //   let url="http://domch.cn/app-api/api/prod/getProdDetail";
      //   this.$ajax.post(url,{
      //     "data": this.list[index].prodCateId,
      //     "requestId": new Date().getTime()
      //   },
      //   {
      //     headers:{
      //       "Content-Type":"application/json",
      //       "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiI5IiwiaXNzIjoienRmZ2ouY29tIiwiZXhwIjoxNTQ1Mzc1NTA4LCJ1c2VySWQiOiIxMDAwMDAwMDIiLCJpYXQiOjE1NDQwNzk1MDh9.vkfTvTi9-Q3KGfOoB8oN_0qFX_WWVM1tmit-aCAziz8"
      //     }
      //   }).then((res)=>{
      //     // console.log(res);
      //     this.$router.push({
      //       path:'/every_detail',
      //       query:{
      //         data:res.data.data
      //       }
      //     })
      //   })
      // },
      bbb(index){
        this.list[index].undefined=!this.list[index].undefined
      },
      serverType(){
        const token=sessionStorage.getItem('userToken');
        const requestId = Math.random().toString(36).substr(2);
        var _this=this;
        this.$axios.post(this.Url+'/api/prod/listProdCateProd',{
          data:{

          },
          requestId,
        },
        {
           headers:{
               "token":localStorage.getItem('token')
           },
        },
        ).then(res=>{
          console.log(res)
          _this.list=res.data.data;
          for(let i in _this.list){
            var isShow2;
            _this.list[i][isShow2]=false;
            _this.list[i][null] = false

          }
          console.log(_this.list)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .scroll_wrap
    width 100%
    height 600px
    .project_list
      width 100%
      padding-left 16px
      box-sizing border-box
      background: rgba(255, 255, 255, 1);
      .pro_item
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(58, 61, 74, 1);
        width 100%
        padding-right 16px
        box-sizing border-box
        bottom-border-1px(#E5EAF3)
        .outer_wrap
          line-height 48px
          display flex
          justify-content space-between
        .item_list
          .list_item
            height:48px
            line-height 48px
            bottom-border-1px(#E5EAF3)

</style>
