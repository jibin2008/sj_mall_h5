<template>
    <uni-popup ref="posterPop" @change='change'>
		<div class="poster-main" style="width:651rpx;'">
			<canvas canvas-id="poster"  class="poster_canvas"></canvas>
			<image :src="posterUrl" style="font-family:SourceHanSansCN-Regular;width: 651rpx;height: 1031rpx;"></image>
			<image @click="close" src="https://ah.189.cn/sj/cms/poster/images/22.png" 
				style="width: 93rpx;height:78rpx;position: absolute;top: 0px;right: 0px;"></image>
			<div style="display: flex;justify-content:center;margin-top: 15rpx;">
				<div style="width: 110rpx;display: flex;flex-direction: column;justify-content:center;">
					<button open-type="share" style="padding: 0rpx;width: 110rpx;height: 110rpx;outline: none;background-color:rgba(0, 0, 0, 0);">
						<image 
							style="width: 110rpx;height: 110rpx;"
							src="https://ah.189.cn/sj/cms/poster/images/wx.png"
							@click="share"
						></image>
					</button>
					<text style="color:#FFFFFF;font-size: 22rpx;">分享给好友</text>
				</div>
				<div style="margin-left: 53rpx;width: 110rpx;display: flex;flex-direction: column;justify-content:center;">
					<image style="width: 110rpx;height: 110rpx;" 
						src="https://ah.189.cn/sj/cms/poster/images/xc.png"
						@click="savePoster"></image>
					<text style="color:#FFFFFF;font-size: 22rpx;">保存到相册</text>
				</div>
			</div>
		</div>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {mapState} from 'vuex'
	import {getStoreInfo} from '../../pages/store/api.js'
	
	const POSTER_SCALE=0.7
	const POSTER_IMG_WIDTH=651
	const POSTER_IMG_HEIGHT=1031
	const POSTER_GOOGS_IMG_HEIGHT=593
	const POSTER_GOOGS_INFO_BACKGROUND_HEIGHT=224
	const POSTER_USER_INFO_BACKGROUND_HEIGHT=202
	const POSTER_ROW_START=28
	
	export default {
		components:{uniPopup},
		props:{
			goodsImageUrl:{},
			goodsName:{},
			goodsPrice:{},
			goodsSalePrice:{},
			goodDescription:{},
			goodDescription1:{},
			qrCodePage:{},
			qrCodePageOption:{},
			shareTitle:{},
			drawQrCodeAbled:{///是否绘制二维码
				type:Boolean,
				default:true
			},
			storeId:{}
		},
		data(){
			return {
				posterUrl:"",
				posterId:'poster',
				loggedStore:{}
			}
		},
		methods:{
			createPoster(){
				uni.showLoading({
					title: '海报生成中'
				});
				
				const ctx = uni.createCanvasContext(this.posterId,this);
				this.loadStoreInfo().then(()=>{
					this.drawGoodsimage(ctx).then(ctx=>{
						/// 绘制商品图片
						return Promise.resolve(ctx)
					}).then(ctx=>{
						///绘制商品信息背景
						return this.drawGoodsInfoBackground(ctx)
					}).then(ctx=>{
						///绘制店铺信息背景
						return this.drawUserInfoBackground(ctx)
					}).then(ctx=>{
						///绘制商品名称
						return this.drawGoodsName(ctx)
					}).then(ctx=>{
						///绘制商品描述
						return this.drawGoodsDiscription(ctx)
					}).then(ctx=>{
						///绘制商品描述1
						return this.drawGoodsDiscription1(ctx)
					}).then(ctx=>{
						///绘制商品售价
						return this.drawGoodsSalePrice(ctx)
					}).then(ctx=>{
						///绘制商品二维码
						return this.drawGoodsQrCode(ctx)
					}).then(ctx=>{
						///绘制“长按识别”
						return this.drawQrCodeText(ctx)
					}).then(ctx=>{
						///绘制“受理人”三个字背景
						return this.drawUserLabelBackgroundImage(ctx)
					}).then(ctx=>{
						///绘制“受理人”三个字背景
						return this.drawUserLabel(ctx)
					}).then(ctx=>{
						///绘制店面LOGO
						return this.drawStoreImage(ctx)
					}).then(ctx=>{
						///绘制店面LOGO
						return this.drawStoreName(ctx)
					}).then(ctx=>{
						///绘制店面号码
						return this.drawStorePhone(ctx)
					}).then(ctx=>{
						///绘制店面地址
						return this.drawStoreAdress(ctx)
					}).then(ctx=>{
						// canvas画布转成图片并返回图片地址
						ctx.draw(true, () => {
							uni.canvasToTempFilePath({
								canvasId: this.posterId,
								width: POSTER_IMG_WIDTH,
								height: POSTER_IMG_HEIGHT,
								success: (res) => {
									this.posterUrl = res.tempFilePath;
									this.$emit('input',res.tempFilePath)
									uni.hideLoading();
								},
								fail: (error) => {
									console.log(error)
									uni.hideLoading();
									uni.showToast({
										title: '海报制作失败',
										icon: 'none'
									});
								}
							},this)
						})
					})
				})
				
			},
			downloadImage(url){
				return new Promise((resolve, reject)=>{
					uni.downloadFile({
						url:url,
						success(res){
							resolve(res)
						},
						fail(error){
							reject(error)
						}
					})
				})
			},
			drawImage(ctx,url,x,y,width,height){
				return this.downloadImage(url).then(res=>{
					ctx.drawImage(res.tempFilePath,x,y,width,height)
					return Promise.resolve(ctx)
				})
			},
			drawGoodsimage(ctx){
				return this.drawImage(ctx,this.goodsImageUrl,0,0,POSTER_IMG_WIDTH,POSTER_GOOGS_IMG_HEIGHT)
			},
			drawGoodsQrCode(ctx){
				return this.drawQrCodeAbled?
					this.drawImage(ctx,this.qrCodeUrl,500,POSTER_GOOGS_IMG_HEIGHT+28,120,120):
					Promise.resolve(ctx)
			},
			drawQrCodeText(ctx){
				/// 绘制二维码下方“长按识别”
				
				return this.drawQrCodeAbled?this.drawText(ctx
					,'长按识别'
					,521
					,POSTER_GOOGS_IMG_HEIGHT+185
					,20
					,'gray'
				):Promise.resolve(ctx)
			},
			drawGoodsName(ctx){
				/// 绘画商品名称
				
				return this.drawText(ctx
					,this.goodsName
					,POSTER_ROW_START
					,POSTER_GOOGS_IMG_HEIGHT+52
					,24
					,'black'
				)
			},
			drawGoodsDiscription(ctx){
				/// 绘画商品描述
				return this.drawText(ctx
					,this.getHtmlText(this.goodDescription)
					,POSTER_ROW_START
					,POSTER_GOOGS_IMG_HEIGHT+90
					,24
					,'gray'
				)
			},
			drawGoodsDiscription1(ctx){
				/// 绘画商品描述1
				
				return this.drawText(ctx
					,this.getHtmlText(this.goodDescription1)
					,POSTER_ROW_START
					,POSTER_GOOGS_IMG_HEIGHT+122
					,24
					,'gray'
				)
			},
			drawGoodsPrice(ctx){
				
				return this.drawText(ctx)
			},
			drawGoodsSalePrice(ctx){
				/// 绘制商品售价
				
				return this.drawText(ctx
					,this.goodsSalePrice
					,POSTER_ROW_START
					,POSTER_GOOGS_IMG_HEIGHT+176
					,32
					,'red'
				)
			},
			drawText(ctx,text,x,y,fontSize,color){
				ctx.fontFamily='SourceHanSansCN-Regular'
				ctx.setFillStyle(color)
				ctx.setFontSize(fontSize)
				ctx.fillText(text,x,y,425)
				return Promise.resolve(ctx)
			},
			drawStoreImage(ctx){
				/// 绘画店面图像
				let rowHeight=POSTER_GOOGS_IMG_HEIGHT+POSTER_GOOGS_INFO_BACKGROUND_HEIGHT+28-2
				return this.drawImage(ctx,this.loggedStore.storeLogo
					,POSTER_ROW_START,rowHeight
					,70,70
				).then(ctx=>{
					/// 店面头像四周圆角填充为背景色，实现圆形图像
					ctx.moveTo(POSTER_ROW_START+35, rowHeight)
					ctx.lineTo(POSTER_ROW_START, rowHeight)
					ctx.lineTo(POSTER_ROW_START, rowHeight+70)
					ctx.lineTo(POSTER_ROW_START+35, rowHeight+70)
					ctx.arcTo(POSTER_ROW_START, rowHeight+70
						, POSTER_ROW_START, rowHeight+35
						,35
					)
					ctx.arcTo(POSTER_ROW_START, rowHeight
						, POSTER_ROW_START+35, rowHeight
						,35
					)
					ctx.lineTo(POSTER_ROW_START+70, rowHeight)
					ctx.lineTo(POSTER_ROW_START+70, rowHeight+70)
					ctx.lineTo(POSTER_ROW_START+35, rowHeight+70)
					ctx.arcTo(POSTER_ROW_START+70, rowHeight+70
						, POSTER_ROW_START+70, rowHeight+35
						,35
					)
					ctx.arcTo(POSTER_ROW_START+70, rowHeight
						, POSTER_ROW_START+35, rowHeight
						,35
					)
					ctx.setFillStyle('#ececec')
					ctx.fill()
					return Promise.resolve(ctx)
				})
			},
			drawStoreName(ctx){
				return this.drawText(ctx
					,this.loggedStore.storeName
					,120,POSTER_GOOGS_IMG_HEIGHT+POSTER_GOOGS_INFO_BACKGROUND_HEIGHT+70
					,24,'#111111'
				)
			},
			drawStorePhone(ctx){
				return this.drawText(ctx
					,'电话：'+this.loggedStore.storePhone
					,POSTER_ROW_START,POSTER_GOOGS_IMG_HEIGHT+POSTER_GOOGS_INFO_BACKGROUND_HEIGHT+134
					,24,'#000000'
				)
			},
			drawStoreAdress(ctx){
				return this.drawText(ctx
					,'地址：'+this.loggedStore.storeAddress
					,POSTER_ROW_START,POSTER_GOOGS_IMG_HEIGHT+POSTER_GOOGS_INFO_BACKGROUND_HEIGHT+167
					,24,'#333333'
				)
			},
			drawGoodsInfoBackground(ctx){
				ctx.setFillStyle('#FFFFFF')
				ctx.fillRect(0,POSTER_GOOGS_IMG_HEIGHT-1,POSTER_IMG_HEIGHT,POSTER_GOOGS_INFO_BACKGROUND_HEIGHT)
				return Promise.resolve(ctx)
			},
			drawUserInfoBackground(ctx){
				ctx.setFillStyle('#ececec')
				ctx.fillRect(0,POSTER_GOOGS_IMG_HEIGHT+POSTER_GOOGS_INFO_BACKGROUND_HEIGHT-2,//-2为了填补像素断层
					POSTER_IMG_HEIGHT,POSTER_GOOGS_INFO_BACKGROUND_HEIGHT)
				return Promise.resolve(ctx)
			},
			drawUserLabelBackgroundImage(ctx){
				return this.drawImage(ctx
					,'https://ah.189.cn/sj/cms/poster/images/slr-bg.png'
					,535,POSTER_GOOGS_IMG_HEIGHT+POSTER_GOOGS_INFO_BACKGROUND_HEIGHT-2//-2为了填补像素断层
					,116,49
				)
			},
			drawUserLabel(ctx){
				return this.drawText(ctx
					,'服务经理'
					,546,POSTER_GOOGS_IMG_HEIGHT+POSTER_GOOGS_INFO_BACKGROUND_HEIGHT+28//-2为了填补像素断层
					,24,'white'
				)
			},
			open(){
				this.$refs.posterPop.open()
				this.$nextTick(()=>{
					this.createPoster()
				})
			},
			close(){
				uni.hideLoading();
				this.$refs.posterPop.close()
			},
			getHtmlText(html){
				return html?html.replace(/<[^>]+>/g,"").trim():''
			},
			obj2htmlparam(obj){
				let p=''
				for(let key in obj){
					p+=p===''?`${key}=${obj[key]}`:`&${key}=${obj[key]}`
				}
				return encodeURIComponent(p)
			},
			savePoster(){
				uni.saveImageToPhotosAlbum({
					filePath:this.posterUrl,
					success(){
						wx.showToast({
							title: '保存成功',
							icon: "success",
							duration: 1000
						})
					},
					fail(err){
						wx.showToast({
							title: '保存失败'+err,
							icon: "success",
							duration: 1000
						})
					}
				})
			},
			share(){
				wx.showShareMenu({
					menus: ['shareAppMessage', 'shareTimeline']
				})
			},
			change(e){
				if(!e.show) this.$emit('input',null)
			},
			loadStoreInfo(){
				return getStoreInfo(this.storeId).then(resp=>{
					this.loggedStore=resp.data.resultData.store
					return Promise.resolve()
				})
			}
		},
		computed:{
			qrCodeUrl(){
				return 'https://ah.189.cn/gzwz/service/sj/service/gzwz/getWxQrCodeByParameter'
					+`?pageUrl=${this.qrCodePage}&&parameter=${this.obj2htmlparam(this.qrCodePageOption)}`
			}
		},
		onLoad(){
			wx.loadFontFace({
				family: 'SourceHanSansCN-Regular', //设置一个font-family使用的名字
				source: 'url("https://ah.189.cn/sj/cms/poster/font/SourceHanSansCN-Regular.otf")', //字体资源的地址
				success(){
					console.log("font SourceHanSansCN-Regular load success!")
				},
				fail(err){
					console.log("font SourceHanSansCN-Regular load fail!")
					console.log(err)
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.poster_canvas {
		width: 651px;
		height: 1031px;
		position: fixed;
		top: -10000rpx;
		left: 0px;
	}
	
	.poster-main{
		
	}
</style>
