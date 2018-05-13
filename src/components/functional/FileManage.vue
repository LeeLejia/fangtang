<template>
<div style="margin-top: 20px;">
    <Row>
        <AutoComplete
                v-model="query"
                icon="ios-search"
                @keyup.native.enter="change"
                placeholder="输入关键字"
                style="width:300px;display:inline-block;z-index:999;">
        </AutoComplete>
        <input type="file" @change="upload" style="display: none;" ref="_upload"/>
        <Button type="ghost" icon="ios-cloud-upload-outline" @click="$refs._upload.click()">上传文件</Button>
    </Row>
     <Menu mode="horizontal" active-name="all" @on-select="changeType">
        <MenuItem name="all">
            <Icon type="ios-paper"></Icon>
            全部
        </MenuItem>
        <MenuItem name="image">
            <Icon type="ios-paper"></Icon>
            图片
        </MenuItem>
        <MenuItem name="office">
            <Icon type="ios-paper"></Icon>
            文档
        </MenuItem>
        <MenuItem name="video">
            <Icon type="ios-paper"></Icon>
            视频
        </MenuItem>
         <MenuItem name="application">
            <Icon type="ios-paper"></Icon>
            其它
        </MenuItem>
     </Menu>
     <Scroll class="scroll" :on-reach-bottom="handleReachBottom" height="400">
        <div class="item" v-for="file in files" :key="file.id">
            <div class="file-prop file-name">{{file.name}}</div>
            <div class="file-prop file-size">{{file.size}}</div>
            <div class="file-prop file-date">{{file.timestamps}}</div>
            <div class="file-prop file-actions">
                <a :href="`/static/file/${file.key}`" :download="file.name"><Icon type="ios-cloud-download-outline" style="margin-right:5px;"></Icon>下载</a>
                <span @click="delFile(file)"><Icon type="trash-a" style="margin-right:5px;"></Icon>删除</span>
            </div>
        </div>
    </Scroll>
</div>
</template>
<style scoped lang="less">
    .demo-auto-complete-item{
        padding: 4px 0;
        border-bottom: 1px solid #F6F6F6;
    }
    .demo-auto-complete-group{
        font-size: 12px;
        padding: 4px 6px;
    }
    .demo-auto-complete-group span{
        color: #666;
        font-weight: bold;
    }
    .demo-auto-complete-group a{
        float: right;
    }
    .demo-auto-complete-count{
        float: right;
        color: #999;
    }
    .demo-auto-complete-more{
        display: block;
        margin: 0 auto;
        padding: 4px;
        text-align: center;
        font-size: 12px;
    }
    .scroll{
        ::-webkit-scrollbar{
            width: 0!important;
        }
        .item{
            font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
            color: #657180;
            display: flex;
            flex-direction: row;
            align-content: space-between;
            width: 100%;
            font-size: 13px;
            .file-prop {
                line-height: 30px;
                cursor: default;
            }
            .file-name{
                width: 280px;
                margin-right: 10px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .file-size{
                width: 100px;
            }
            .file-date{
                width: 100px;
            }
            .file-actions{
                width: 100px;
            }
            .file-actions,*{
                margin-right:10px;
                cursor: pointer;
            }
        }
    }
</style>
<script>
import Api from 'Api/file-api'
export default {
  data() {
    return {
      query: '',
      files: [],
      type: '',
    }
  },
  created(){
    this.queryFiles()
  },
  methods: {
    queryFiles(){
          Api.queryFiles(this.type,this.query,0,10000).then(result=>{
              if(result.status){
                  if(!result.data.files){
                      this.files = []
                      return
                  }
                  this.files = result.data.files.map(file=>{
                      const dateStr = file.created_at.slice(0,10)
                      return {id:file.id,key:file.key,name:file.name,size:this.bytesToSize(file.size),timestamps:dateStr}
                  })
              }else{
                  this.$Message.error(result.msg)
              }
          })
    },
    change(){
      this.queryFiles()
    },
    bytesToSize(bytes) {
        if (bytes === 0) return '0 B'
        let k = 1024
        let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        let i = Math.floor(Math.log(bytes) / Math.log(k))
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    },
    handleReachBottom() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const last = this.list1[this.list1.length - 1]
          for (let i = 1; i < 11; i += 1) {
            this.list1.push(last + i)
          }
          resolve()
        }, 2000)
      })
    },
    upload({target}){
      const file = target.files[0]
      Api.uploadFile(file,event=>{
          console.log(event)
      }).then(response=>{
        if (response.status) {
          this.$Message.success(response.msg || '上传文件成功!')
          this.queryFiles()
        } else {
          this.$Message.error(response.msg || '上传文件失败!')
        }
      })
    },
    delFile(file){
        Api.deleteFile(file.id,file.key).then(response=>{
            if (response.status) {
                this.$Message.success(response.msg || '删除文件成功!')
                this.files = this.files.filter(item=>{
                    return item.id !== file.id
                })
            } else {
                this.$Message.error(response.msg || '删除文件失败!')
            }
        })
    },
    changeType(type){
        if(type === 'all'){
            this.type = ''
        }else {
            this.type = type
        }
      this.queryFiles()
    }
  }
}
</script>
