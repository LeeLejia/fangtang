<template>
    <div class="container">
        <Scroll class="scroll" :on-reach-bottom="handleReachBottom" :height="height">
            <!--items-->
            <Card class="item" v-for="(project, index) in projects" :key="index + Math.random()">
                <DisplayItem :project="project"></DisplayItem>
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
</style>
<script scoped>
import { Scroll, Card } from 'iview'
import DisplayItem from '@/components/functional/DisplayItem'
import items from '@/assets/mock/mock_projects.json'

export default{
  data() {
    return {
      height: document.body.clientHeight - 150,
      projects: [],
    }
  },
  mounted() {
    window.onresize = function () {     // eslint-disable-line
      this.height = document.body.clientHeight - 150
    }
    this.projects = items
  },
  components: {
    Scroll, Card, DisplayItem,
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
