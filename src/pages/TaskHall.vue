<template>
    <div class="container">
        <Scroll class="scroll" :on-reach-bottom="handleReachBottom" :height="height">
            <h1 class="title">任务大厅</h1>
            <Card style="width:80%;margin-left: auto;margin-right:auto; margin-bottom:20px;" v-for="task in tasks" :key = 'task.id'>
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    {{task.name}}
                </p>
                <a :href="'/task/'+task.id" @click="alert('洗洗睡吧!')" slot="extra">
                    <Icon type="ios-lightbulb-outline"></Icon>
                    我要接单
                </a>
                <Row class="item">
                    <span class="label">项目预算:</span>
                    <Icon type="social-yen"></Icon>
                    {{task.money_lower}}元 - {{task.money_upper}}元
                </Row>
                <Row class="item">
                    <span class="label">起始时间:</span>
                    <Icon type="ios-calendar-outline"></Icon>
                    {{task.from_time}} -
                    <Icon type="ios-calendar"></Icon>
                    {{task.to_time}}
                </Row>
                <Row class="item">
                    <span class="label">项目周期:</span>
                    <Icon type="ios-stopwatch-outline"></Icon>
                    {{task.period}}
                </Row>
                <Row class="item">
                    <span class="label">标签:</span>
                    <Icon type="ios-pricetags-outline"></Icon>
                    <Tag type="dot" v-for="tag in task.type" :color="getRandomColor()" :key="tag+Math.random()">{{tag}}</Tag>
                </Row>
                <Row class="item">
                    <span class="label">描述:</span>
                    <Icon type="social-twitch-outline"></Icon>
                    {{task.describe}}
                </Row>
                <Row class="item" v-if="task.annex && task.annex.length>0">
                    <a class="file-item" @click.prevent="alert('洗洗睡吧!')">
                        <Icon type="ios-cloud-download-outline"></Icon>
                        下载附件
                    </a>
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
    .file-item{
        margin-top: 20px;
    }
    .title{
        margin-top:20px;
        margin-bottom:20px;
        text-align: center;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .label{
        text-align: end;
        width:100px;
        margin-right:10px;
    }
    .scroll{
        height:100vh;
        ::-webkit-scrollbar{
            width:0;
        }
    }
</style>
<script>
    export default{
        data(){
          return {
              height: document.body.clientHeight - 150,
              tasks: []
          }
        },
        created(){
          let mockData = require('./mock_task.json')
          Date.prototype.formatDate = function () {
            const y = this.getFullYear()
            const m = this.getMonth()
            const d = this.getDate()
            return `${y}/${m}/${d}`
          }
          this.tasks = mockData.map(item=>{
              const result = item
              result.period = `${Math.round(Math.abs((result.to_time - result.from_time))/(1000*60*60*24))}天`;
              result.from_time = new Date(result.from_time).formatDate()
              result.to_time = new Date(result.to_time).formatDate()
              return result
          })
        },
        mounted(){
            window.onresize = function(){
                this.height = document.body.clientHeight - 150
            }
        },
        methods:{
            async handleReachBottom(){
                setTimeout(()=>{
                    Promise.resolve( {status: true})
                },2000)
            },
            getRandomColor(){
                return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
            },
        }
    }
</script>