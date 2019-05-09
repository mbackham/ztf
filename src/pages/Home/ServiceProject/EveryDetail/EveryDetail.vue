<!--服务方案-->
<template>
  <section class="detail_wrap">
    <TopHeader :title="title"/>
    <div class="scroll_wrap" ref="yoki" v-html="mes">
      <!-- <div class="inner_wrap">
        <div class="title">
          <span class="border"></span>
          <span>服务描述</span>
        </div>
        <p>提供5个10/100/1000M自适应RJ45端口，包括4个PoE端口和1个Uplink端口 每个端口均支持MDI/MDIX自动翻转及自协商 支持IEEE 802.3X全双工流控和Backpressure半双工流控
          支持IEEE 802.3af/at标准，自动检测与识别符合IEEE 802.3af/at标准的受电设备（PD）并为其供电 电源输出功率可达43W，单端口PoE功率可达30W 即插即用，无需配置，简单方便</p>
        <div class="title">
          <span class="border"></span>
          <span>产品参数</span>
        </div>
        <img src="../../../../../static/images/商品.jpg">
        <ul class="item_list">
          <li class="item">
            <span class="item_title">网络标准:</span>
            <span>IEEE 802.3、IEEE 802.3u、IEEE 802.3x、IEEE 802.3af、IEEE 802.3at</span>
          </li>
          <li class="item">
            <span class="item_title">指示灯:</span>
            <span>5个10/100Mbps RJ45 端口，其中1-4端口支持PoE功能</span>
          </li>
          <li class="item">
            <span class="item_title">指示灯:</span>
            <span>5个10/100Mbps RJ45 端口，其中1-4端口支持PoE功能</span>
          </li>
          <li class="item">
            <span class="item_title">指示灯:</span>
            <span>（开启之后，1-4端口速率强制为10Mbps，供电与数据传输距离最远可达260m以上，同时4个端口互相隔离，分别只能与Uplink端口口互通。）</span>
          </li>
        </ul>
        <div class="title">使用环境</div>
        <ul class="user_list">
          <li class="user_item">
            <span class="name">工作温度:</span>
            <span>0℃～40℃</span>
          </li>
          <li class="user_item">
            <span class="name">存储温度:</span>
            <span>-40℃～70℃</span>
          </li>
          <li class="user_item">
            <span class="name">工作湿度:</span>
            <span>10%~90% RH 不凝结</span>
          </li>
          <li class="user_item">
            <span class="name">存储湿度:</span>
            <span>5%~90% RH不凝结</span>
          </li>
          <li class="user_item">
            <span class="name">输入电源:</span>
            <span>53.5VDC 0.81A</span>
          </li>
        </ul>
        <p class="text_one">尺寸外形（L*W*H）</p>
        <p class="text_two"></p>
      </div> -->
      {{mes}}
    </div>
    <!-- <footer class="pay_btn">
      <div>
        <span class="text">服务费</span>
        <span class="price">￥1200</span>
      </div>
      <div class="button">
        选用次方案
      </div>
    </footer> -->
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  export default {
    name: "EveryDetail",
    data() {
      return {
        title: '水星S105P（百兆POE交接）',
        serviceId:'',
        mes:'',
      }
    },
    computed:{
      ...mapState(['_token'])
    },
    methods:{
      getServiceMes(){
        this.$axios.post(this.Url+'/api/prod/getProdDetail',{
          'data':this.serviceId,
          'requestId':this.stamp
        },{
          headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token')
          }
        }).then((res)=>{
          console.log(res);
          this.mes=res.data.message;
          console.log(this.$refs.yoki)
        })
      }
    },
    mounted() {
      this.getServiceMes();
      // this.$nextTick(() => {
      //   new BScroll('.scroll_wrap', {
      //     click: true,
      //   })
      // })
    },
    created(){
      this.serviceId=this.$route.query.prodId
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .detail_wrap
    background rgba(255, 255, 255, 1)
    .scroll_wrap
      width 100%
      height 600px
      overflow hidden
      padding 0 16px
      box-sizing border-box
      font-family: PingFangSC-Medium
      font-size 14px
      .inner_wrap
        padding-bottom 60px
        .title
          width 100%
          height 54px
          font-size: 16px
          font-weight: 500
          color: rgba(58, 61, 74, 1)
          line-height 54px
          .border
            width: 2px
            height: 14px
            display inline-block
            margin-right 5px
            background: rgba(238, 81, 71, 1)
        p
          line-height:22px
          color:rgba(112,117,127,1)
          text-align left
        img
          width: 100%
          height: 180px
          border-radius: 2px
          margin-bottom 16px
        .item_list
          .item
            line-height:22px
            .item_title
              color:rgba(112,117,127,1)

        .user_list
          .user_item
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            line-height:22px;
            .name
              color:rgba(112,117,127,1);
        .text_one,.text_two
          font-weight:500;
          color:rgba(58,61,74,1);
          line-height:20px;
    .pay_btn
      width 100%
      height 50px
      line-height 50px
      padding-left 16px
      box-sizing border-box
      position fixed
      bottom 0
      background:rgba(255,255,255,1)
      box-shadow:0 1px 0 0 rgba(229,234,243,1)
      font-family:PingFangSC-Medium
      display flex
      justify-content space-between
      .text
        color:rgba(112,117,127,1)
        font-size:14px;
      .price
        font-weight:500;
        color:rgba(236,88,79,1);
      .button
        font-size:16px;
        width:120px
        height:50px
        background:rgba(236,88,79,1)
        text-align: center
        font-weight:500;
        color:rgba(255,255,255,1);
</style>
