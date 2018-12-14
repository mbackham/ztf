<!--文本输入框组件 class="text_wrap"-->
<template>
  <section  :class="{'bottomwrap':src!=2,'text_wrap':src==2}">
    <div class="hd">
      <div class="title">{{text}}</div>
      <textarea rows="10" placeholder="请输入您的需求" v-model="Inpdata.backReason"></textarea>

      <div class="postionbox">
      <div class="bigimgbox">
          <div class="showimgbox" v-for="(item , index) in imglist" :key="index">
              <img class="showimg" :src="`${baseurl}image/${item.storePath}`"  alt="" >
                 <!-- <van-icon name="clear" click="delimg" /> -->
                 <i data-v-308b6bea="" class="van-icon van-icon-clear" @click="delimg(index)"><!----><!----></i>
          </div>
        </div>
          <div class="imgbox">
            
            <img src="../../../static/images/分组11.png" alt="" v-if="Inpdata.backImageId.length<3"> 
            <van-uploader :after-read="onRead" accept="image/gif, image/jpeg,image/png" multiple=3>
              
              </van-uploader>
          </div>
      </div>
    </div>
    <div v-if="src!=2" class="btn" @click="emitevent">确定</div>
  </section>
</template>

<script>
  import file from '@/api/model/file';
  import base from '@/api/base'; // 导入接口域名列表
  export default {
    name: "TextInput",
    data(){
      return {
        imglist:[],
        baseurl:base.portSRCFile,
        Inpdata:{backImageId:[]}
      }
    },
    props: {
      text: String,
      textShow: Boolean,
      src: String
    },
    watch:{
        Inpdata:{
            handler(curVal,oldVal){
　　　　　　　　　//　alert ( curVal.backReason+'/'+oldVal.backReason )
              if(this.src==2){
                                  this.$emit('addemitimgid',this.Inpdata);//$emit 
               }
　　　　　　　},
　　　　　　　　　　deep:true
        }
    },
    methods:{
      emitevent(){
          this.$emit('emitevent',this.Inpdata);//$emit
      },
      delimg(index){  //删除图片
          this.imglist.splice(index,1)
           this.Inpdata.backImageId.splice(index,1)
           if(this.src==2){
                    this.$emit('addemitimgid',this.Inpdata.backImageId);//$emit 
                   
            }
      },
      onRead(e) {
        //注意，我们这里没有使用form表单提交文件，所以需要用new FormData来进行提交
                let fd= new FormData();
               // console.log(e.length)
                if(e.length){
                   if(e.length>3||e.length+this.Inpdata.backImageId.length>3){
                     this.$tip('最多上传三张图片')
                     return;
                   }
                    e.forEach( (item ,index) =>{
                      fd.append("file", e[index].file);
                    })
                }else{
                      fd.append("file", e.file);
                }
                
               
                //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
                
                file.uploadimg(fd)
                    //成功回调
                    .then(res => {
                      if(res.code==200){
                          this.imglist.push(...res.data)
                          res.data.forEach(item => {
                              this.Inpdata.backImageId.push(item.fileId);
                               
                          })
                         
                          if(src==2){
                                 this.$emit('addemitimgid',this.Inpdata.backImageId);//$emit 
                          }
                         
                      }
                        
                     }) //将服务器返回的图片链接添加进img数组，进行预览展示
                    //失败回调
                    .catch(err => {this.$tip(err);});
                    


          console.log(file)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
        .van-icon-clear
          position absolute 
          top 5px
          right 5px
          font-size 18px
          color #ec584f

        .showimgbox
          display inline-block
          position relative
        .postionbox
          position absolute
          left 20px
          bottom 10px
        .bigimgbox
          
          display inline-block
          
        .showimg
          width 72px
          height 72px 
          
        
        .imgbox
          with 72px
          height 72px 
          display inline-block
          position relative
          margin-top 1px
          
            img
              position absolute
              bottom 0
              left 0
 /deep/ .van-uploader
          z-index 1000
          opacity 0
          position absolute!important
          left 0!important
          top 0!important
          bottom 0!important
          right 0!important
        .bottomwrap
          position fixed
          bottom 0
          left 0
          width 100%
          background #fff
          z-index 1000000000
        .text_wrap
          width 100%
          background #fff
          position relative
          z-index 1000000000   
          padding-bottom 70px 
        .hd
          padding 0 16px
          position relative
          box-sizing border-box
        
          .title
            width 100%
            height 56px
            font-size: 16px;
            text-align: left
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(58, 61, 74, 1);
            line-height: 56px;
            bottom-border-1px($main)
          textarea
            border none
            width 100%
            height: 180px;
            background #EEF0F6
            padding 8px
            outline none
            font-size: 14px;
            font-family: PingFangSC-Regular;
            box-sizing border-box
            &::-webkit-input-placeholder /*Webkit browsers*/
              color: #999
          .hint
            text-align right
            margin-top 6px
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(144, 149, 159, 1);
            line-height: 17px;
          
        .btn
          margin-top 32px
          width 100%
          height 48px
          text-align: center
          line-height 48px
          background $red
          font-size: 14px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
</style>
