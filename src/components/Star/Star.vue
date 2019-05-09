<!--评价星星列表组件-->
<template>
  <ul class="star_list">
    <li class="star_item" v-for="(item,i) in item_title" :key="i">
      <div class="name">{{item.tagCname}}</div>
      <div>
        <img v-for="(ele,j) in EvaluationAllCount" :key="j" :src="EvaluationAllCount[i].Evaluation>j?goodImg:notImg"
             @click="setShow(i,j)"/>
      </div>
    </li>
  </ul>
</template>

<script>
  import {postURL, token} from '../../api'

  export default {
    name: "Star",
    data() {
      return {
        item_title: "",
        goodImg: '../../../static/images/icon_评价_全星.png',
        notImg: '../../../static/images/icon_评价_空星.png',
        EvaluationAllCount: [
          {
            "Evaluation": 0
          },
          {
            "Evaluation": 0
          },
          {
            "Evaluation": 0
          },
          {
            "Evaluation": 0
          },
          {
            "Evaluation": 0
          }]
      };
    },
    mounted() {
      const url = postURL + "/api/comment/getCommentStar";
      var _this = this;
      this.$axios.post(
        url,
        {
          data: {
            cateName: ""
          },
          "requestId": new Date().getTime(),
        },
        {
          headers: {
            "token":localStorage.getItem('token')
          }
        }
      )
        .then(res => {
          this.item_title = res.data.data.tagScore;
        })
        .catch(err => {
          console.log(err);
        });
    },
    methods: {
      setShow(type, i) {
        this.EvaluationAllCount[type].Evaluation = i + 1;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .star_list
    width: 100%;
    margin-bottom: 8px;
    .star_item
      width: 100%;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(58, 61, 74, 1);
        line-height: 22px;
      .score
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(92, 97, 111, 1);
        line-height: 17px;
</style>
