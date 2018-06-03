<template>
    <div class="container">
        <Carousel class="carousel" autoplay loop>
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
        <!--发卡系统-->
        <div class="server-item">
            <div class="server-item-title sky-blue">
                <img class="server-item-icon" src="../../src/assets/icons/fk.svg">
                <p class="server-item-name">自助服务</p>
            </div>
            <div class="server-item-contain">
                <VendingMachine></VendingMachine>
            </div>
        </div>
        <!--证件照风格转化-->
        <div class="server-item" onclick="alert('功能开发中')">
            <div class="server-item-title deep-blue">
                <img class="server-item-icon" src="../../src/assets/icons/avatar_default.png">
                <p class="server-item-name">证件照风格转化</p>
            </div>
        </div>
        <!--资料-->
        <div class="server-item">
            <div class="server-item-title green">
                <img class="server-item-icon" src="../../src/assets/icons/data.svg">
                <p class="server-item-name">数据资料搜索</p>
            </div>
        </div>
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
            max-width:1800px;
            padding:100px auto;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .server-item{
            text-align: center;
            color: #fff;
            border: 1px solid #e5e5e5;
            width:500px;
            height:380px;
            margin:30px 35px;
            border-radius: 4px 4px 0 0;
            .deep-blue{
                background: #727fc3;
            }
            .green{
                background: #60b58e;
            }
            .blue{
                background: #78aaf1;
            }
            .sky-blue{
                background: #56BBF2;
            }
            .server-item-title{
                display: flex;
                flex-direction:row;
                align-items: center;
                border-radius: 4px 4px 0 0;
                padding: 25px 30px;
                height:100px;
                .server-item-icon{
                    width:60px;
                    height:60px;
                    margin-right:50px;
                }
                .server-item-name{
                    font-size:22px;
                    text-align: center;
                }
            }
            .server-item-contain{
                height:280px;
                padding:25px 30px;
                overflow-y: auto;
            }
        }
    }
    ::-webkit-scrollbar{
        width:0;
    }
</style>
<script>
import VendingMachine from '@/components/functional/VendingMachine'
import { CarouselItem, Carousel} from 'iview'
export default {
  components: {
    CarouselItem, Carousel,VendingMachine
  }
}
</script>
