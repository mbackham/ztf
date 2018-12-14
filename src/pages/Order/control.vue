<template>
	<div class="control">
		<transition name='translate-rotate'>
			<div class="icon-remove_circle_outline cart-decr" v-show='items.count' @click='decr'>
			</div>
		</transition>
		<div class="cart-count" v-show='items.count>0'>{{items.count}}</div>
		<div class="cart-add  icon-add_circle " @click ='add'></div>
	</div>
</template>
<script>

	export default{
		name:'control',
		props: {
			items: {
				type:Object,
				default(){
					return{}
				}
			}

		},
		// created(){
		// 	console.log(this.food)
		// },
		methods:{
			add(){
				this.$emit('add',this.items)
				},
			decr(){
				this.$emit('decr',this.items)
				}
			}
		}
	
</script>
<style lang="stylus" rel="stylesheet/stylus">
.control
	font-size 0;

	.cart-decr
		display:inline-block;
		padding:6px;
		font-size:24px;
		line-height:24px;
		color:rgb(0,160,220);
	
	.cart-count
		display:inline-block;
		vertical-align:top;
		width:12px;
		padding-top:6px;
		line-height:24px;
		text-align:center;
		font-size:10px;
		color:rgb(147,153,159);
	
	.cart-add
		display:inline-block;
		font-size:24px;
		line-height:24px;
		padding:6px;
		color:rgb(0,160,220);
		
	
	.icon-remove_circle_outline
		&.translate-rotate-enter,&.translate-rotate-leave-to
			transform:translate3D(24px,0,0) rotate(360deg);
			opacity:0;
		
		&.translate-rotate-enter-active,&.translate-rotete-leave-active
		    transition:all .4s 
		
		&.translate-rotate-enter-to,&.translate-rotate-leave
			transform:translate3D(0,0,0) rotate(0);
			opacity:1;
		
	

</style>