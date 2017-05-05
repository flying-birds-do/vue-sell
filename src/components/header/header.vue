<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>

			</div>
			<div class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin_title"></span>
			<p class="bulletin_text">{{seller.bulletin}}</p>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%" alt="">
		</div>
		<div class="detail" v-show="detailShow" transition="fade">
			<div class="detail-warpper clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-warp">
						<star :size="48" :score="seller.score"></star>
					</div>
				</div>
				<div class="tittle">
					<div class="line"></div>
					<div class="text">优惠信息</div>
					<div class="line"></div>
				</div>
				<ul class="supports" v-if="seller.supports">
					<li class="supports-item" v-for='item in seller.supports'>
						<span class="icon" :class="classMap[seller.supports[$index].type]" ></span>
						<span class="text">{{seller.supports[$index].description}}</span>
					</li>
				</ul>
				<div class="tittle marginT20">
					<div class="line"></div>
					<div class="text">商家公告</div>
					<div class="line"></div>
				</div>
				<div class="bulletin">
					<p class="content">{{seller.bulletin}}</p>
				</div>
			</div>
			<div class="detail-close" @click="hideDetail">
				<i class="icon-close" ></i>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import star from '../star/star.vue';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				detailShow: false
			};
		},
		methods: {
			showDetail () {
				this.detailShow = true;
			},
			hideDetail () {
				this.detailShow = false;
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		components: {
			star
		}

	};
</script>
<style>
	body,html{
		font-weight: 200;
		line-height: 1;
		font-family: 'PingFang SC','STHeitiSC-Light','Helvetica-light',arial;
	}
	.header {
		color: #fff;
		position: relative;
		background-color: rgba(7,17,27,0.5);

	}
	.header	.content-wrapper{
		padding:  24px 12px 18px 24px;
		font-size: 0;
		position: relative;
	}
	.content-wrapper .avatar{
		display: inline-block;
		font-size: 14px;
		vertical-align: top;

	}
	.content-wrapper .avatar img{
		border-radius: 2px;
	}
	.marginT20{
		margin-top: 20px;
	}
	.content-wrapper .content{
		display: inline-block;
		font-size: 14px;
		margin-left: 16px;

	}
	.content .title{
		margin: 2px 0 8px 2px;
	}
	.content .title .brand{
		display: inline-block;
		width: 30px;
		height: 18px;
		background: url('brand@2x.png') no-repeat;
		background-size: 30px 18px;
		vertical-align: top;
	}
	.content .title .name{
		margin-left: 6px;
		font-size: 16px;
		line-height: 18px;
	}
	.content .description{
		margin-bottom: 12px;
		line-height: 12px;
		font-size: 12px;
	}
	
	.content .support .icon.decrease{
		background-image: url("decrease_2@2x.png");
	}
	.content .support .icon.discount{
		background-image: url("discount_2@2x.png") ;
	}
	.content .support .icon.guarantee{
		background-image: url("guarantee_2@2x.png");
	}
	.content .support .icon.invoice{
		background-image: url("invoice_2@2x.png");
	}
	.content .support .icon.special{
		background-image: url("special_2@2x.png") ;
	}
	.support-count {
		position: absolute;
		right: 12px;
		bottom: 18px;
		padding: 0 18px ;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background: rgba(0,0,0,0.2);
		text-align: center;
	}
	.support-count .count{
		font-size: 10px;
		display: inline-block;
	}
	.icon-keyboard_arrow_right{
		font-size: 10px;
		position: absolute;
		right: 4px;
		top: 6px;
	}
	.content .support .icon{
		display: inline-block;
		vertical-align: middle;
		width: 12px;
		height: 12px;
		margin-right: 4px;
		background-size:12px 12px;
		background-repeat: no-repeat; 
	}
	.content .support .text{
		font-size: 10px;
	}
	.bulletin-wrapper{
		height:28px;
		line-height: 28px;
		position: relative;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		text-overflow: ellipsis;
		background: rgba(7,17,27,0.2);
	}
	.bulletin-wrapper .icon-keyboard_arrow_right{
		font-size: 10px;
		position: absolute;
		right: 6px;
		top: 8px;
	}
	.bulletin_title{
		background-image: url('bulletin@2x.png');
		background-repeat: no-repeat;
		background-size: 100%;
		width: 22px;
		height: 12px;
		position: absolute;
		left: 12px;
		top: 8px;
	}

	.bulletin_text{
		font-size:10px;
		overflow: hidden;;
		text-overflow: ellipsis;
		height: 22px;
		padding: 0 4px 0 30px;

	}
	.background{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(10px);
	}
	.content-wrapper .detail{
		position: fixed;
		z-index: 100;
		width: 100%;
		height: 100%;
		overflow: auto;
		top:0;
		left:0;
		transition: all 0.5s;
		backdrop-filter:blur(10px);
		-webkit-backdrop-filter:blur(10px);

	}
	.detail.fade-transition {
		opacity: 1;
		background: rgba(7,17,27,0.8);
		position: absolute;
		z-index: 100;
	}
	.detail.fade-enter , .detail.fade-leave{
		opacity: 0;
		background: rgba(7,17,27,0);
	}
	.detail-warpper{
		min-height: 100%;
		width: 100%;

	}
	.detail-main{
		margin-top:64px;

	}
	.detail-main .name{
		line-height: 16px;
		text-align: center;
		font-size: 16px;
		font-weight: 700;
	}
	.detail-close{
		position: relative;
		width: 32px;
		height: 32px;
		margin: 64px auto 0;
		clear: both;
		font-size: 32px;
	}
	.star-warp{
		text-align: center;
		margin-top: 20px;
		padding-bottom: 40px;
	}
	.detail-warpper .tittle {
		display: flex;
		width: 80%;
		margin:  20px auto 24px auto;
	}
	.detail-warpper .tittle .line{
		flex: 1;
		position: relative;
		top: -6px;
		border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	.detail-warpper .tittle .text{
		padding:  0 12px;
		font-weight: 700;
	}
	.supports {
		width: 80%;
		margin: 0 auto;
	}
	 .supports .supports-item {
		padding:  0 10px;
		margin-bottom: 12px;
		font-size: 0;

	}
	.supports .supports-item:last-child{
		margin-bottom: 0;

	}
	.supports .supports-item .icon{
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		margin-right: 6px;
		background-size: 16px;
		background-repeat: no-repeat;
	}

	.supports .supports-item .icon.decrease{
		background-image: url('decrease_2@2x.png');
	}
	.supports .supports-item .icon.special{
		background-image: url('special_2@2x.png');
	}
	.bulletin {
		margin: 0 auto;
		width: 80%;
	}
	.bulletin .content{
		padding: 0 12px;
		line-height: 20px;
		font-size: 12px;

	}
	.detail .supports .supports-item .icon.discount{
		background-image: url('discount_2@2x.png');
	}
	.supports .supports-item .icon.guarantee{
		background-image: url('guarantee_2@2x.png');
	}
	.supports .supports-item .icon.invoice{
		background-image: url('invoice_2@2x.png');
	}
	.supports .supports-item .text{
		font-size: 12px;
		line-height: 20px;
	}
</style>