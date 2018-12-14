<!--已完成列表-->
<template>
  <section class="finish_wrap">
    <TopHeader :title="title">
      <!-- <NavBar slot="nav"/> -->
    </TopHeader>
    <div class="scroll_wrap">
      <ul class="outer_wrap">
        <li class="item" @click="$router.push({path:'/trouble_detail',query:{orderId:item.orderId}})" v-for='(item,index) in dataList' :key='index'>
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>{{item.orderId}}</span>
            </div>
            
          </div>
          <p>{{item.orderRequire[0].cateName}}</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>{{item.dispatchTime}} 至 {{item.endTime}}</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>{{item.province}}{{item.city}}{{item.area}}{{item.street}}{{item.addr}}</span>
          </div>
        </li>
        <!-- <li class="item" @click="$router.push('/order_detail')">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>2018102111053</span>
            </div>
            <div class="time">45:23</div>
          </div>
          <p>维修家庭中路由器及网线问题</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>2018-10-12 12:00 至 2018-10-13 12:00</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>绿地新城D2 10楼 1002</span>
          </div>
        </li>
        <li class="item" @click="$router.push('/order_detail')">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>2018102111053</span>
            </div>
            <div class="time">45:23</div>
          </div>
          <p>维修家庭中路由器及网线问题</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>2018-10-12 12:00 至 2018-10-13 12:00</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>绿地新城D2 10楼 1002</span>
          </div>
        </li>
        <li class="item" @click="$router.push('/order_detail')">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>2018102111053</span>
            </div>
            <div class="time">45:23</div>
          </div>
          <p>维修家庭中路由器及网线问题</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>2018-10-12 12:00 至 2018-10-13 12:00</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>绿地新城D2 10楼 1002</span>
          </div>
        </li>
        <li class="item" @click="$router.push('/order_detail')">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>2018102111053</span>
            </div>
            <div class="time">45:23</div>
          </div>
          <p>维修家庭中路由器及网线问题</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>2018-10-12 12:00 至 2018-10-13 12:00</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>绿地新城D2 10楼 1002</span>
          </div>
        </li>
        <li class="item" @click="$router.push('/order_detail')">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>2018102111053</span>
            </div>
            <div class="time">45:23</div>
          </div>
          <p>维修家庭中路由器及网线问题</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>2018-10-12 12:00 至 2018-10-13 12:00</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>绿地新城D2 10楼 1002</span>
          </div>
        </li>
        <li class="item" @click="$router.push('/order_detail')">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>2018102111053</span>
            </div>
            <div class="time">45:23</div>
          </div>
          <p>维修家庭中路由器及网线问题</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>2018-10-12 12:00 至 2018-10-13 12:00</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>绿地新城D2 10楼 1002</span>
          </div>
        </li>
        <li class="item" @click="$router.push('/order_detail')">
          <div class="item_hd">
            <div>
              <span>订单号</span>
              <span>2018102111053</span>
            </div>
            <div class="time">45:23</div>
          </div>
          <p>维修家庭中路由器及网线问题</p>
          <div class="item_ft">
            <img src="../../../../static/images/icon_14px_时间1.png" alt="">
            <span>2018-10-12 12:00 至 2018-10-13 12:00</span>
          </div>
          <div class="item_ft">
            <img src="../../../../static/images/icon_16px_位置2.png" alt="">
            <span>绿地新城D2 10楼 1002</span>
          </div>
        </li> -->

      </ul>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import user from '@/api/model/user'
  export default {
    name: "FinishOrder",
    data() {
      return {
        title: '已完成订单',
        dataList:{},
        postdata:{ 
            "data": {
              "orderCateState": 3,
             },
            "requestId": new Date().getTime()
         }
      }
    },
    mounted() {
      const requestId = Math.random().toString(36).substr(2)
       const token = localStorage.getItem("token")
      this.$nextTick(() => {
        new BScroll('.scroll_wrap', {
          click: true
        })
      })
      this.getlist()
    },
    methods:{
      getlist(){
        user.boEngineerOrder(this.postdata).then((res) =>{
            this.dataList = res.data
        }).catch((err) =>{
          console.log(err)
        })
      }
    }
    // axios.post('http://domch.cn/app-api/api/order/pageEngineerOrder',{
    //        data: {
    //         orderCateState: 3,
    //         querySort: [
    //           {
              
    //           }
    //          ],
    //        pageNum: 1,
    //         pageSize: 10
    //   },
    //   requestId: requestId
    //  },{
    //     headers:{
    //     token
    //       //token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiIyIiwiaXNzIjoienRmZ2ouY29tIiwiZXhwIjoxNTQ1NDQ5ODc1LCJ1c2VySWQiOiIxMDAwMDAwMDQiLCJpYXQiOjE1NDQxNTM4NzV9.6u1NxaYkCtOHVyagqh7_JHu12YhisNgg0R27KVB8AXA"
    //     }
    //   }).then(res => {
    //     this.dataList = res.data.data.list
    //     console.log(this.dataList)
    //   }).catch(err => {
    //     console.log(err)
    //   })
  
 }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .finish_wrap
    width 100%
    height: 100%
    .scroll_wrap
      width 100%
      height 610px
      overflow hidden
      margin-top 8px
      .outer_wrap
        width 100%
        padding 0 8px 8px
        box-sizing border-box
        .title
          height 56px
          width 100%
          display flex
          padding 0 8px
          box-sizing border-box
          justify-content space-between
          align-items center
          font-size: 18px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(58, 61, 74, 1);
          line-height: 26px;
        .item
          width: 100%;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 2px 6px -1px rgba(36, 37, 41, 0.1)
          border-radius: 2px;
          font-size 14px
          margin-bottom 8px
          padding-bottom 16px
          .item_hd
            width 100%
            padding 0 16px
            box-sizing border-box
            display flex
            justify-content space-between
            align-items center
            height 50px
            bottom-border-1px($main)
            .time
              font-size: 18px;
              font-family: DINPro-Bold;
              font-weight: bold;
              color: rgba(236, 88, 79, 1);
          p
            width 100%
            box-sizing border-box
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(58, 61, 74, 1);
            padding 0 16px
            margin-top 16px
            line-height: 22px;
          .item_ft
            width 100%
            box-sizing border-box
            padding 0 16px
            margin-top 10px
            color: rgba(58, 61, 74, 1);
</style>
