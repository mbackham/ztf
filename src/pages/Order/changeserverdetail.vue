<template>
	<div>
		<TopHeader :title="title">
	      <!-- <NavBar slot="nav"/> -->
	    </TopHeader>
		<div class="contents">
			<p class="con-text" v-html="content"></p>
			
		</div>
		<div class="bottom-part">
		    <div class="bot-price">
		        <span>服务费:￥{{prodPrice}}</span>
		     </div>
		     <div class="submit" @click="submit"  >
		        选用此方案
		     </div>
	     </div>
	</div>
</template>
<script>
import order from "@/api/model/order"
	export default{
		data(){
			return{
				title:'服务方案详情',
				content:"",
				prodPrice:0
			}
		},
		created() {
		   this.prodPrice=this.$route.query.prodPrice
			order.getProdDetail({"data":this.$route.query.prodId,"requestId":new Date().getTime()}).then((res) => {
				
						if(res.code==200){ 
								
                             this.content= res.message
                                
                        }else{
                              this.$tip(res.message)
                        }
                      }).catch((error) => {
                              this.$tip(error)
                                
                      })
     
		},
		methods:{
			submit(){
				this.$bus.$emit('changenum');
			}
		}
	}
</script>
<style scoped>
.contents{
	width:90%;
	margin:0 auto;
}
	
	.con-text{
		font-size: 16px;
		text-align: left;
		margin-top :10px;
	
	}
		
.bottom-part{
	position :absolute;
	bottom: 0px;
	left: 0;
	width:100%;
	height: 50px;
	display :flex;

}
	
.bot-price{
	flex:0 0 250px;
    line-height: 50px;
    overflow:hidden;
    font-size: 16px;
    background:#fff;
}
	
	.bot-price span{
		display:inline-block;
		font-size:17px;
		float:left;
		margin-left :38px;
		font-size :18px;
		color: #8e9399;
	

	}
		
.submit{
	flex:1;
    height:50px;
    background:red;
    text-align:center;
    font-size:18px;
    color:#fff;
   
    line-height:46px;		
}
	    	
	 	
		
</style>