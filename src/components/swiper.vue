<template>
  <div>
    <!-- <div class="swiper-container">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
      <div class="swiper-pagination"></div>
    </div> -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in imgs[4]" :key="index">
            <!-- <a :href="item.linkTarget?item.linkTarget:'javascript:;'"> -->
               <img :src="`http://domch.cn/file-api/image/${item.smallImagePath}`" alt="" width='100%' height="148" @click='targeto(index)'>
            
          </div>
          <!-- <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
          <div class="swiper-slide">Slide 8</div>
          <div class="swiper-slide">Slide 9</div>
          <div class="swiper-slide">Slide 10</div> -->
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
  </div>
</template>
<script>
  import Swiper from 'swiper'
  export default {
    // data () {
    //   // return {
    //   //   errpic: 'this.src="' + require('../assets/imgs/pic.png') + '"'
    //   // }
    // },
    props: ['imgs'],
    created () {
     
    },
    methods:{
      targeto(index){
        console.log(this.imgs[4][index].linkTarget);
        let href='http://'+this.imgs[4][index].linkTarget
        window.open(href, '_blank');
      }
    },
    mounted () {

     // console.log(this.imgS[0],123)
      setTimeout(()=>{
         new Swiper('.swiper-container', {
            slidesPerView: 1,
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
      },1000)
     
     
    },
    updated(){
      
    }
  }
</script>
<style type="text/css">
  @import 'swiper/dist/css/swiper.min.css';
  /*.swiper-wrapper{
    height:200px;
  }*/
    .swiper-container {
      width: 100%;
      height: 146px;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
    .swiper-slide img{
        width:100%;
        height:100%;
    }
   
</style>