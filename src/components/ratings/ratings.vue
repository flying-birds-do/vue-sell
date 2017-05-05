<template>
	<div class="ratings" v-el:ratings>
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="deliver">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="item in ratings" class="rating-item" v-show="needShow(item.rateType, item.text)">
						<div class="avatar">
							<img :src="item.avatar" width="24" height="24">
						</div>
						<div class="content">
							<h1 class="name">{{item.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="item.score" class="star"></star>
								<span class="delivery" v-show="item.deliveryTime"></span>
							</div>
							<p class="text">{{item.text}}</p>
							<div class="recommend" v-show="item.recommend.length">
								<span class="icon-thumb_up"></span>
								<span v-for="item in item.recommend" class="item">
									{{item}}
								</span>

							</div>
							<div class="time">{{item.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import star from 'components/star/star';
	import {formatDate} from 'src/common/js/date';
	import BScrool from 'better-scroll';
	import ratingselect from 'components/ratingselect/ratingselect';
	import split from 'components/split/split';
	const ALL = 2;
	const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			};
		},
		methods: {
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
		created () {
			this.$http.get('/api/ratings').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.ratings = response.data;
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScrool(this.$els.ratings, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				}
			});
		},
		filters: {
			formatDate (time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
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
		components: {
			star,
			ratingselect,
			split

		}
	};
</script>
<style type="text/css">
	.ratings{
		position: absolute;
		top:174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	.ratings .overview {
		display: flex;
		padding: 18px 0;
	}
	.ratingselect .rating-type  {
		padding-top: 18px;
		padding-left: 18px;
	}
	.overview .overview-left {
		flex: 0 0 137px;
		border-right: 1px solid rgba(7,17,27,0.1);
		text-align: center;
		padding: 6px 0;
		
	}
	.overview .overview-right {
		flex: 1;
		padding-left: 24px;
	}
	@media screen and (max-width: 320px) {
		.overview .overview-left {
			flex: 0 0 120px;
			width: 120px;
		}
		.overview .overview-right {
			padding-left: 8px;
		}

	}

	.overview .overview-left .score {
		margin-bottom: 6px;
		line-height: 28px;
		font-size: 24px;
		color: rgb(255,153,0);

	}
	.overview .overview-left .title{
		font-size: 12px;
		color: rgb(7,17,27);
		margin-bottom: 8px;
	}
	.overview .overview-left  .rank {
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159);

	}
	.score-wrapper {
		padding-bottom: 8px;
		font-size: 0;
	}
	.score-wrapper .title {
		font-size: 12px;
		color: rgb(7,17,27);
		line-height: 18px;

	}
	.score-wrapper  .score {
		display: inline-block;
		margin-left:12px;
		font-size: 12px;
		color: rgb(255,153,0);

	}
	.delivery-wrapper{
		font-size: 12px;
		color: rgb(147,153,159);
	}
	.delivery-wrapper  .deliver {
		margin-left: 10px;
	}
	.avatar img {
		border-radius: 12px;
	}
	.rating-wrapper {
		padding: 0 18px;
	}
	.rating-item {
		display: flex;
		padding: 18px 0;
		border-bottom: rgba(7,17,27,0.1);

	}
	.rating-item  .avatar{
		flex: 0 0 28px;
		margin-right: 18px;
	}
	.rating-item  .content{
		position: relative;
		flex: 1;
	}
	.rating-item  .content .name {
		line-height: 12px;
		font-size: 10px;
		color: rgb(7,17,27);
		margin-bottom: 4px;
	}
	.rating-item  .content .star-wrapper{
		margin-bottom: 6px;
		font-size: 0;
	}
	.rating-item  .content .star-wrapper .star {
		display: inline-block;
		vertical-align: top;
		margin-bottom: 6px;
	}
	.rating-item  .star-wrapper .delivery{
		display: inline-block;
		vertical-align: top;
		color: rgb(147,153,159);
	}
	.rating-item .content  .text{
		font-size: 12px;
		line-height: 18px;
		color: rgb(7,17,27);
		margin-bottom: 18px;
	}
	.recommend{
		line-height: 16px;
	}
	.recommend .icon-thumb_up ,.recommend  .item{
		display: inline-block;
		margin: 0 8px 4px 0;
		font-size: 9px;
		color: rgb(0,160,220);
	}
	.recommend  .item {
		padding: 0 6px;
		border: 1px solid rgba(7,17,27,0.1);
		border-radius: 1px;
		color: rgb(147,153,159);
		font-size: 12px;
	}
</style>