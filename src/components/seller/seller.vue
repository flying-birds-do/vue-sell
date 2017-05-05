<template>
	<div class="seller" v-el:seller>
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text ml10" >月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							{{seller.minPrice}}
							<span class="stress">元</span>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							{{ seller.deliveryPrice}}
							<span class="stress">元</span>
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							{{ seller.deliveryTime}}
							<span class="stress">分钟</span>
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon-favorite" :class="{active:favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">
						{{seller.bulletin}}
					</p>
				</div>
				<ul class="supports" v-if="seller.supports">
					<li class="supports-item border-1px" v-for='item in seller.supports'>
						<span class="icon" :class="classMap[seller.supports[$index].type]" ></span>
						<span class="text">{{seller.supports[$index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">
					商家实景
				</h1>
				<div class="pic-wrapper" v-el:pic-wrapper>
					<ul class="pic-list" v-el:pic-list>
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import BScrool from 'better-scroll';
	import star from 'components/star/star';
	import split from 'components/split/split';
	import {saveToLocal, loadFromLocal} from 'src/common/js/store';

	export default{
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			// return {
			// 	favorite: false
			// };
			return {
				favorite: (() => {
					return loadFromLocal(this.seller.id, 'favorite', false);
				})()
			};
		},
		computed: {
			favoriteText () {
				return this.favorite ? '已收藏' : '收藏';
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		watch: {
			'seller' () {
				this._initScrool();
				this._initPics();
			}
		},
		ready () {
			this._initScrool();
			this._initPics();
		},
		methods: {
			toggleFavorite (event) {
				if (!event._constructed) {
					return;
				}
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			},
			_initScrool () {
				if (!this.scroll) {
					this.scroll = new BScrool(this.$els.seller, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			},
			_initPics () {
				if (this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$els.picList.style.width = width + 'px';
					this.$nextTick(() => {
						this.picScroll = new BScrool(this.$els.picWrapper, {
							scrollX: true,
							eventPassthrough: 'vertical'
						});
					});
				}
			}
		},
		components: {
			star,
			split,
			BScrool
		}
	};
</script>
<style type="text/css">
	.seller {
		position: absolute;
		top:174px;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	.border-1px {
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller-content .overview  {
		padding: 18px;
		position: relative;
	}
	.seller-content .overview .title {
		margin-bottom: 8px;
		line-height: 17px;
		color: rgb(7,17,27);
		font-weight: 700;
	}
	.seller-content .overview .desc {
		padding-bottom: 8px;
		line-height: 18px;
		font-size: 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller-content .overview .desc .star {
		margin-right: 8px;
	}
	.seller-content .overview .desc .text {
		font-size: 12px;
	}
	.ml10{
		margin-left: 10px;
	}
	.seller-content .overview .remark {
		display: flex;
		padding-top: 18px;
	}
	.seller-content .overview .remark .block {
		flex: 1;
		text-align: center;
		border-right: 1px solid rgba(7,17,27,0.1);
	}
	.seller-content .overview .remark .block:last-child {
		border-right: 0;
	}
	.seller-content .overview .remark .block h2 {
		font-size: 10px;
		margin-bottom: 4px;
		line-height: 10px;
		color: rgb(147,153,159);
	}
	.seller-content .overview .remark .block .content{
		line-height: 24px;
		font-size: 16px;
		color: rgb(7,17,27);
	}
	.seller-content .overview .remark .block .content .stress {
		font-size: 12px;
	}
	.seller-content  .bulletin {
		padding: 18px 18px 0 18px;
	}
	.seller-content  .bulletin .title {
		margin-bottom: 8px;
		line-height: 17px;
		color: rgb(7,17,27);
		font-weight: 700;;
	}
	.seller-content  .bulletin .content-wrapper {
		padding: 0 12px 16px 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		line-height: 14px;
		font-size: 12px;
		color: rgb(240,20,20);
	}
	.bulletin .supports {
		padding: 16px 2px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		line-height: 14px;

	}
	.bulletin .supports:last-child {
		border-bottom: none;
	}
	.bulletin .support .icon.decrease{
		background-image: url("decrease_2@2x.png");
	}
	.bulletin .support .icon.discount{
		background-image: url("discount_2@2x.png") ;
	}
	.bulletin .support .icon.guarantee{
		background-image: url("guarantee_2@2x.png");
	}
	.bulletin .support .icon.invoice{
		background-image: url("invoice_2@2x.png");
	}
	.bulletin .support .icon.special{
		background-image: url("special_2@2x.png") ;
	}
	.bulletin .support .icon{
		display: inline-block;
		vertical-align: middle;
		width: 12px;
		height: 12px;
		margin-right: 4px;
		background-size:12px 12px;
		background-repeat: no-repeat; 
	}
	.bulletin .support .text{
		font-size: 10px;
	}

	.bulletin .supports-item .icon.discount{
		background-image: url('discount_2@2x.png');
	}
	.bulletin .supports .supports-item .icon.guarantee{
		background-image: url('guarantee_2@2x.png');
	}
	.bulletin  .supports .supports-item .icon.invoice{
		background-image: url('invoice_2@2x.png');
	}
	.seller-content .info {
		padding: 18px 18px 0 18px;
	}
	.seller-content .info .title {
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.seller-content .info-item{
		padding: 16px 12px;
		line-height: 16px;
		color: rgb(7,17,27);
		font-size: 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.seller-content .pics {
		padding: 18px;
	}
	.seller-content .pics .title{
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.seller-content .pics .pic-wrapper {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;

	}
	.seller-content .pics .pic-wrapper .pic-list{
		font-size: 0;
	}
	.seller-content .pics .pic-wrapper .pic-list .pic-item {
		display: inline-block;
		margin-right: 6px;
		width: 120px;
		height: 90px;
	}
	.seller-content .pics .pic-wrapper .pic-list .pic-item:last-child {
		margin-right: 0;
	}
	.overview  .favorite {
		position: absolute; 
		width: 50px;
		right: 11px; 
		top:18px;
	}
	.overview  .favorite .icon-favorite{
		display: block;
		color: #d4d6d9; 
		margin-bottom: 4px; 
		font-size: 24px;
		line-height: 24px;
	}
	.overview  .favorite .icon-favorite.active {
		color: rgb(240,20,20);
	}
	.overview  .favorite .text {
		line-height: 10px;
		font-size: 10px;
		color: rgb(77,85,93);
	}
</style>