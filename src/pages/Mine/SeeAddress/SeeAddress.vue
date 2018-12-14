<!--设置页面-->
<template>
  <section>
    <MyHeader :title="title" />
    <div class="list-content" id="list-content">
      
                   <div class="wrapbox">
                    <div class="ft_wrap fontCen" v-if="listdata.length==0">
                          暂无数据
                      </div>
                    <template v-for="(item , index) in listdata">
                          <div class="ft_wrap"  :key="index">
                           
                            <div>
                              <div>
                                <span class="name">{{item.teamHeaderName}}</span>
                                <span class="phone">{{item.teamHeaderMobile}}</span>
                              </div>
                              <div class="address">
                            {{item.areaInfo}}
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                  <!-- <div class="ft_wrap">
                    <img src="../../../../static/images/头像.png" alt="">
                    <div>
                      <div>  {{`${item.city}${item.province}${item.area}${item.street}${item.addr}`}}
                        <span class="name">刘波</span>
                        <span class="phone">17826531546</span>
                      </div>
                      <div class="address">
                        上海市 图误区 草房镇 万达广场西区 花园路 历山路雅庭舍11号楼1101号
                      </div>
                    </div>
                  </div> -->
       
       </div>
  </section>
</template>

<script>

  import user from "@/api/model/user"
  export default {
    name: "SeeAddress",
    data(){
      return{
        title: '地址查看',
        isLoading: false,
        listdata:[],
         loading: false,
         finished: false,
         tip:"加载成功",
         pageNum:0,
         isheight:true
      }
    },
    created(){
      this.getlist();
      
    },
    methods: {
      getlist(){
         this.pageNum++
        var that=this;
              //获取列表数据
         user.getaddress ({"data":  localStorage.getItem('userid'),"requestId": new Date().getTime()}).then((res) => {
           
            if(res.code==200){   
                     
                that.listdata.push(...res.data);
               that.loading = false;
             that.isLoading = false;
                // 数据全部加载完成
                if (res.data.list.length<10||res.data.list.length==0) {
                  that.finished = true;
                }
                 that.$toast(this.tip);
            }else{
              Toast(res.message)
              that.loading = false;
            }
                
          }).catch((error) => {
              console.log(error)
              that.loading = false;
          })
      },
      onRefresh() {
        this.listdata=[];
        this.pageNum=0;
         this.tip="刷新成功"
         this.getlist()
      },
      onLoad() {
        
        this.tip="加载成功"
        this.getlist()
     }
        
  },
  mounted(){
            let winHeight = document.documentElement.clientHeight                          //视口大小
            document.getElementById('list-content').style.height = (winHeight - 76) +'px'  //调整上拉加载框高度
          //  alert(winHeight)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
   .fontCen 
           text-align:center
   .list-content{
         margin-top -46px
        overflow-y:scroll;
    }
 
/deep/ .van-pull-refresh 
     
       z-index 100
      
      
.wrapbox
   background rgba(246,248,253,1)
   width 359px
   margin 0px auto 
  .ft_wrap
    width 100%
    height:90px;
    padding 16px 24px
    margin 0px auto 16px
    box-sizing border-box
    position relative
    z-index 10
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 6px -1px rgba(36, 37, 41, 0.1);
    display flex
    align-items center
    font-family:PingFangSC-Regular;
    img
      width 48px
      height 48px
      margin-right 9px
    .name
      font-size:14px;
      font-weight:400;
      color:rgba(58,61,74,1);
      line-height:20px;
    .phone
      color:rgba(172,174,182,1);
      font-size:12px;
      line-height:17px
    .address
      font-size:12px;
      color:rgba(102,102,102,1);
      line-height:17px;
</style>
