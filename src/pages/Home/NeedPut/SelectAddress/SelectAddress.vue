<!--选择服务地址-->
<template>
  <section class="address_wrap">
    <TopHeader :title="title">
      <img src="../../../../../static/images/icon_添加.png" slot="add" class="add" @click="$router.push('new_address')">
    </TopHeader>
    <div class="scroll_wrap">
      <ul class="address_list">
        <li class="address_item" v-for="(add,index) in addressArr" :key="index">
          <div class="user_info" @click="turnAddr(index)">
            <span class="user_name">{{add.consignee}}</span>
            <span class="user_phone">{{add.mobile}}</span>
            <div class="user_address ellipsis">{{add.city+add.addr}}</div>
          </div>
          <div class="item_handle">
            <div class="default_address" @click="updataNum(index)">
              <span class="checked" :class="{on: index===num}"></span>
              <span class="default" :class="{on: index===num}">默认地址</span>
            </div>
            <div class="amend_delete">
              <img src="../../../../../static/images/icon_修改.png" @click="$router.push('new_address')">
              <span @click="changeAdd(index)">修改</span>
              <img src="../../../../../static/images/icon_16px_删除.png" alt="">
              <span @click="delAddr(index)">删除</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState,mapActions} from 'vuex'
  import {Toast} from 'mint-ui'
  export default {
    name: "SelectAddress",
    data() {
      return {
        title: '选择服务地址',
        num: 0,
        addressArr: []
      }

    },
    methods: {
      ...mapActions(['addr_fn']),
      changeAdd(index){
        this.$router.push({
          path:'/new_address',
          query:{
            mes:this.addressArr[index]
          }
        })
      },
      updataNum(index) {
        this.$axios.post(this.Url+'/api/memAddr/setDefault',{
          'data':{
            'addressId':this.addressArr[index].addressId,
            'isDefault':1
          },
          'requestId':this.stamp
        },{
          headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
          }
        }).then((res)=>{
          this.num = index;
          Toast('设置成功')
          this.getAddress()
        })
      },
      getAddress(){
          this.$axios.post(this.Url+'/api/memAddr/page',{
            "data":{
              "data":{},
              "pageNum":1,
              "pageSize":10
            },
            "requestedId":this.stamp
          },
          {
            headers:{
              "Content-Type":"application/json",
              "token":localStorage.getItem('token')
            }
          }
        ).then((res)=>{
          console.log(res);
          this.addressArr=res.data.data.list;
          this.num=0;
        }).catch((err)=>{
          console.log(err)
        })
      },
      delAddr(index){//删除地址
        console.log(index);
        console.log(this.addressArr[index].addressId);
        this.$axios.post(this.Url+'/api/memAddr/del',{
          "data": this.addressArr[index].addressId,
          "requestId": this.stamp
        },{
          headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
          }
        }).then((res)=>{
          Toast('删除成功');
          this.getAddress()
          console.log(res)
        })
      },
      turnAddr(index){//选中地址
        this.addr_fn(this.addressArr[index])
        this.$router.push('/perfect')
      }
    },
    computed:{
      ...mapState(['token','addr','_token'])
    },
    created(){
      this.getAddress()
    },
    mounted() {
      console.log(this.token)
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/mixins.styl"
  .address_wrap
    width 100%
    .add
      vertical-align middle
      position absolute
      top 35px
      right 17px
    .scroll_wrap
      width 100%
      height 603px
      .address_list
        width 100%
        padding 8px 8px 0
        box-sizing border-box
        .address_item
          height 124px
          background rgba(255, 255, 255, 1)
          box-shadow 0 2px 6px -1px rgba(36, 37, 41, 0.1)
          border-radius 2px
          margin-bottom 8px
          padding 0 16px 12px
          box-sizing border-box
          .user_info
            padding 15px 0
            bottom-border-1px(#E5EAF3)
            font-size 16px
            .user_name, .user_phone, .user_address
              font-family PingFangSC-Medium
              font-weight 500
              line-height 20px
              color rgba(58, 61, 74, 1)
            .user_address
              font-size 14px
              margin-top 8px
          .item_handle
            display flex
            justify-content space-between
            margin-top 12px
            span, img
              vertical-align middle
            .default_address, .amend_delete
              font-size 14px
              font-family PingFangSC-Regular
              font-weight 400
              line-height 20px
              color rgba(112, 117, 127, 1)
              img
                margin-right 3px
            .default_address
              .checked
                display inline-block
                width 16px
                height 16px
                background url("../../../../../static/images/icon_未选中（小）.png") no-repeat
                &.on
                  background url("../../../../../static/images/icon_选中（小）.png") no-repeat
              .default
                &.on
                  color #EE5147
            .amend_delete
              text-align right
              img
                margin-left 12px


</style>
