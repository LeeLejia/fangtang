<template>
   <div class="publish-from">
       <Form :model="formItem" :label-width="80">
           <FormItem label="项目名称">
               <Input v-model="formItem.name" placeholder="输入项目名称"></Input>
           </FormItem>
           <FormItem label="项目周期">
               <DatePicker type="daterange" :options="dateOptions" v-model="period" format="yyyy年MM月dd日" placement="bottom-start" placeholder="项目周期" :start-date="new Date()" style="width: 250px"></DatePicker>
           </FormItem>
           <FormItem label="类型">
               <CheckboxGroup v-model="formItem.type">
                   <Checkbox label="逆向"></Checkbox>
                   <Checkbox label="安卓"></Checkbox>
                   <Checkbox label="网页"></Checkbox>
                   <Checkbox label="脚本"></Checkbox>
                   <Checkbox label="爬虫"></Checkbox>
                   <Checkbox label="自动化"></Checkbox>
                   <Checkbox label="数据采集"></Checkbox>
                   <Checkbox label="智能硬件"></Checkbox>
                   <Checkbox label="平面设计"></Checkbox>
                   <Checkbox label="3D模型"></Checkbox>
                   <Checkbox label="毕业设计"></Checkbox>
                   <Checkbox label="其它"></Checkbox>
               </CheckboxGroup>
           </FormItem>
           <FormItem label="交付源码">
               <i-switch v-model="formItem.code" size="large">
                   <span slot="open">Yes</span>
                   <span slot="close">No</span>
               </i-switch>
           </FormItem>
           <FormItem label="价格区间">
               <RadioGroup v-model="formItem.unit">
                   <Radio label="yuan">元</Radio>
                   <Radio label="bai">百元</Radio>
                   <Radio label="qian">千元</Radio>
               </RadioGroup><span style="margin-left: 20px;"><b>{{range}}</b></span>
               <Slider style="z-index: 999" v-model="formItem.slider" range :min="1" :max="100" :step="1" :tip-format="tipFormat"></Slider>
               <p class="notice">注:价格区间尽量符合项目难度,否则可能不被关注</p>
           </FormItem>
           <FormItem label="佣金">
               <RadioGroup v-model="formItem.outsourcing">
                   <Radio label="false">指定平台方</Radio>
                   <Radio label="true">可外包</Radio>
               </RadioGroup>
               <AutoComplete :data="autoCommission" :disabled="formItem.outsourcing!=='true'" v-model="formItem.commission" placeholder="输入佣金金额,如:50元或5%"></AutoComplete>
               <p class="notice">当指定项目可以外包时,如果本团队技术人员无法完成贵方项目,将会为贵方寻找合适的团队,双方对接工作开始后收取部分佣金.</p>
           </FormItem>
           <FormItem label="附件">
               <FormItem
                       v-for="(item, index) in annex.items"
                       v-if="item.status"
                       :key="index"
                       :label="'附件' + index"
                       :prop="'items.' + index + '.value'">
                   <Row>
                       <Input style="width: 250px;" type="text" v-model="item.value" placeholder="简要描述附件"></Input>
                       <Button style="width: 100px;" type="ghost" icon="ios-cloud-upload-outline" @click="chooseFile(index)">{{item.name || '选择附件'}}</Button>
                       <Button style="width: 50px;" type="ghost" @click="handleRemove(index)">删除</Button>
                   </Row>
               </FormItem>
               <FormItem>
                   <Row>
                       <Col span="12">
                        <Button type="dashed" style="margin-left:80px;" long @click="handleAdd" icon="plus-round">添加附件</Button>
                       </Col>
                   </Row>
               </FormItem>
           </FormItem>
           <input type="file" style="display: none;" ref="upload" @change="upload"/>
           <FormItem label="描述">
               <Input v-model="formItem.describe" type="textarea" :autosize="{minRows: 2,maxRows: 8}" placeholder="简要说明项目内容"></Input>
           </FormItem>
           <FormItem>
               <Button type="primary" @click="submit">提交</Button>
               <Button type="ghost" style="margin-left: 8px">取消</Button>
           </FormItem>
       </Form>
   </div>
</template>
<style>
    .publish-from{
        /*width:650px;*/
    }
    .notice{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        color:#9ea7b4;
        font-size:12px;
        line-height:20px;
        margin-top:5px;
    }
    .annex-layout{
        max-height:300px;
        overflow-y: scroll;
    }
</style>
<script>
import throttle from 'lodash/throttle'  // eslint-disable-line
import Api from 'Api/publish-api'
import FileApi from 'Api/file-api'

export default {
  data() {
    return {
      period: [],
      annex: {
        items: [
          {
            value: '',
            index: 1,
            status: true,
            key: '',
          },
        ],
      },
      formItem: {
        name: '',
        unit: 'yuan',
        outsourcing: 'false',
        type: [],
        commission: '',
        code: true,
        slider: [20, 50],
        period: ['', ''],
        describe: '',
      },
      dateOptions: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000
        },
      },
    }
  },
  computed: {
    range() {
      return `${this.tipFormat(this.formItem.slider[0])} - ${this.tipFormat(this.formItem.slider[1])}`
    },
    autoCommission() {
      if (this.formItem.commission === '' || this.formItem.commission.indexOf('元') !== -1 || this.formItem.commission.indexOf('%') !== -1) {
        return []
      }
      const result = [`${this.formItem.commission}元`]
      if (Number(this.formItem.commission) < 100) {
        result.push(`${this.formItem.commission}%`)
      }
      return result
    },
  },
  methods: {
    tipFormat(value) {
      return `${this.getYuan(value)}元`
    },
    chooseFile(index){
        this.annex.items[index].name = "上传中..."
        this.$refs.upload.curIndex = index
        this.$refs.upload.click()
    },
     upload({target}){
        if (this.$refs.upload.uploading){
            this.$Message.error('请先等待当前文件上传完成!')
            return
        }
        const file = target.files[0]
        const index = this.$refs.upload.curIndex
        this.$refs.upload.uploading = true
        FileApi.uploadFile(file,event=>{
            this.annex.items[index].name = `进度${(event.loaded/event.total) * 100}%`
        }).then(response=>{
            if (response.status) {
                if (file.name.length > 5){
                    this.annex.items[index].name = file.name.substr(0,4) + '..'
                }else {
                    this.annex.items[index].name = file.name
                }
                this.annex.items[index].key = response.data.key
                this.$Message.success(response.msg || '上传文件成功!')
                console.log(this.annex.items)
            } else {
                this.$Message.error(response.msg || '上传文件失败!')
                this.annex.items[index].name = '上传失败'
            }
            this.$refs.upload.uploading = false
            this.$nextTick(()=>{this.$forceUpdate()})
        })
    },
    getYuan(value) {
      const unit = this.formItem.unit === 'yuan' ? 1 : (this.formItem.unit === 'bai' ? 100 : 1000)
      return value * unit
    },
    handleAdd() {
      this.index++
      this.annex.items.push({
        value: '',
        index: this.index,
        status: true,
      })
    },
    handleRemove(index) {
      this.annex.items[index].status = false
    },
    submit: throttle(async function () {
      if (!this.checkForm()) {
        return
      }
      const data = this.formItem
        const annex = this.annex.items.filter(item=>item.status).map(item=>{return {
            describe: item.value,
            file: item.key,
        }})
      const pushData = {
        name: data.name,
        money_lower: this.getYuan(data.slider[0]),
        money_upper: this.getYuan(data.slider[1]),
        outsourcing: data.outsourcing === 'true',
        type: data.type,
        commission: data.commission,
        code: data.code,
        annex: JSON.stringify(annex),
        from_time: this.period[0].getTime(),
        to_time: this.period[1].getTime(),
        describe: data.describe,
      }
      console.log(pushData)
      Api.publish(pushData).then((response) => {
        if (response.status) {
          this.$Message.success(response.data.msg || '发布任务成功!')
        } else {
          this.$Message.error(response.msg || '提交失败!')
        }
      })
    }, 2000),
    checkForm() {
      return true
    },
  },
}
</script>
