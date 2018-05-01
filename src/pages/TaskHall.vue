<template>
    <div class="container">
       <h1 class="title">任务大厅</h1>
        <Scroll class="scroll" :on-reach-bottom="handleReachBottom" :height="height">
            <Card style="width:80%;margin-left: auto;margin-right:auto; margin-bottom:20px;" v-for="task in tasks" :key = 'task.id'>
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    {{task.name}}
                </p>
                <a :href="'/task/'+task.id" slot="extra">
                    <Icon type="more"></Icon>
                    查看详情
                </a>
                <p>
                    {{task.describe}}
                </p>
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
    .title{
        margin-top:20px;
        margin-bottom:20px;
        text-align: center;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
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
              tasks: [{
                  id: '2213465352311214',
                  name: '项目名',
                  money_lower: 2000,
                  money_upper: 5000,
                  outsourcing: true,
                  type: ['安卓','逆向','毕业设计'],
                  commission: '50元',
                  code: 'yes',
                  from_time:new Date(),
                  to_time: new Date(),
                  describe: 'xxsgftwsfs',
              },{
                  id: '221346532311214',
                  name: '项目名',
                  money_lower: 2000,
                  money_upper: 5000,
                  outsourcing: true,
                  type: ['安卓','逆向','毕业设计'],
                  commission: '50元',
                  code: 'yes',
                  from_time:new Date(),
                  to_time: new Date(),
                  describe: 'xxsgftwsfs',
              },{
                  id: '22134655233611214',
                  name: '项目名',
                  money_lower: 2000,
                  money_upper: 5000,
                  outsourcing: true,
                  type: ['安卓','逆向','毕业设计'],
                  commission: '50元',
                  code: 'yes',
                  from_time:new Date(),
                  to_time: new Date(),
                  describe: 'xxsgftwsfs',
              },{
                  id: '2213465354311214',
                  name: '项目名',
                  money_lower: 2000,
                  money_upper: 5000,
                  outsourcing: true,
                  type: ['安卓','逆向','毕业设计'],
                  commission: '50元',
                  code: 'yes',
                  from_time:new Date(),
                  to_time: new Date(),
                  describe: 'xxsgftwsfs',
              },{
                  id: '2213465352321214',
                  name: '项目名',
                  money_lower: 2000,
                  money_upper: 5000,
                  outsourcing: true,
                  type: ['安卓','逆向','毕业设计'],
                  commission: '50元',
                  code: 'yes',
                  from_time:new Date(),
                  to_time: new Date(),
                  describe: 'xxsgftwsfs',
              },{
                  id: '221346532562311214',
                  name: '项目名',
                  money_lower: 2000,
                  money_upper: 5000,
                  outsourcing: true,
                  type: ['安卓','逆向','毕业设计'],
                  commission: '50元',
                  code: 'yes',
                  from_time:new Date(),
                  to_time: new Date(),
                  describe: 'xxsgftwsfs',
              }]
          }
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
            }
        }
    }
</script>