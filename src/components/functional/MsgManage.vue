<template>
    <div>
        <div class="msg-item" v-for="msg in msgs" :key="msg.id">
            <img class="msg-icon" :src="msg.icon"/>
            <div class="msg-words">
                <div class="msg-title">
                {{msg.title}}
                </div>
                <div class="msg-content">
                {{msg.content}}
                </div>
            </div>
            <div class="msg-actions">
                <Button type="primary">删除</Button>
            </div>
        </div>
         <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalPage" :current="1" @on-change="()=>{}"></Page>
            </div>
        </div>
    </div>
</template>
<style scoped>
.msg-item{
  margin: 5px 10px;
  padding: 4px;
  border-bottom: 1px solid #a3a3a3;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.msg-icon{
  width: 100px;
  height: 65px;
  border-radius: 20px;
  margin-right: 10px;
  justify-content: space-around;
}
.msg-words{
  flex-basis: 90%;
}
.msg-title{
  color:#000;
  font-weight: 500;
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
}
.msg-content{
  color:#a3a3a3;
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
}
.msg-actions{

}


</style>
<script>
import { Page, Button } from 'iview'
import mockData from '@/assets/mock/mock_msgs.json'

export default {
  components: { Page, Button },
  data() {
    return {
      msgs: mockData.data,
      total: mockData.total,
      per: 5,
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.per)
    },
  },
}
</script>
