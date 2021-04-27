<template>
		<view>
			<view class="row">
				<view v-if="showLabel" class="label">{{label}}:</view>
				<view class="input">
					<slot>
						<input @focus="inputClick" class="input-v" :type="inputType" :placeholder="placeholder" v-model="inputValue"/>
					</slot>
				</view>
			</view>
		</view>
</template>

<script>
	export default{
		props:{
			value:{},
			inputType:{
				default:"text"
			},
			label:{},
			placeholder:{},
			showLabel:{
				default:true
			}
		},
		data(){
			return {
				inputValue:""
			}
		},
		methods:{
			inputClick(){
				this.$emit('vFocus')
			}
		},
		watch:{
			value(v){
				this.inputValue=v
			},
			inputValue(v){
				this.$emit("input",v)
			}
		},
		created() {
			this.inputValue=this.value
		}
	}
</script>

<style scoped>
	.row{
		height: 85rpx;
		padding: 0rpx 25rpx;
		font-size: 30rpx !important;
		line-height: 85rpx !important;
		background: #FFFFFF;
		display: flex;
	}
	.label{
		width: 170rpx;
		height: 100%;
		font-weight: bold;
		text-align: right;
	}
	.input{
		width: 515rpx;
		height: 100%;
		padding-left: 30rpx;
	}
	.input-v{
		height: 100%;
		border-style: none;
	}
</style>
