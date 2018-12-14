<!--遮罩层-->
<template>
  <section class="shade" @click="closeshade"></section>
</template>

<script>
  export default {
    name: "Shde",
    data(){
      return {
        shadeshow:false
      }
    },
    methods:{
      closeshade(){
        this.$emit('closeshade');
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .shade
   
    background rgba(60, 64, 72, .8)
    position fixed
    top 0
    left 0
    z-index 992
    right 0
    bottom  0
    overflow hidden
</style>
