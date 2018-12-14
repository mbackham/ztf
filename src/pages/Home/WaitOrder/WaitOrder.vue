<!--待预约订单页面-->
<template>
  <section class="wait_wrap fund_wrap">
    <TopHeader :title="title">
      <!-- <NavBar slot="nav"/> -->
    </TopHeader>
    <div class="list-content"
         id="list-content">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> 
      <van-list v-model="loading"
                :finished="finished"
                @load="onLoad">
        <div class="scroll_wrap">
          <ul class="outer_wrap">
            <li class="item"
                @click="$router.push({path:'/trouble_detail', query: {orderId: item.orderId,src:1}})"
                v-for="( item ,index ) in Engineerdata"
                :key="index">
              <div class="item_hd">
                <div>
                  <span>订单号</span>
                  <span>{{item.orderId}}</span>
                </div>
               
              </div>
              <p>{{item.consignee}}</p>
              <div class="item_ft">
                <img src="../../../../static/images/icon_14px_时间1.png"
                     alt="">
                <span>{{item.startTime}} 至 {{item.endTime}}</span>
              </div>
              <div class="item_ft">
                <img src="../../../../static/images/icon_16px_位置2.png"
                     alt="">
                <span>{{`${item.province} ${item.city} ${item.area} ${item.street} ${item.addr}`}}</span>
              </div>
            </li>
          </ul>

        </div>
      </van-list>
      </van-pull-refresh>
    </div>
  </section>
</template>

<script>
//import BScroll from 'better-scroll'
import user from "@/api/model/user";
export default {
  name: "WaitTodo",
  data() {
    return {
      title: "待预约订单",
      loading: false,
      isLoading:false,
      finished: false,
      tip: "加载成功",
      Engineerdata: [],
      pageNum: 0
    };
  },
  methods: {
     onRefresh() {
            //this.listdata=[];
            // this.orderList.forEach(item => {
            //       item['orderArr']=[];
            // })
            this.Engineerdata=[];
            this.pageNum=0;
            this.tip="刷新成功"
            this.getlist()
          },
    onLoad() {
      this.tip = "加载成功";
      console.log("reach bottom... ...");

      this.getlist();
    },
    getlist() {
      console.log("geting Lists... ...");
      this.pageNum++;
      //获取列表
      user
        .listEngineerOrder({
          data: {
            data: { orderCateState: 4},
            pageNum: this.pageNum,
            pageSize: 10
          },
          requestId: new Date().getTime()
        })
        .then(res => {
          if (res.code == 200) {
            // console.log(res);
            // this.Engineerdata.push(...res.data);
             this.isLoading = false;  
            this.Engineerdata.push(...res.data.list);
            this.loading = false;
            this.$toast(this.tip);
            // if (res.data.length < 10 || res.data.length == 0) {
            if (res.data.list.length < 10) {
              console.log("finished");
              this.$toast("没有更多数据了");
              this.finished = true;
            }
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

.list-content {
  overflow-y: scroll;
}

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

.wait_wrap {
  width: 100%;
  height: 100%;

  .scroll_wrap {
     width: 100%;
     overflow: hidden;
     margin-top: 8px;
    .outer_wrap {
      width: 100%;
      padding: 0 8px 8px;
      box-sizing: border-box;

      .title {
        height: 56px;
        width: 100%;
        display: flex;
        padding: 0 8px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(58, 61, 74, 1);
        line-height: 26px;
      }

      .item {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 2px 6px -1px rgba(36, 37, 41, 0.1);
        border-radius: 2px;
        font-size: 14px;
        margin-bottom: 8px;
        padding-bottom: 16px;

        .item_hd {
          width: 100%;
          padding: 0 16px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          bottom-border-1px($main);

          .time {
            font-size: 18px;
            font-family: DINPro-Bold;
            font-weight: bold;
            color: rgba(236, 88, 79, 1);
          }
        }

        p {
          width: 100%;
          box-sizing: border-box;
          font-size: 16px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          padding: 0 16px;
          margin-top: 16px;
          line-height: 22px;
        }

        .item_ft {
          width: 100%;
          box-sizing: border-box;
          padding: 0 16px;
          margin-top: 10px;
          color: rgba(58, 61, 74, 1);
        }
      }
    }
  }
}
</style>
