<!--遮罩层-->
<template>
  <transition name="fade">
    <section class="shade"></section>
  </transition>
</template>

<script>
  export default {
    name: "Shade",
    props: {
      isShow: Boolean
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .shade
    width 100%
    height 100%
    background rgba(60, 64, 72, 1)
    opacity 0.8
    position fixed
    top 0
    left 0
    z-index 100
  .fade-leave
    opacity: 1
  .fade-leave-active
    opacity 0
    transition all 1.5s
</style>
