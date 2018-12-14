<!--我的资金页面-->
<template>
  <section class="fund_wrap">
    <MyHeader :title="title" />
    <div class="ft_wrap">
      <div class="hd_btn">
        <span class="type" @click="shadow=!shadow">{{secodeTit}}
          
        </span>
        <img src="../../../../static/images/icon_展开1.png"
             alt="">
      </div>
      <div class="asset">
        <div class="num">
          <span>总资产(元)</span>
          <p>{{headmoney[headindex].totlemoney}}</p>
        </div>
        <div class="num">
          <span>总单数</span>
          <p>{{headmoney[headindex].ordertotle}}</p>
        </div>
        <div class="num">
          <span>服务客户量</span>
          <p>{{headmoney[headindex].memNum}}</p>
        </div>
      </div>
    </div>
    <div class="title">
      <div>
        <img src="../../../../static/images/icon_最近三天订单.png"
             alt="">
        <span>近期三单</span>
      </div>
      <img src="../../../../static/images/标题_首页.png"
           alt="">
    </div>
    <div class="list-content"
         id="list-content">
      <!-- <van-pull-refresh v-model="isLoading"
                        @refresh="onRefresh"> -->

      <div class="scroll_wrap">
        <!-- v-model="loading" :offset="10" -->
        <!-- <van-list v-model="loading"
                  :finished="finished"
                  @load="onLoad"> -->
          <ul class="outer_wrap">
            <li class="item"
                v-if="Engineerdata.length==0">
              <div class="item_ft"
                   style="text-align:center;padding-top:20px;">
                暂无数据
              </div>
            </li>
            <li class="item"
                v-for="(item , index ) in Engineerdata"
                :key="index">
              <div class="item_hd">
                <span>订单号</span>
                <span class="num">{{item.orderId}}</span>
              </div>
              <div class="item_ft">
                <div>
                  <div class="user_info ellipsis">
                    <span>服务项目：</span>
                    <span>{{item.csServiceDesc}}</span>
                  </div>
                  <div class="address_wrap ellipsis">
                    <span>地址：</span>
                    <span>{{item.addr}}</span>
                  </div>
                </div>
                <div class="price_wrap">{{item.serviceFee}}</div>
              </div>
            </li>

          </ul>
        <!-- </van-list> -->
      </div>

      <!-- </van-pull-refresh> -->
    </div>
     <Shade v-if="shadow" />
     <section class="typecontent">
           <div v-if="shadow" @click="changetit(1)">历史详情</div>
           <div v-if="shadow" @click="changetit(2)">本周详情</div>
           </section>
  </section>
</template>

<script>
//import BScroll from 'better-scroll'
import user from "@/api/model/user";
import Shade from '@/components/Shade/Shade'
export default {
  name: "FundDetail",
  data() {
    return {
      secodeTit:'历史详情',
      firstweek:true,//第一次切换日期
      shadow:false,
      loading: false,
      finished: false,
      tip: "加载成功",
      headindex:0,
      isLoading: false,
      title: "我的资金",
      totlemoney: 0,
      ordertotle: 0,
      memNum: 0,
      headmoney:[{"totlemoney":0,"ordertotle":0,"memNum":0},{"totlemoney":0,"ordertotle":0,"memNum":0}],
      Engineerdata: [],
      listEngineerOrderdata: {
        requestId: new Date().getTime(),
        data: {
          orderCateState: 0
        }
      }
    };
  },
  components:{
    Shade
  },
  created() {
    this.totlemoneyFn(1);
    this.getlist();
    // this.getlist();
    //获取总金额
    // user
    //   .totlemoney({ requestId: new Date().getTime(), data: 1 })
    //   .then(res => {
    //     if (res.code == 200) {
    //       this.totlemoney = res.data.totalAmount;
    //       this.ordertotle = res.data.totalOrderNum;
    //       this.memNum = res.data.memNum;
    //     } else {
    //       this.$tip(res.message);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  },
  methods: {
    //获取金额
    totlemoneyFn(index){
         user
      .totlemoney({ requestId: new Date().getTime(), data: index })
      .then(res => {
        if (res.code == 200) {
          this.headmoney[index-1].totlemoney = res.data.totalAmount;
          this.headmoney[index-1].ordertotle = res.data.totalOrderNum;
          this.headmoney[index-1].memNum = res.data.memNum;
          if(index==2){
              this.firstweek=false;
          }
          
        } else {
          this.$tip(res.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    // onRefresh() {
    //   this.tip = "刷新成功";
    //   this.getlist();
    // },
    changetit(index){
        if(index==1){
            this.secodeTit="历史详情"
            this.headindex=index-1
        }
         if(index==2){
            this.secodeTit="本周详情"
            this.headindex=index-1
            if(this.firstweek){
                this.totlemoneyFn(index)
            }
        }
        this.shadow=false;
    },
    // onLoad() {
    //   this.tip = "加载成功";
    //   console.log("reach bottom... ...");

    //   this.getlist();
    // },
    getlist() {
      console.log("geting Lists... ...");
      //获取列表
      user
        .listEngineerOrder(this.listEngineerOrderdata)
        .then(res => {
          if (res.code == 200) {
            // console.log(res);
            // this.Engineerdata.push(...res.data);
            for(var i=0;i<res.data.list.length;i++){
                this.Engineerdata.push(res.data.list[i]);
               if(i==2){
               
                 break;
               }
            }
            // res.data.list.forEach( (item ,index )=>{
            //    this.Engineerdata.push(item);
            //    if(index==3){
            //      alert(index)
            //      return false
            //    }
            // })
           
            // this.loading = false;
            this.$toast(this.tip);
            // this.isLoading = false;
            // if (res.data.length < 10 || res.data.length == 0) {
            // if (res.data.length < 10) {
            //   console.log("finished");
            //   this.finished = true;
            // }
          } else {
            this.$tip(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    // let winHeight = document.documentElement.clientHeight                          //视口大小
    //  document.getElementById('list-content').style.height = (winHeight - 46) +'px'  //调整上拉加载框高度
    // this.$nextTick(() => {
    //   new BScroll('.scroll_wrap', {
    //     click: true
    //   })
    // })
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../common/stylus/mixins.styl';

.type 
  position relative  
  z-index 1001
.typecontent 
  width 100px
  position fixed
  left 15px
  top 130px
  z-index 1000
  background #fff
  text-align center
    
  div
  
    line-height 26px
    height 26px
.list-content {
  overflow-y: scroll;
}

/* 000 */
.fund_wrap {
  display: flex;
  flex-flow: column;
  align-items: stretch;
}

.fund_wrap > div, .fund_wrap > header {
  flex: none;
}

#list-content {
  flex: 1;
  box-shadow: 0 2px 2px -1px rgba(36, 37, 41, 0.1) inset;
  overflow: auto;
}

/* 000 */
.fund_wrap {
  width: 100%;
  height: 100%;

  .ft_wrap {
    width: 359px;
    height: 128px;
    padding: 0 24px;
    margin: -30px auto 16px;
    box-sizing: border-box;
    position: relative;
    z-index: 10;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 6px -1px rgba(36, 37, 41, 0.1);

    .hd_btn {
      height: 40px;
      line-height: 40px;
      margin-bottom: 16px;
      bottom-border-1px($main);

      span {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(58, 61, 74, 1);
        line-height: 20px;
      }
    }

    .asset {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .num {
        text-align: center;
        font-family: PingFangSC-Regular;

        span {
          line-height: 20px;
          font-size: 14px;
          color: rgba(112, 117, 127, 1);
        }

        p {
          font-size: 24px;
          font-family: DINPro-Medium;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          line-height: 31px;
        }
      }
    }
  }

  .title {
    width: 100%;
    height: 41px;
    padding: 0 17px 0 8px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(58, 61, 74, 1);
    line-height: 25px;
  }

  .scroll_wrap {
    width: 100%;
    overflow: hidden;
    margin-top: 8px;

    .outer_wrap {
      width: 100%;
      padding: 0 8px 8px;
      box-sizing: border-box;

      .item {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 6px -1px rgba(36, 37, 41, 0.1);
        border-radius: 2px;
        font-size: 14px;
        margin-bottom: 10px;
        padding-bottom: 16px;
        font-family: PingFangSC-Regular;

        .item_hd {
          width: 100%;
          padding: 0 16px;
          box-sizing: border-box;
          height: 50px;
          line-height: 50px;
          bottom-border-1px($main);

          .num {
            font-size: 14px;
            color: rgba(112, 117, 127, 1);
            line-height: 20px;
          }
        }

        .item_ft {
          width: 100%;
          box-sizing: border-box;
          padding: 0 16px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(112, 117, 127, 1);

          .user_info {
            margin-top: 16px;
            width: 220px;
          }

          .address_wrap {
            margin-top: 8px;
            width: 220px;
          }

          .price_wrap {
            width: 54px;
            height: 32px;
            text-align: right;
            line-height: 32px;
            margin-top: 20px;
            border-left: 1px solid $main;
            font-size: 20px;
            font-family: DINPro-Medium;
            font-weight: 500;
            color: rgba(243, 97, 63, 1);
          }
        }
      }
    }
  }
}
</style>
