<template>
	<div class="img-main">
		<div class="uni-share-title"><text class="uni-share-title-text fw800">选择素材</text></div>
		<divheight: calc(100vh - 80px); overflow-y: auto;margin-bottom: 30px;" scroll-y="true" >
			<div class="list-box" style="padding-bottom: 50px;">
				<div 
					v-for="(item,index) in photoList" 
					:key="index" 
					:class="{'active':item.active}"
					:data-index="index"
					@click="selectedPhoto(index,item)"
				>
					<image :src="item.picUrl" mode="aspectFill" lazy-load="true"></image>
					<div>
						<text style="font-size: 12px;">{{item.picName}}</text>
						<div  class="chooseIcon" :class="curr==index?'active':''" style="float: right;"></div>
					</div>
				</div>
			</div>
			<div class="load"></div> 
		</div  class="submit" @tap="chooseIcon">
			<text>选择素材</text>
		</div>
	</div>
</template>

<script>
	import api from '../../common/api/coupon.js'
	export default {
		name: 'ImgSelect',
		data() {
			return {
				curr:0,
				photoList:[],
				rows:10,
				page:1,
				isGet:true,
				loadTxt:"",
				photoUrl:'',
				UniHeight:'',
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			imgType:{
				type: String,
				required: true
			}
		},
		inject: ['popup'],
		created() {
			
		},
		onReachBottom(){
			//this.getPhoto();
		},
		methods: {
			/* 获取照片 */
			initPhoto(){
				// this.photoList=[];
				// this.showImages();
				this.getPhoto();
			},
			getPhoto(){
				if(!this.isGet){
					return;
				}
				this.isGet=false;
				new Promise((success,error)=>{
					/* 第一页弹出加载层 */
					if(this.page==1){
						uni.showLoading({
							title:'加载中',
							mask:true
						})
					}else{
						this.loadTxt="正在加载中";
					}
					
					api.queryActPic(this.imgType).then(data=>{
						uni.hideLoading()
						let[error,res] = data
						let resData = res.data
						
						if(resData.flag === '1'){
							success(resData.data);
						}
						else{
							uni.showModal({
								title: '提示',
								showCancel: false,
								content: '查询素材失败'
							})
						}
					})
					.catch(e=>{
						uni.hideLoading()
						
					})
				}).then((res)=>{
					if(this.page==1){
						uni.hideLoading();
					}
					this.photoList=[];
					this.photoList=[...this.photoList,...res];
					this.showImages();
				})
			},
			/* 显示照片 */
			showImages(){
				let index=(this.page-1)*this.rows;
				let show=()=>{
					if(index<this.photoList.length){
						this.$set(this.photoList[index],"active",true);
						index++;
					}else{
						clearInterval(interval);
						this.loadTxt="没有更新了~";
						this.page++;
						this.isGet=true;
					}
				}
				
				let interval=setInterval(()=>{
					show();
				},100);
			},
			
			/* 预览照片 */
			selectedPhoto(inx,e){
				this.curr = inx;
				this.photoUrl = e.picUrl;
			},
			chooseIcon(){
				this.$emit('chooseImages', {
					type:this.imgType,
					picUrl:this.photoUrl,
				}, () => {
					this.popup.close()
				})
				
			},
			/**
			 * 点击取消按钮
			 */
			close() {
				if (this.beforeClose) {
					this.$emit('close', () => {
						this.popup.close();
						
					})
					return
				}
				this.popup.close()
			}
		}
	}
</script>

<style lang="scss">
	.img-main{
		background-color: #eee; 
		width: 94%;
		margin-left: 3%;
		border-radius: 5px !important;
		height: calc(100vh - 50px);
		
		
	}
	.uni-share-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 40px;
	}
	.uni-share-title-text {
		font-size: 14px;
		color: #666;
	}
	.list-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		align-content: flex-start;
		padding: 20upx 20upx 0 20upx;
		line-height: 30upx;
		font-size: 28upx;
		color: #333;
		&>view {
			background-color: #fff;
			width: 325upx;
			padding: 20upx;
			margin-bottom: 20upx;
			box-sizing: border-box;
			/* opacity: 0; */
			transform:translateY(40upx);
			transition: all 0.3s ease-in-out 0s;
			
			&.active{
				opacity: 1;
				transform:translateY(0);
			}
		}
		
		image{
			width: 100%;
			height: 300upx;
			margin-bottom: 10upx;
		}
	}
	
	.load{
		line-height: 80upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-bottom: 20rpx;
	}
	.submit {
		font-size: 14px;
		text-align: center;
		padding: 0.4rem;
		background-image: -webkit-gradient(linear, left top, right top, from(#fe5329), to(#fb7010));
		background-image: -o-linear-gradient(left, #fe5329, #fb7010);
		background-image: linear-gradient(90deg, #fe5329, #fb7010);
		display: block;
		margin: 0.6rem auto;
		/* width: 90%; */
		color: #fff;
		border-radius: 18px;
		position: fixed;
		bottom: 10px;
		left: 5%;
		right: 5%;
		float: left;
	}
	
	.chooseIcon {
	        width: 24px;
	        height: 24px;
	        display: inline-block;
	        background: url(https://ah.189.cn/sj/cms/images/sjmall/images/noselect2.png)no-repeat;
	        background-size: 100%;
	}
	
	.chooseIcon.active {
		width: 24px;
		height: 24px;
		display: inline-block;
		background: url(https://ah.189.cn/sj/cms/images/sjmall/images/hasSelect1.png)no-repeat;
		background-size: 100%;
	}
	
</style>
