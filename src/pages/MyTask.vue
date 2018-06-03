<template>
    <Row>
        <Col span="11" style="margin: 20px;width: 250px" v-for="item in myTask" :key="item.key">
        <Card>
            <p slot="title" style="text-align: center;cursor: pointer" @click="clickMyTaskItem(item.url)">{{item.name}}</p>
            <img :src="item.src" style="width: 208px">
        </Card>
        </Col>
    </Row>
</template>

<script>
    import { CarouselItem, Carousel, Card, Row} from 'iview'
    export default {
        name: "my-task",
        data(){
            return {
                myTask:[
                    {
                        name:'已发布任务',
                        src:'https://upload-images.jianshu.io/upload_images/7166236-60ec8e0748e1cd6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                        url:'http://www.baidu.com',
                    },
                    {
                        name:'草稿箱',
                        src:'https://upload-images.jianshu.io/upload_images/7166236-60ec8e0748e1cd6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                        url:'http://www.baidu.com',
                    },
                    {
                        name:'已接任务',
                        src:'https://upload-images.jianshu.io/upload_images/7166236-60ec8e0748e1cd6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                        url:'http://www.baidu.com',
                    },
                    {
                        name:'正在进行中任务',
                        src:'https://upload-images.jianshu.io/upload_images/7166236-60ec8e0748e1cd6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                        url:'http://www.baidu.com',
                    },
                    {
                        name:'已完成任务',
                        src:'https://upload-images.jianshu.io/upload_images/7166236-60ec8e0748e1cd6d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
                        url:'http://www.baidu.com',
                    },
                ]
            }
        },
        components: {
            CarouselItem, Carousel, Card, Row
        },
        methods:{
            clickMyTaskItem(url){
                console.log(url);
                window.open(url);
            }
        }

    }
</script>

<style scoped>

</style>