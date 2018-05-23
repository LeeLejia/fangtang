<template>
    <div class="container">
        <Carousel class="carousel" autoplay v-model="value2" loop>
        <CarouselItem>
            <img style="height:300px;width:100%;" src="https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/portal/css/img/5f1205cd1b5f25ca0f2df915cd6d798a.jpg">
        </CarouselItem>
        <CarouselItem>
            <img style="height:300px;width:100%;" src="https://main.qcloudimg.com/raw/ed2c2e9e0c299d9fa743df89b64198c0.png">
        </CarouselItem>
        <CarouselItem>
            <img style="height:300px;width:100%;" src="https://main.qcloudimg.com/raw/15dac1963ba94564b1fce8968e51e06e.png">
        </CarouselItem>
    </Carousel>
    <div class="app-list">

    </div>
   </div>
</template>
<style scoped lang="less">
    .container{
        width:100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
         .carousel{
        width:100%;
    }
        .app-list{

        }
    }
</style>
<script>
import { CarouselItem, Carousel } from 'iview'

export default {
  components: { CarouselItem, Carousel },
}
</script>
