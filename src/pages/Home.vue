<template>
    <div class="container">
        <Scroll class="scroll" :on-reach-bottom="handleReachBottom" :height="height">
            <!--items-->
            <Card class="item" v-for="(project, index) in projects" :key="index + Math.random()">
                <Row>
                <Col span="12">
                    <Carousel class="carousel" autoplay loop>
                        <CarouselItem v-for="(item, index) in project.media" :key="index + Math.random()">
                            <div class="media-container" v-if="item.type === 'picture'">
                                <img class="carousel-item-img" @click="$emit('openImg', item.url)" :src="item.url"/>
                            </div>
                            <p class="carousel-item-desc">{{item.desc}}</p>
                        </CarouselItem>
                    </Carousel>
                </Col>
                <Col span="12">
                    <Tabs class="tabs">
                        <TabPane label="项目介绍" icon="ios-ionic-outline">这是项目介绍的内容</TabPane>
                        <TabPane label="团队信息" icon="ios-personadd">标签二的内容</TabPane>
                        <TabPane label="附件下载" icon="ios-cloud-download-outline">这里有全部下载链接</TabPane>
                    </Tabs>
                </Col>
                </Row>
            </Card>
        </Scroll>
    </div>
</template>
<style scoped lang="less">
    .container{
        width: 80%;
        height:100vh;
        margin-left:auto;
        margin-right:auto;
    }
    .item{
        margin-bottom:5px;
    }
    .scroll{
        height:100vh;
        ::-webkit-scrollbar{
            width:0;
        }
    }
    .title{
        margin-top:20px;
        margin-bottom:20px;
        text-align: center;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }

    /*component*/
    .carousel{
        height: 300px;
    }
    .media-container{
        height: 260px;
        width: 100%;
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
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        color: #657180;
        margin-top:5px;
    }
    .tabs{
        margin-left:20px;
    }
</style>
<script scoped>
import { Scroll, Tabs, TabPane, Carousel, CarouselItem, Card } from 'iview'

export default{
  data() {
    return {
      height: document.body.clientHeight - 150,
      projects: [
        {
          media: [
            { url: 'https://www.cjwddz.cn/static/image/agv_chart.png', desc: '你说这里要说什么好呢！！', type: 'picture' },
            { url: 'https://www.cjwddz.cn/static/image/agv_chart0.png', desc: '你说这里要说什么好呢！！', type: 'picture' },
            { url: 'https://www.cjwddz.cn/static/image/agv_log.png', desc: '你说这里要说什么好呢！！', type: 'picture' },
            { url: 'https://www.cjwddz.cn/static/image/agv_math.jpg', desc: '你说这里要说什么好呢！！', type: 'picture' },
          ],
        }, {
          media: [
            { url: 'https://www.cjwddz.cn/static/image/agv_chart.png', desc: '你你说这里要说什么好呢！！说这里要说什么好呢！！', type: 'picture' },
            { url: 'https://www.cjwddz.cn/static/image/agv_chart0.png', desc: '你说这里要说什么好呢！！', type: 'picture' },
            { url: 'https://www.cjwddz.cn/static/image/agv_log.png', desc: '你说这里要说什么好呢！！', type: 'picture' },
            { url: 'https://www.cjwddz.cn/static/image/agv_math.jpg', desc: '你说这里要说什么好呢！！', type: 'picture' },
          ],
        },
      ],
    }
  },
  mounted() {
    window.onresize = function () {     // eslint-disable-line
      this.height = document.body.clientHeight - 150
    }
  },
  components: {
    Scroll, Tabs, TabPane, Carousel, CarouselItem, Card,
  },
  created() {
    const mockData = []
    Date.prototype.formatDate = function () {                     // eslint-disable-line
      const y = this.getFullYear()
      const m = this.getMonth()
      const d = this.getDate()
      return `${y}/${m}/${d}`
    }
    this.tasks = mockData.map((item) => {
      const result = item
      result.period = `${Math.round(Math.abs((result.to_time - result.from_time)) / (1000 * 60 * 60 * 24))}天`
      result.overdue = result.to_time < new Date().getTime()
      result.from_time = new Date(result.from_time).formatDate()
      result.to_time = new Date(result.to_time).formatDate()
      return result
    })
  },
  methods: {
    async handleReachBottom() {
      setTimeout(() => {
        Promise.resolve({ status: true })
      }, 2000)
    },
  },
}
</script>
