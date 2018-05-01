<template>
    <div class="container">
        <Scroll class="scroll" :on-reach-bottom="handleReachBottom" :height="height">
            <!--item-->
            <Card class="item">
                <Row>
                <Col span="12">
                    <Carousel class="carousel" autoplay loop>
                        <CarouselItem>
                            <img class="carousel-item" src="http://www.cjwddz.cn/static/image/agv_chart.png"/>
                            <p class="carousel-item-desc">A图片的描述内容</p>
                        </CarouselItem>
                        <CarouselItem>
                            <img class="carousel-item" src="http://www.cjwddz.cn/static/image/agv_chart0.png"/>
                            <p class="carousel-item-desc">B图片的描述内xxxx容</p>
                        </CarouselItem>
                        <CarouselItem>
                            <img class="carousel-item" src="http://www.cjwddz.cn/static/image/agv_log.png"/>
                        </CarouselItem>
                        <CarouselItem>
                            <img class="carousel-item" src="http://www.cjwddz.cn/static/image/agv_math.jpg"/>
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
    .carousel-item{
        text-align: center;
        vertical-align:middle;
        height: 250px;
        width: 100%;
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
    export default{
    data(){
        return {
            height: document.body.clientHeight - 150,
            projects: [
                {
                    pictures:[
                        {src: 'agv_chart.png',desc: ''},
                        {src: 'agv_chart0.png',desc: ''},
                        {src: 'agv_log.png',desc: ''},
                        {src: 'agv_math.jpg',desc: ''},
                    ]
                }
            ]
        }
    },
    mounted(){
        window.onresize = function(){
            this.height = document.body.clientHeight - 150
        }
    },
    created(){
        let mockData = require('../assets/mock/mock_projects.json')
        Date.prototype.formatDate = function () {
            const y = this.getFullYear()
            const m = this.getMonth()
            const d = this.getDate()
            return `${y}/${m}/${d}`
        }
        this.tasks = mockData.map(item=>{
            const result = item
            result.period = `${Math.round(Math.abs((result.to_time - result.from_time))/(1000*60*60*24))}天`
            result.overdue = result.to_time < new Date().getTime()
            result.from_time = new Date(result.from_time).formatDate()
            result.to_time = new Date(result.to_time).formatDate()
            return result
        })
    },
    methods:{
        async handleReachBottom(){
            setTimeout(()=>{
                Promise.resolve( {status: true})
            },2000)
        }
    }
}
</script>