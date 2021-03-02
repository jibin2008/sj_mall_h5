<template>
	<popup-bottom :show="show" @close="closeSkuBox">
		<div class="sku-box">
			<div class="popover-title" @click="closeSkuBox">
				<i class="pop-close-icon"></i>
			</div>
				<div class="sku-header container">
					<image class="goods-img" :src="selectSkuInfo[cbImage]" mode="widthFix"></image>
					
					
					<div class="sku-goods-info">
						<text style="font-size: 36rpx; color:#000">{{goodsMediaName}}</text>
						<div class="money" :style="{color:themeColor}">
							<text class="symbol fs-26">￥</text>
							<text class="amount fs-38">{{selectSkuInfo[cbPrice] | toFixed2}}</text>
						</div>
						<!-- <div class="stock fs-24">
							库存 {{selectSkuInfo[cbStock]}}件
						</div>
						<div class="fs-24">
							已选："{{selectSkuInfo[cbValue]}}"
						</div> -->
					</div>
				</div>
				<div class="sku-item container" v-for="(sku,sIndex) in mySpecifications" :key="sku[speId]">
					<div class="sku-name">{{sku[speName]}}</div>
					<div class="sku-content">
						<text 
							class="sku-content-item"
							v-for="(item,index) in sku[speList]"
							:key="index" 
							:style="{
								border: index===sku.sidx?`${borderWidth}px solid ${themeColor}`:`${borderWidth}px solid transparent`,
								color:index===sku.sidx?themeColor:'#333',
								backgroundColor: index===sku.sidx?'white':'#f5f5f5' }" 
							@click="selectSku(sIndex,index)"
						>{{item}}</text>
					</div>
				</div>
				<!-- <div class="sku-item container count">
					<div class="sku-name">数量</div>
					<div class="count-box">
						<text class="minus" :class="{disabled:buyCount<=1}" @click="handleBuyCount('minus')">-</text>
						<input class="count-content" v-model="buyCount" :disabled="selectSkuInfo[cbStock]<=0"/>
						<text class="add" :class="{disabled:buyCount>=selectSkuInfo[cbStock]}" @click="handleBuyCount('add')">+</text>
					</div>
				</div> -->
				
				<div v-if="selectedIndex>-1" class="confirm-btn container" :class="{disabled:selectSkuInfo[cbStock]==0}" :style="{backgroundColor:themeColor}" @click="handleConfirm">{{selectSkuInfo[cbStock]>0?'保存':'缺货中'}}</div>
				<div v-else class="confirm-btn container" style="background-color: #ff8a8c;">不参加团购</div>
			</div>
	</popup-bottom>
</template>

<script>
	import PopupBottom from './popup-bottom'
	export default {
		components:{
			PopupBottom
		},
		filters: {
			toFixed2: function (value) {
			  if(!value) return '0.00'
			  return Number(value).toFixed(2)
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			themeColor: {
				type: String,
				default: '#1ac792'
			},
			combinations: {
				type: Array,
				default(){
					return []
				}
			},
			specifications: {
				type: Array,
				default(){
					return []
				}
			},
			defaultSelectIndex: {
				type: Number,
				default: 0
			},
			combinationsProps: {
				type: Object,
				default(){
					return {
						id: 'id',
						value: 'value',
						image: 'image',
						price: 'price',
						stock: 'stock'
					}
				}
			},
			specificationsProps: {
				type: Object,
				default(){
					return {
						id: 'id',
						list: 'list',
						name: 'name'
					}
				}
			},
			goodsMediaName: {
				type: String,
				default(){
					return ''
				}
			}
		},
		data() {
			return {
				buyCount: 1,
				selectedIndex: 0,
				borderWidth: uni.upx2px(2),
				mySpecifications: [],
				selectSkuInfo: {},
			}
		},
		watch:{
			specifications(val){
				this.initSkuData()
			}
		},
		computed: {
			speId() {
				return this.specificationsProps.id
			},
			speList() {
				return this.specificationsProps.list
			},
			speName() {
				return this.specificationsProps.name
			},
			cbValue() {
				return this.combinationsProps.value
			},
			cbImage() {
				return this.combinationsProps.image
			},
			cbPrice() {
				return this.combinationsProps.price
			},
			cbStock() {
				return this.combinationsProps.stock
			}
		},
		created() {
			if(this.specifications.length) {
				this.initSkuData()
			}
		},
		methods: {
			initSkuData() {
				this.selectedIndex = this.defaultSelectIndex
				this.selectSkuInfo = this.combinations[this.selectedIndex]
				this.mySpecifications = JSON.parse(JSON.stringify(this.specifications))
				this.mySpecifications.forEach((item,idx) => {
					//当前规格组合值
					const selects = this.combinations[this.selectedIndex][this.cbValue].split(',')
					//每类规格对应其列表的下标 并记录在属性sidx在mySpecifications的子对象中
					const sIndex = item[this.speList].indexOf(selects[idx])
					this.$set(item,'sidx',sIndex>-1?sIndex:0)
				})
			},
			selectSku(sIndex,index) {
				this.mySpecifications[sIndex].sidx = index
				const selectInfo = this.mySpecifications.reduce((prev,cur) => {
					if(prev) {
						return prev+','+cur[this.speList][cur.sidx]
					}else {
						return cur[this.speList][cur.sidx]
					}
				},'')
				
				this.selectedIndex = this.combinations.findIndex(item => item[this.cbValue] === selectInfo)
				if(this.selectedIndex>-1){
					this.selectSkuInfo = this.combinations[this.selectedIndex]
					if(this.selectSkuInfo[this.cbStock] === 0) {
						this.buyCount = 0
					}
					if(this.selectSkuInfo[this.cbStock] !== 0 && this.buyCount*1 === 0) {
						this.buyCount = 1
					}
				}
				
			},
			handleBuyCount(type) {
				if(type === 'minus') {
					if(this.buyCount <= 1) return
					this.buyCount = this.buyCount*1 - 1
				}
				if(type === 'add') {
					if(this.buyCount >= this.selectSkuInfo[this.cbStock]) return
					this.buyCount = this.buyCount*1 + 1
				}
			},
			closeSkuBox() {
				this.$emit('close')
			},
			handleConfirm() {
				const result = this.selectSkuInfo
				result.count = this.buyCount*1
				this.$emit('confirm', result)
			}
		}
	}
</script>

<style>
	page {
		font-size: 28upx;
		color: #333333;
	}
</style>
<style lang="scss" scoped>

	@mixin flex-center {
		display: flex;
		align-items: center;
	}

	@mixin flex-center-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	$font-color-light: #999999;
	$page-bg-color-grey: #f5f5f5;

	.mt10{margin-top:10px}
	.ml15{margin-left:15px}
	.fs-24 {
		font-size: 24upx;
	}

	.fs-26 {
		font-size: 26upx;
	}

	.fs-38 {
		font-size: 38upx;
	}

	.container {
		width: 690upx;
		margin: 0 auto;
	}
	.pop-close-icon {
		position: absolute;
		top: 50%;
		right: 0;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
		width: 36rpx;
		height: 36rpx;
		margin-top: 35rpx;
		margin-right: 26rpx;
		background: url(https://ah.189.cn/sj/cms/images/sjmall/images/pop_close.png) no-repeat center;
		background-size: 100% 100%;
	}
	.popover-title {
	    height: 30rpx;
	    line-height: 30rpx;
	    text-align: center;
	    font-size: 14px;
	    position: relative;
	    color: #F24D2F;
	}
	.sku-box {
		min-height: 250upx;
		background-color: white;
		padding-bottom: 20upx;
		border-radius: 35rpx;
		.sku-header {
			display: flex;
			padding: 65upx 0 20upx;
			.goods-img {
				width: 160rpx;
				border-radius: 6upx;
				border: 4upx solid white;
				flex: none;
				margin-top: -40upx;
			}
		}
		.sku-goods-info {
			margin-left: 20upx;
			.money {
				border: none;
				padding-bottom: 0;
			}
			.stock {
				color: $font-color-light;
			}
		}
		.sku-item {
			padding: 10upx 0;
			.sku-name {
				font-size: 30upx;
			}
			.sku-content {
				border-bottom: 2upx solid $page-bg-color-grey;
				padding: 20upx 0;
				@include flex-center;
				flex-wrap: wrap;
				.sku-content-item {
					text-align: center;
					width: 22%;
					padding: 16upx 20upx;
					border-radius: 30upx;
					margin: 0 30upx 20upx 0;
					
				}
			}
			&.count {
				@include  flex-center;
				justify-content: space-between;
				.count-box {
					@include flex-center;
					text,.count-content {
						@include flex-center-center;
						width: 60upx;
						height: 60upx;
						font-size: 32upx;
						border: 2upx solid $page-bg-color-grey;
					}
					.add,.minus {
						font-size: 44upx;
					}
					.count-content {
						border-width: 2upx 0;
						text-align: center;
					}
				}
			}
		}
		.confirm-btn {
			@include flex-center-center;
			height: 80upx;
			border-radius: 80upx;
			color: white;
			font-size: 32upx;
			margin-top: 10upx;
		}
	}

	[class*=disabled] {
		color: $font-color-light;
		opacity: .7;
	}
</style>
