<template>
	<div v-show="showFlag" class="food" transition='move' v-el:food>
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image" alt="">
				<div class="back" @click="hide">
					<i class="icon-arrow_lift"></i>	
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="seller-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥ {{food.price}}</span>
					<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
				</div>
			<div class="cartcontrol-wrapper">
				<cartcontrol :food="food"></cartcontrol>
			</div>
			<div @click.stop.prevent ="addFirst" class="buy" v-show="!food.count || food.count === 0" transition="fade">加入购物车</div>
			</div>
			<split v-show="food.info"></split>
			<div class="info" v-show ="food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar"  class="avatar" alt="" width="12" height="12">
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
							{{rating.text}}
							</p>

						</li>
					</ul>
				<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import BScrool from 'better-scroll';
	import Vue from 'vue';
	import {formatDate} from 'src/common/js/date';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import ratingselect from 'components/ratingselect/ratingselect';
	import split from 'components/split/split';
	    // const POSITIVE = 0;
	   // const NEGATIVE = 1;
		const ALL = 2;
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data () {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		methods: {
			show () {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScrool(this.$els.food, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
				});
			},
			hide () {
				this.showFlag = false;
			},
			addFirst (event) {
				if (!event._constructed) {
					return;
				}
				this.$dispatch('cart.add', event.target);
				Vue.set(this.food, 'count', 1);
			},
			needShow (type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			}
		},
		events: {
			'ratingtype.select' (type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			'content.toggle' (onlyContent) {
				this.onlyContent = onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		},
		filters: {
			formatDate (time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		}
	};
</script>
<style>
	.food {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background: #fff;
	}
	.food.move-transition {
		transition: all  0.2s linear;
		transform: translate3d(0,0,0);
	}
	.food.move-enter ,.food.move-leave{
		transform: translate3d(100%,0,0);
	}
	.image-header {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;

	}
	.image-header  img{
		position: absolute;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.back {
		position: absolute;
		top:10px;
		left: 0;
	}
	.back .icon-arrow_lift {
		display: block;
		padding: 10px;
		font-size: 20px;color: #fff;
	}
	.food-content .content {
		padding: 18px;
		position: relative;

	}
	.food-content .content .title {
		line-height: 14px;
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7,17,27);
	}
	.food-content .content .detail {
		margin-bottom: 18px ;
		line-height: 10px;
		font-size: 0;
		height: 10px;

	}
	.food-content .content .detail  .sell-count, .food-content .content .detail  .rating {
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.food-content .content .detail  .rating{
		margin-right: 12px;

	}
	.food-content .content .price {
		font-weight: 700;
		line-height: 24px;
	}
	.food-content .content  .now{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240,20,20);
	}
	.food-content .content  .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.food-content .cartcontrol-wrapper {
		position: absolute;
		right: 12px;
		border-bottom: 12px;
		top:60px;	
	}
	.food-content  .buy {
		position: absolute;
		right: 18px;
		bottom:58px;
		z-index: 10px;
		height: 24px;
		line-height: 24px;
		padding: 0 12px;
		box-sizing: border-box;
		font-size: 10px;
		border-radius: 12px;
		color: #fff;
		background: rgb(0,160,220);
	}
.food-content  .buy.fade-transition {
	opacity: 1;
	transition: all 0.2s;
}
.food-content  .buy.fade-enter ,.food-content  .buy.fade-leave{
	opacity: 0;

}
.food-content  .info {
	padding: 18px;

}
.food-content  .info .title{
	margin-bottom: 6px;
	line-height: 14px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.food-content  .info  .text{
	line-height: 24px;
	padding: 0 8px;
	font-size: 12px;
	color: rgb(77,85,93);
}
.rating{
	padding-left: 30px;
	padding-right: 30px;
}
.rating .title{
	font-size: 16px;
	font-weight: 700;
	color: #333;
	line-height: 40px;
}
.rating-wrapper{
	padding: 0 18px;
}
.rating-wrapper .rating-item {
	position: relative;
	padding: 16px 0;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.rating-wrapper .rating-item .user {
	position: absolute;
	right: 0;
	top:16px;
	line-height: 12px;
	font-size: 0;

}
.rating-wrapper .rating-item .user .name {
	display: inline-block;
	vertical-align: top;
	margin-right: 6px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.rating-wrapper .rating-item .user .avatar {
border-radius: 5px;
}
.rating-wrapper .rating-item .time{
	margin-bottom: 6px;
	line-height: 12px;
	font-size: 10px;
	color: rgb(146,153,159);
}
.rating-wrapper .rating-item .text{
	line-height: 16px;
	font-size: 12px;
	color: rgb(7,17,27);
}
.rating-wrapper .rating-item .text .icon-thumb_up{
	margin-left: 4px;
	line-height: 12px;
	font-size: 12px;
	color: rgb(0,160,220);

}
.rating-wrapper .rating-item .text .icon-thumb_down {
	margin-right: 4px;
	font-size: 12px;
	color: rgb(146,153,159);
}
.rating-wrapper .no-rating{
	padding: 16px 0;
	font-size: 12px;
	color: rgb(147,153,159);
}
</style>
