<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}} <span>{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}} <span>{{positives.length}}</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}} <span>{{negatives.length}}</span></span>
		</div>
		<div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
	// data: {
	// 	return {
	// 		selectType:
	// 	}
	// },
	props: {
		ratings: {
			type: Array,
			default () {
				return [];
			}
		},
		selectType: {
			type: Number,
			default: ALL
		},
		onlyContent: {
			type: Boolean,
			default: false
		},
		desc: {
			type: Object,
			default () {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				};
			}
		}
	},
	computed: {
		positives () {
			return this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE;
			});
		},
		negatives () {
			return this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE;
			});
		}
	},
	methods: {
		select (type, event) {
			if (!event._constructed) {
				return;
			};
			this.selectType = type;
			// 事件派发
			this.$dispatch('ratingtype.select', type);
		},
		toggleContent (event) {
			if (!event._constructed) {
				return;
			};
			this.onlyContent = !this.onlyContent;
			// 事件派发 子组件告诉父组件
			this.$dispatch('content.toggle', this.onlyContent);
		}
	}
};
</script>
<style>
.ratingselect .rating-type   {
	/*padding: 0 0 18px 0;*/
	/*margin: 0 18px;*/
	padding-bottom: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	font-size: 0;
	font-weight: 700;


}
.ratingselect .rating-type  span{
	font-weight: 700;
	margin-right: 10px;
}
.ratingselect .rating-type  span span{
	color: #999;
}
.ratingselect .rating-type  .block{
	display: inline-block;
	padding: 8px 12px;
	border-radius: 2px;
	margin-right: 8px;
	color: rgb(77,85,93);
	font-size: 12px;
}
.ratingselect .rating-type  .block.active{
	color: #fff;
}
.ratingselect .rating-type  .block .count{
	margin-left: 2px;
	font-size: 8px;
	line-height: 16px;
}
.ratingselect .rating-type .block.positive {
	background: rgba(0,160,220,0.2);
}

.ratingselect .rating-type .block.positive.active{
	background: rgb(0,160,220);
}
.ratingselect .rating-type .block.negative {
	background: rgba(77,85,93,0.2);
}
.ratingselect .rating-type .block.negative.active{
background: rgb(77,85,93);
} 
.ratingselect .switch {
	padding: 12px 18px 12px 0;
	line-height: 24px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	color: rgb(147,153,159);
	font-size: 0;
}
.ratingselect .switch.on .icon-check_circle{
	color: #00c850;
}
.ratingselect .switch .icon-check_circle {
	display: inline-block;
	vertical-align: top;
	margin-right: 4px;
	font-size: 24px;

}
.ratingselect .switch .text{
	font-size: 12px;
}
</style>