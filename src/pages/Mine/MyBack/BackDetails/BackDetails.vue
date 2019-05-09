<!--退单详情-->
<template>
  <section>
    <TopHeader :title="title">
      <img src="../../../../../static/images/icon_返回.png" class="return" @click="$router.back()" slot="return">
    </TopHeader>
    <div class="user_rating">
      <div>
        <img src="../../../../../static/images/商品.jpg" class="user_header">
        <div>
          <span></span>
        </div>
      </div>
      <img src="../../../../../static/images/icon__联系.png" alt="">
    </div>
  </section>
</template>

<script>
  export default {
    name: "BackDetails",
    data() {
      return {
        title: '退单详情',
        desMes:{}
      }
    },
    created(){
      this.desMes=this.$route.query.res;
      console.log(this.desMes)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .user_rating
    width: 100%
    height 64px
    margin 8px 0
    padding 0 27px 0 16px
    box-sizing border-box
    background:rgba(255,255,255,1)
    .user_header
      width:40px;
      height:40px;
      border-radius 50%
</style>
