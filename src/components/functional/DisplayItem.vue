<template>
    <div class="item-outside">
        <Col span="14">
            <Carousel class="carousel" :autoplay="project.configs.autoplay" :autoplay-speed="project.configs.speed || 3000" loop>
                <CarouselItem v-for="(item, index) in project.media" :key="index + Math.random()">
                    <div class="media-container" v-if="item.type === 'picture'">
                        <img class="carousel-item-img" @click="$emit('openImg', item.url)" :src="item.url"/>
                    </div>
                    <p class="carousel-item-desc">{{item.desc}}</p>
                </CarouselItem>
            </Carousel>
        </Col>
        <Col span="10">
            <Tabs class="tabs">
                <TabPane class="tabPane" label="项目介绍" icon="ios-ionic-outline">
                    <h2 class="state-title"><Icon type="code-working"></Icon>{{project.state.projectName}}</h2>
                    <div class="state-desc" v-html="project.state.desc"></div>
                </TabPane>
                <TabPane class="tabPane" label="团队信息" v-if="project.team" icon="ios-personadd">
                    <h2 class="state-title"><Icon type="code-working"></Icon>团队名</h2>
                    <div class="state-title"><Icon type="code-working"></Icon>xxxxx</div>
                    <div class="state-title"><Icon type="code-working"></Icon>xxxxx</div>
                </TabPane>
                <TabPane class="tabPane" label="附件下载" v-if="project.files" icon="ios-cloud-download-outline">
                    <Row v-for="file in project.files" :key="file.url">
                        <Icon type="document-text"></Icon>
                        <a :href="file.url" :download="file.name" style="margin:5px;">{{file.name}}</a>
                   </Row>
                </TabPane>
            </Tabs>
        </Col>
    </div>
</template>
<style scoped lang="less">
*{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.item-outside{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.carousel{
    height: 300px;
}
.media-container{
    height: 260px;
    width: 100%;
    text-align: center;
}
.carousel-item-img{
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 250px;
    margin-left: auto;
    margin-right: auto;
}
.carousel-item-desc{
    text-align: center;
    color: #657180;
    margin-top:5px;
}
.tabs{
    height: 300px;
    border: 2px solid #2D8CF0;
    padding: 20px;
    border-radius: 5px;
    margin-left:20px;
    .tabPane{
        .state-title{
            color:#464c5b!important;
            font-size: 14px!important;
            margin:10px 0;
        }
        .state-desc{
            color:#464c5b;
            font-size: 13px;
        }
    }
}
</style>
<script>
import { Tabs, TabPane, Carousel, CarouselItem, Spin, Icon } from 'iview'

export default{
  props: {
    project: Object,
  },
  components: {
    Tabs, TabPane, Carousel, CarouselItem, Spin, Icon,
  },

}
</script>
