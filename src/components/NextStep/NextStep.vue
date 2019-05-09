<!--下一步组件-->
<template>
  <footer class="next_step" @click="$router.push('/perfect')">
    <slot name="text"></slot>
  </footer>
</template>

<script>
  export default {
    name: "NextStep"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .next_step
    width 100%
    height 50px
    text-align center
    line-height 50px
    position fixed
    bottom 0
    background rgba(236, 88, 79, 1)
    font-size 16px
    font-family PingFangSC-Medium
    font-weight 500
    color rgba(255, 255, 255, 1)
</style>
