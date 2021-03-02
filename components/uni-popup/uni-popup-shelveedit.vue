<template>
	<div class="uni-popup-shelve" style="font-size: 14px;color: #444;">
		<div class="uni-shelve-content pro_cont" style="padding-top: 20rpx;padding-bottom: 100rpx;">
			<div class="tit_bg01" style="text-align: center;margin-top: 10px;">
				<text style="font-size: 16px;font-weight: 700;">请选择上架位置</text>
			</div>
			<div class="container-vertical">
                <radio-group @change="shiftLabelRadio">
				    <div class="container-horizontal" style="text-align: left;">
					    <label class="radio" v-for="(item, index) in prodLable" :key="item.labelId">
						    <div>
							    <radio :value="item.labelId" :checked="item.checked"/>
							    {{item.labelName}}
						    </div>
					    </label>
				    </div>
                </radio-group>
			</div>
			<div class="tit_bg" style="text-align: center;margin-top: 30rpx;">
				<text style="font-size: 16px;font-weight: 700;">该商品是否在以下位置展现</text>
			</div>
			<div style="margin-left: 40rpx;margin-top: 20rpx;">
				<div v-for="(item, index) in shelvePos" :key="item.value" style="display: inline-block;text-align: left;margin-top: 10px;">
					<div>
						<checkbox :value="item.shelvePosition" :checked="item.checked" :disabled="item.num >= item.limit && !item.checked" @click.stop="shiftPositionCheckbox(index)"/>
						{{item.positionName}}
						<text style="font-size: 12px;color: #9c9c9c;">(还可以添加<text style="color: #F00;">{{diffNaturalNumber(item.limit,item.num)}}</text>款)</text>
					</div>
				</div>
			</div>
			<div style="margin: 15rpx auto;">
				<button type="warn" @click.stop="editShelve()" class="load_btn04 tc fl yahei f16">确认</button>
				<button type="default" @click.stop="closeThisPopup()" class="load_btn01 tc fl yahei f16" style="background-color: #FFFFFF;color: #fe4a1e;">取消</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UniPopupShelveEdit',
		props: {
			shelveId: {
				type: String,
				required: true
			},
			storeId: {
				type: String,
				required: true
			}
		},
		inject: ['popup'],
		data() {
			return {
				prodLable: [{
						labelName: '号卡专区',
						labelId: '1',
						checked: false
					},
					{
						labelName: '智慧家庭',
						labelId: '2',
						checked: false
					},
					{
						labelName: '5G专区',
						labelId: '3',
						checked: false
					},
					{
						labelName: '终端专区',
						labelId: '4',
						checked: false
					}
				],
				shelvePos: [{
					shelvePosition: '1',
					positionName: '微店首页-轮播图',
					limit: 3,
					num: 0,
					checked: false
				},{
					shelvePosition: '2',
					positionName: '微店首页-店长推荐',
					limit: 3,
					num: 0,
					checked: false
				},{
					shelvePosition: '3',
					positionName: '微店首页-热门活动',
					limit: 4,
					num: 0,
					checked: false
				},{
					shelvePosition: '4',
					positionName: '微店首页-主推业务',
					limit: 3,
					num: 0,
					checked: false
				},{
					shelvePosition: '5',
					positionName: '商城首页-轮播图',
					limit: 3,
					num: 0,
					checked: false
				},{
					shelvePosition: '6',
					positionName: '商城首页-精选特惠',
					limit: 3,
					num: 0,
					checked: false
				},{
					shelvePosition: '7',
					positionName: '商城首页-业务推荐',
					limit: 4,
					num: 0,
					checked: false
				}],
				shelveData: {
					type: Object,
					default: function () {
						return {
							shelveLabels: [],
							shelvePositions: [],
							carouselImg: null,
						}
					}
				}
			}
		},
		methods: {
			diffNaturalNumber(x,y){//求差值，返回值不小于0
				console.log('diffNaturalNumber:'+x+'-'+y);
				if(x < y) return 0;
				return x-y;
			},
			closeThisPopup(){
				this.$parent.close();
			},
			isEmpty(s) {
			    return ((s == undefined || s == null || s == "" || s == "undefined") ? true : false);
			},
			/**
			 * 获取店铺各上架位置上的已上架产品数量
			 */
			getShelvedPositionProdNum(){
				uni.request({
				    url: getApp().globalData.URL+'/sj/service/gzwz/queryShelvedNumByStore/'+this.storeId,
					method: "GET",
				    header: {
						'content-type': 'application/json',
						'cookie': uni.getStorageSync("sessionid")
				    },
				    success: (res) => {
						console.log('uni.request-queryShelvedNumByStore-success -> '+JSON.stringify(res.data));
						if('0' == res.data.resultCode){//请求处理成功
							let resultData = res.data.resultData;
							this.shelvePos.forEach((item,index)=>{
								if(!this.isEmpty(resultData[(index+1)])){
									item.num = resultData[(index+1).toString()];
								}
							})
						}else{
							console.log('uni.request-queryShelvedNumByStore-success res.errMsg === '+res.errMsg);
						}
				    },
					fail: (err) => {
						console.error('uni.request-queryShelvedNumByStore-fail -> '+JSON.stringify(err));
				    }
				});
			},
			/**
			 * 查询上架信息
			 */
			getShelveInfo(){
				uni.request({
					url: getApp().globalData.URL+'/sj/service/gzwz/qryShelve',
					method: "POST",
					header: {
						'content-type': 'application/json',
						'cookie': uni.getStorageSync("sessionid")
					},
					data: JSON.stringify({
						shelveId: this.shelveId
					}),
					success: (res) => {
						console.log('uni.request-qryShelve-success -> '+JSON.stringify(res.data));
						uni.hideLoading();
						if('0' == res.data.resultCode){//操作成功
							let shelve = res.data.resultData.shelves[0];
							let shelveLabel = shelve.shelveLabel.split(',');
							this.prodLable.forEach((item,index)=>{
								item.checked = shelveLabel.indexOf(item.labelId) > -1;
							})
							let shelvePosition = shelve.shelvePosition.split(',');
							this.shelvePos.forEach((item,index)=>{
								item.checked = shelvePosition.indexOf(item.shelvePosition) > -1;
							})
						}else{//失败
							uni.showToast({
								icon: 'none',
								title: '查询产品上架信息失败！'
							});
						}
					},
					fail: (err) => {
						console.error('uni.request-qryShelve-fail -> '+JSON.stringify(err));
						uni.hideLoading();
					}
				});
			},
			/**
			 * 切换radio的选择状态
			 */
			shiftLabelRadio(e) {
				this.prodLable.forEach((item,index)=>{
					item.checked = item.labelId === e.detail.value;
				})
			},
			/**
			 * 切换checkbox的选择状态
			 */
			shiftPositionCheckbox(index) {
				let checkStatus = this.shelvePos[index].checked;
				this.shelvePos[index].checked = !checkStatus;
				if(checkStatus){
					this.shelvePos[index].num--;
				}else{
					this.shelvePos[index].num++;
				}
			},
			/**
			 * 产品上架信息编辑
			 */
			editShelve() {
				let $this = this;
				let checkedProdLabel = [];
				this.prodLable.forEach((item,index)=>{
					if(item.checked){
						checkedProdLabel.push(item.labelId);
					}
				})
				if(checkedProdLabel.length !== 1){
					uni.showToast({
						icon: 'none',
						title: '请选择一个上架位置！',
						duration: 1000
					});
					return;
				}
				let checkedShelvePos = [];
				console.log('this.shelvePos: '+JSON.stringify(this.shelvePos));
				this.shelvePos.forEach((item,index)=>{
					if(item.checked){
						checkedShelvePos.push(item.shelvePosition);
					}
				})
				if(checkedProdLabel.length > 0){
					this.shelveData.shelveLabels = checkedProdLabel.join(',');
				}
				if(checkedShelvePos.length > 0){
					this.shelveData.shelvePositions = checkedShelvePos.join(',');
				}
				// else{
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请选择至少一个展现位置！'
				// 	});
				// 	return;
				// }
				console.log('editShelve() - this.shelveData: '+this.shelveData);
				this.$emit('eidtShelve', {...this.shelveData, shelveId:this.shelveId}, ()=>{
					this.popup.close();
					this.prodLable.forEach((item,index)=>{
						item.checked = false;
					})
					this.shelvePos.forEach((item,index)=>{
						item.checked = false;
					})
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.pro_file_wrap {
	    background: url(https://ah.189.cn/sj/cms/images/sjmall/images/file02.png) no-repeat right center;
	    background-size: 50%;
	    width: 70%;
	    height: 32px;
	    border: 1px solid #ccc;
	}

	.container-vertical {
		display: flex;flex: 1;flex-direction: column;width: 100%;
	}

	.container-horizontal {
		display: inline-flex;flex: 1;flex-direction: row;flex-wrap: wrap;justify-content: flex-start;
	}
	.container-horizontal label {
		flex: 0 0 45%;
		margin-top: 10rpx;
		padding-left: 5%;
	}

	.container-text-plain {
		display: table;
		text-align: center;
	}
	text.text-plain {

		display: table-cell;
		vertical-align: middle;
	}

	.uni-popup-shelve {
		top: 50%;
		margin-top: -1112rpx;
		left: 50%;
		margin-left: 20px;
		z-index: 9999;
		width: 90%;
		border-radius: 16rpx;
		background: #fff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlsAAAFhCAYAAABHzG8nAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkZGNDhFRjVBOTU1MTFFQTk2RjBFOEE4RUU1QzlDMjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkZGNDhFRjRBOTU1MTFFQTk2RjBFOEE4RUU1QzlDMjkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTBDM0ExNjc4ODUxMTFFQUFGM0Y4RTMzMTVBODg4NjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTBDM0ExNjg4ODUxMTFFQUFGM0Y4RTMzMTVBODg4NjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6OYkutAABryklEQVR42uy9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') no-repeat top center;
		background-size: 100%;
		padding-bottom: 40rpx;
		padding-top: 10px;
	}
	.uni-shelve-content {
		background: #FFF;
		margin: 70rpx auto 0 auto;
		width: 90%;
	}

	.uni-shelve-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		width: 720rpx;
	}

	.uni-shelve-content-item {
		width: 180rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding: 20rpx 0;
		align-items: center;
	}

	.uni-shelve-content-item:active {
		background-color: #f5f5f5;
	}

	.uni-shelve-image {
		width: 60rpx;
		height: 60rpx;
	}

	.uni-shelve-text {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #3B4144;
	}

	.uni-shelve-button-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 20rpx 30rpx;
	}

	.uni-shelve-button {
		flex: 1;
		border-radius: 100rpx;
		color: #666;
		font-size: 16px;
	}

	.uni-shelve-button::after {
		border-radius: 100rpx;
	}
</style>
