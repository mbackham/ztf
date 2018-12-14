<template>
  <div class="nav">
    <div @click="timechangeFun">
      <span>按剩余时间</span>
      <img src="../../../static/images/icon_12px_排序1.png" alt="" v-if="timechange">
      <img src="../../../static/images/icon_12px_排序 copy.png" alt="" v-if="!timechange">
    </div>
    <slot name="price"></slot>
    <div  @click="datachange=!datachange">
      <span>按日期筛选</span>
      <img src="../../../static/images/icon_12px_排序.png" alt=""  v-if="datachange">
       <img src="../../../static/images/icon_12px_排序 copy.png" alt="" v-if="!datachange">
    </div>
  </div>
</template>

<script>
import Bus from '@/lib/bus'
  export default {
    name: "NavBar",
    data(){
         return {

            timechange:true,
            datachange:true
          } 

    },
    methods:{
      timechangeFun(){
           this.timechange=!this.timechange
           Bus.$emit('timechangeFun',this.timechange);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .nav
    width 100%
    height: 40px;
    padding 0 16px
    box-sizing border-box
    font-size: 14px
    font-family: PingFangSC-Medium
    font-weight: 500
    color: rgba(58, 61, 74, 1)
    display flex
    justify-content space-between
    align-items center
</style>
