<template>
	<div class="cartcontrol">
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart" transition="move">
			<span class="inner icon-remove_circle_outline"></span>
		</div>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
	export default {
		props: {
			food: {
				type: Object
			},
			selectFoods: {
				type: Number
			}
		},
		methods: {
			addCart (event) {
				if (!event._constructed) {
					return;
				}
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count ++;
				}
				this.$dispatch('cart.add', event.target);
			},
			decreaseCart (event) {
				if (!event._constructed) {
					return;
				}
				if (this.food.count) {
					this.food.count --;
				} ;
			}
		}

	};
</script>
<style>
	.cartcontrol {
		font-size:0	;
	}
	.cartcontrol  .cart-decrease {
		display:inline-block;
		padding:6px;
		transition: all 0.4s linear;

	}
	.cartcontrol  .cart-decrease.move-transition {
		opacity: 1;
		transform: translate3d((0,0,0));
	}
	.cartcontrol  .cart-decrease.move-enter ,.cartcontrol  .cart-decrease.move-leave{
		opacity: 0;
		transform: translate3d(24px,0,0);
		transform: rotate(180deg);

	}
.cartcontrol  .cart-decrease.move-transition  .inner {
		display: inline-block;
		line-height:24px;
		font-size:24px;
		color:rgb(0,160,220);
		transition: all 0.4s linear;
		transform: rotate(0deg);
}
	.cartcontrol  .cart-add {
		display:inline-block;
		line-height:24px;
		font-size:24px;
		color:rgb(0,160,220);
		padding:6px;
	}
	.cartcontrol  .cart-count {
		color:rgb(147,153,159);
		font-size:10px;
		width:12px;
		vertical-align:top;
		padding-top:6px;
		line-height:24px;
	    text-align:center;
		display:inline-block;
	}
</style>