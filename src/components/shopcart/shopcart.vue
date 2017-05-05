<template>
	<div class="shopcart">
		<div class="content" @click = "toggleList">
			<div class="content-left">
				<div class="logo-warp">
					<div class="logo":class="{'hightlight':totalCount>0}">
						<span class="icon-shopping_cart" :class="{'hightlight':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'hightlight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop.prevent="pay">
				<div class="pay" :class="payClass" >
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			<div  transition="drop" v-for="ball in balls" v-show="ball.show" class="ball">
				<div class="inner inner-hook"></div>
			</div>
		</div>
		<div class="shopcart-list" v-show="listShow" transition="fold">
			<div class="list-header"  v-show="totalCount>0">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" v-el:list-content>
				<ul>
					<li class="food" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>￥{{food.price*food.count}}</span>
						</div>
						<div class="cartcontrol-warpper">
							<cartcontrol :food="food" :total-count='totalCount'></cartcontrol>
						</div>
					</li>

				</ul>
			</div>

		</div>
	</div>
	<div class="list-mask" v-show="listShow && totalCount >0" transition="fade" @click="hideList"></div>
</template>
<script>
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import BScroll from 'better-scroll';
	export default {
		props: {
			selectFoods: {
				type: Array,
				default () {
					return [
					{
						price: 10,
						count: 1
					}
					];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 30
			}
		},
		data () {
			return {
				balls: [
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				}
				],
				dropBalls: [],
				fold: true,
				hide: true
			};
		},
		computed: {
			totalPrice () {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount () {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc () {
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;
				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`;
				} else {
					return '去结算';
				}
			},
			payClass () {
				if (this.totalPrice < this.minPrice) {
					return 'no-enough';
				} else {
					return 'enough';
				}
			},
			listShow () {
				if (!this.totalCount === 0) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if (show) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$els.listContent, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				}
				return show;
			}

		},
		methods: {
			drop (el) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					};
				}
			},
			toggleList () {
				if (!this.totalCount) {
					return;
				}
				this.fold = !this.fold;
			},
			hideList () {
				this.fold = true;
			},
			empty () {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				});
				this.fold = !this.fold;
			},
			pay () {
				if (this.totalPrice < this.minPrice) {
					return;
				}
				window.alert(`支付${this.totalPrice}`);
			}
		},
		transitions: {
			drop: {
				beforeEnter (el) {
					let count = this.balls.length;
					while (count--) {
						let ball = this.balls[count];
						if (ball.show) {
							let rect = ball.el.getBoundingClientRect();
							let x = rect.left - 32;
							let y = -(window.innerHeight - rect.top - 22);
							el.style.display = '';
							el.style.webkitTransform = `translate3d(0,${y}px,0)`;
							el.style.transform = `translate3d(0,${y}px,0)`;
							let inner = el.getElementsByClassName('inner-hook')[0];
							inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
							inner.style.transform = `translate3d(${x}px,0,0)`;
						}
					}
				},
				enter (el) {
					/* eslint-disable no-unused-vars */ let rf = el.offsetHeight;
					this.$nextTick(() => {
						el.style.webkitTransform = 'translate3d(0,0,0)';
						el.style.transform = 'translate3d(0,0,0)';
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = 'translate3d(${x}px,0,0)';
						inner.style.transform = 'translate3d(0,0,0)';
					});
				},
				afterEnter (el) {
					let ball = this.dropBalls.shift();
					if (ball) {
						ball.show = false;
						el.style.display = 'none';
					}
				}
			}
		},
		components: {
			cartcontrol
		}
	};
</script>
<style>	
	.shopcart {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		background: #000;
	}
	.shopcart .content {
		display: flex;
		background: #141d27;	
	}
	.ball-container .ball{
		position: fixed;
		left: 32px;
		bottom: 22px;
		z-index: 200;

	}
	.ball-container .ball.drop-transition{
		transition: all 0.4s cubic-bezier(.49,-.29,.75,0.41);
	}
	.ball-container .ball.drop-transition .inner {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgb(0,160,220);
		transition: all 0.4s;

	}
	.shopcart .content-left {
		flex: 1;
	}
	.shopcart  .logo-warp {
		display: inline-block;
		position: relative;
		top:-10px;
		margin: 0 12px;
		padding: 6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		vertical-align: top;
		border-radius: 50%;
		background: #141d27;	
	}
	.shopcart  .logo-warp .logo{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #2b343c;
		text-align: center;
	}
	.shopcart  .logo-warp  .hightlight{
		color: rgb(255,255,255);
		background: #2f8bde;


	}
	.shopcart  .logo-warp .num {
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		border-radius: 16px;
		font-size: 9px;
		font-weight: 700;
		color: #fff;
		background: rgb(240,20,20);
		box-shadow: 0 4px 8px 0px rgba(0,0,0,0.4);
	}
	.logo .icon-shopping_cart{
		font-size: 24px;
		color: #80858a;
		line-height: 44px;
	}
	.shopcart .price {
		display: inline-block;
		vertical-align: top;
		margin-top: 12px;
		line-height: 24px;
		box-sizing: border-box;
		padding-right: 12px;
		border-right: 1px solid rgba(255,255,255,0.1);
		font-size: 16px;
		font-weight: 700;
		color: rgba(255,255,255,0.4);
	}
	.shopcart .price.hightlight{
		color: #fff;
	}
	.shopcart .desc {
		display: inline-block;
		vertical-align: top;
		margin-top: 12px;
		margin-left: 12px;
		color: rgba(255,255,255,0.4);
		font-size: 14px;
		line-height: 24px;
	}
	.shopcart .content-right {
		flex: 0 0 105px;
		width: 105px;

	}
	@media screen and (max-width: 320px) {
		.shopcart .content-right {
			flex: 0 0 84px;
			width: 84px;
			font-size: 12px;
		}
		.shopcart .desc {
			margin-left: 0px; 
			    font-size: 12px
		}
	}
	.shopcart .content-right .pay{
		color: rgba(255,255,255,0.4);
		background: #2b333b;
		height: 56px;
		line-height: 56px;
		font-size: 14px;
		text-align: center;
		font-weight: 700;
	}
	.shopcart .content-right .pay.no-enough {
		background: #2b333b;
	}
	.shopcart .content-right .pay.enough {
		background: #00b43c;
		color: #fff;
	}
	.shopcart-list {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		border-bottom: 1px solid rgba(7,17,27,0.1);

	}
	.shopcart-list.fold-transition {
		transition:  all 0.4s;
		transform: translate3d(0,-100%,0);
	}
	.shopcart-list.fole-enter,.shopcart-list.fold-leave {
		transform: translate3d(0,0,0);
	}
	.shopcart-list .list-header {
		font-size: 14px;
		font-weight: 200;
		height: 40px;
		line-height: 40px;
		padding: 0 18px;
		background: #f3f5f7;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.shopcart-list .list-header .title {
		float: left;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.shopcart-list .list-header  .empty {
		float: right;
		font-size: 12px;
		color: rgb(0,160,220);

	}
	.shopcart-list .list-content{
		padding:  0 18px;
		max-height: 217px;
		overflow:hidden;
		background: #fff;
	}
	.shopcart-list .list-content .food {
		position: relative;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		height: 60px;

	}
	.shopcart-list .list-content .food .name {
		line-height: 24px;
		font-size: 14px;
		color: rgb(7,17,27);
		line-height: 60px;

	}
	.shopcart-list .list-content .food .price {
		position: absolute;
		right: 90px;
		bottom: 12px;
		line-height: 24px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(240,20,20);

	}
	.shopcart-list .list-content .food .cartcontrol-warpper {
		position: absolute;
		right: 0;
		bottom: 6px;
	}
	.list-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 40;
		backdrop-filter:blur(10px);
	}
	.list-mask.fade-transition {
		background: rgba(7,17,27,0.6);
		transition: all 0.5s;
	}
	.list-mask.fade-enter , .list-mask.fade-leave{
		opacity: 0;
		background: rgba(7,17,27,0);
	}
</style>