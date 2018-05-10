<template>
<div style="margin-top: 20px;">
    <Row>
        <AutoComplete
                v-model="value4"
                icon="ios-search"
                placeholder="输入关键字"
                style="width:300px;display:inline-block;z-index:999;">
        </AutoComplete>
        <Upload multiple
                style="display:inline-block"
                action="//jsonplaceholder.typicode.com/posts/">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
    </Row>
     <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="all" style="z-index:998!important">
            <Icon type="ios-paper"></Icon>
            全部
        </MenuItem>
        <MenuItem name="picture" style="z-index:998!important">
            <Icon type="ios-paper"></Icon>
            图片
        </MenuItem>
        <MenuItem name="doc" style="z-index:998!important">
            <Icon type="ios-paper"></Icon>
            文档
        </MenuItem>
        <MenuItem name="data" style="z-index:998!important">
            <Icon type="ios-paper"></Icon>
            资料
        </MenuItem>
         <MenuItem name="others" style="z-index:998!important">
            <Icon type="ios-paper"></Icon>
            其它
        </MenuItem>
     </Menu>
     <Scroll class="scroll" :on-reach-bottom="handleReachBottom" height="400">
        <div class="item" v-for="file in files" :key="file.id">
            <div class="file-prop file-name">{{file.name}}</div>
            <div class="file-prop file-size">{{file.size}}</div>
            <div class="file-prop file-date">{{file.date}}</div>
            <div class="file-prop file-actions">
                <a href="www.cjwddz.cn" :download="file.name"><Icon type="ios-cloud-download-outline" style="margin-right:5px;"></Icon>下载</a>
                <span><Icon type="trash-a" style="margin-right:5px;"></Icon>删除</span>
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
export default {
  data() {
    return {
      value4: '',
      files: [
        { name: 'aa.txt', size: '124.34MB', date: '2018.01.23' },
        { name: '中文.txt', size: '124.34MB', date: '2018.01.23' },
        { name: '啊各位师傅.3gp', size: '124.34MB', date: '2018.01.23' },
        { name: '你们少时诵诗你们少时诵诗书你们少时诵诗书你们少时诵诗书你们少时诵诗书你们少时诵诗书你们少时诵诗书你们少时诵诗书你们少时诵诗书书.doc', size: '124.34MB', date: '2018.01.23' },
      ],
    }
  },
  methods: {
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
  },
}
</script>
