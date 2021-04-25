<template>
	<div class="zjmd">
		<div class="jinse"> 
			<div class="bg-ttl-p">
				<div class="bg-ttl">{{title}}</div>
			</div>
			<div>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			title:{}
		}
	}
</script>

<style scoped>
	.zjmd{ 
		position:relative;
		margin-top: 25rpx;
		padding-bottom: 50rpx;
	}	
	.jinse{ 
		color:#da7906;  
		border:1px solid #fdd067; 
		border-radius:10px; 
		padding-bottom:20px;
		background-color: #fff;
	}
	.bg-ttl-p{
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: -30rpx;
	}
	.bg-ttl{
		background-image: url(../../../static/imgs/p_ttl_03.png);
		background-size: contain;
		width: 408rpx;
		height: 70rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bold;
	}

</style>
