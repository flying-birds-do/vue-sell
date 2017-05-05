<template>
	<div class="goods">
		<div class="menu-wrapper" v-el:menu-warpper>
			<ul>
				<li v-for = "item in goods" class="menu-item" :class="{'current':currentIndex===$index}" @click="selectMenu($index,$event)">
					<span class="text">
						<span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" v-el:foods-warpper>
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook" >
					<h1 class="footTitle">{{item.name}}</h1>
					<ul>
						<li  @click="selectFood(food,$event)"  v-for=" food in item.foods" class="food-item">
							<div class="icon">
								<img :src="food.icon" alt="" width="57" height="57">
							</div>
							<div class="conent">
								<div class="name">{{food.name}}</div>
								<div class="desc">
									{{food.description}}
								</div>
								<div class="extra">
									<span>月售 {{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥ {{food.price}}</span>
									<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-warpper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :select-foods="selectFoods" v-ref:shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.inPrice"></shopcart>	
	</div>
	<food :food="selectedFood" v-ref:food></food>
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import shopcart from 'components/shopcart/shopcart';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import food from 'components/food/food';
	const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			};
		},
		computed: {
			currentIndex () {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods () {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('/api/goods').then(function (response) {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
		},
		methods: {
			selectMenu (index, event) {
				if (!event._constructed) {
					return;
				}
				let foodList = this.$els.foodsWarpper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			_drop (target) {
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});
			},
			_initScroll () {
				this.meunScroll = new BScroll(this.$els.menuWarpper, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$els.foodsWarpper, {
					click: true,
					probeType: 3
				});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight () {
				let foodList = this.$els.foodsWarpper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectFood (food, event) {
				if (!event._constructed) {
					return;
				}
				console.log(111);
				this.selectedFood = food;
				this.$refs.food.show();
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		},
		// 用于接收cartcontrolshi'jian
		events: {
			'cart.add' (target) {
				this._drop(target);
			}
		}
	};
</script>
<style>
.cartcontrol-warpper{
	position: absolute;
	right: 0;
	bottom:12px;
}
	.goods .foods-wrapper .food-item{
		display: flex;
		margin: 18px ;
		padding-bottom: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		position: relative;
	}
	.goods .foods-wrapper .food-item:last-child {
		border-bottom: none;
		margin-bottom: 0;
	} 
	h1.footTitle{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(147,153,159);
		background: #f3f5f7;
	}
	.goods{
		display: flex;
		position: absolute;
		top:174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
	}
	.goods .menu-item {
		display: table;
		height: 54px;
		width: 56px;
		line-height: 14px;
		padding: 0 12px;
	}
	.goods .menu-item.current {
		position: relative;
		z-index: 10;
		margin-top: -1px;
		background: #fff;
		font-weight: 700;
		color: rgb(240,20,20);
		font-size: 0.35rem;
	}
	.goods .menu-item.current .text {
		border-bottom: 0;
	}
	.goods .menu-item .icon{
		display: inline-block;
		width: 12px;
		height: 12px;
		vertical-align: top;
		margin-right: 2px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
	}
	.goods .menu-item .text {
		font-size: 12px;
		display: table-cell;
		width: 56px;
		vertical-align: middle;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.goods .menu-item .icon.decrease{
		background-image: url('decrease_3@3x.png');
	}
	.goods .menu-item .icon.special{
		background-image: url('special_3@3x.png');
	}
	.goods .menu-item .icon.discount{
		background-image: url('discount_3@3x.png');
	}
	.goods .menu-item .icon.guarantee{
		background-image: url('guarantee_3@3x.png');
	}
	.goods .menu-item .icon.invoice{
		background-image: url('invoice_3@3x.png');
	}
	.goods .menu-wrapper{
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.goods .foods-wrapper{
		flex: 1;
		height: 100%;
	} 

	.goods .foods-wrapper .food-item .icon {
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.goods .foods-wrapper .food-item .conent{
		flex: 1;
		margin-left: 10px;

	}
	.goods .foods-wrapper .food-item .conent .name{
		margin:  2px 0 8px 0;
		font-size: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.goods .foods-wrapper .food-item .conent .desc {
		margin-bottom: 8px;
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.goods .foods-wrapper .food-item .conent .extra {
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.goods .foods-wrapper .food-item .price {
		font-weight: 700;
		line-height: 24px;
	}
	.goods .foods-wrapper .food-item  .now{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240,20,20);
	}
	.goods .foods-wrapper .food-item  .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159);
	}
</style>
