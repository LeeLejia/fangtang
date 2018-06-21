<template>
    <div>
        <div style="margin: 0 0 20px 0">
            <Dropdown trigger="click" style="margin-left: 20px">
                <a href="javascript:void(0)">
                    {{condition.name}}
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in conditions" :key="item.key" @click.native="condition=item">{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Input v-model="searchText" :placeholder="condition.desc" @keyup.native.enter="search" style="width: 200px"></Input>
            <Button type="primary" @click="search" :loading = "loading">搜索</Button>
            <Button type="ghost" size="large" @click="addGood = true">添加商品</Button>
        </div>
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="total"
              :current = "current"
              :page-size="pageSize"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              show-sizer style="margin: 20px 0"></Page>
        <Modal v-model="addGood"
                title="添加商品"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="渠道">
                    <Input v-model="formItem.channel"></Input>
                </FormItem>
                <FormItem label="商品名称">
                    <Input v-model="formItem.name"></Input>
                </FormItem>
                <FormItem label="价格">
                    <InputNumber :min="0" :step="0.01" v-model="formItem.price"></InputNumber>
                </FormItem>
                <FormItem label="状态">
                    <Select v-model="formItem.state">
                        <Option value="dropOff">下架</Option>
                        <Option value="normal">正常</Option>
                    </Select>
                </FormItem>
                <FormItem label="数量">
                    <InputNumber :min="-1" :step="1" v-model="formItem.count"></InputNumber>
                </FormItem>
                <FormItem label="商品描述">
                    <Input v-model="formItem.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="描述商品"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import Api from 'Api/goods-api'
    import Utils from 'Utils/utils'
    import { Table, Page, Tag, Poptip, Button ,DropdownMenu,DropdownItem,Dropdown,Input,FormItem,Select,Form,Option,InputNumber} from 'iview'
    export default {
        name: "goods-list",
        data(){
            const vueInstance = this
            return{
                formItem: {
                    channel: '',    // 渠道
                    name:'',        // 商品名称
                    price: 0,       // 价格
                    state:'正常',       // 状态
                    count:-1,       // 数量
                    describe:'',    // 商品描述
                },
                addGood:false,      //show add good modal
                loading: false,
                condition:{name:'商品名称',value:'name',desc:'搜索商品'},
                conditions:[
                    {name:'商品名称',value:'name',desc:'搜索商品'},
                    {name:'渠道',value:'channel',desc:'渠道搜索'},
                    {name:'类型',value:'type',desc:'通过商品类型搜索'},
                    {name:'状态',value:'state',desc:'搜索订单状态'},
                ],
                total:0,
                current:1,
                pageSize:10,
                searchText:'',      //搜索内容
                columns: [
                    {
                        title: '商品码',
                        width:100,
                        render(h,params){
                            return h('div',{style:{width: '100%','text-overflow':'ellipsis',overflow:'hidden','white-space': 'nowrap',cursor:'pointer'},on: {
                                click: () => {
                                    Utils.CopyText(params.row.type)
                                    vueInstance.$Message.success('商品码已拷贝到剪贴板！')
                                },
                            },},params.row.type)
                        },
                    },
                    {
                        title: '商品名称',
                        key: 'name',
                        width:200,
                    },
                    {
                        title: '渠道',
                        key: 'channel',
                        width:120,
                    },
                    {
                        title: '单价',
                        width:120,
                        render(h,params){
                            const text = `￥${params.row.price/100}元`
                            return h('div',text)
                        },
                    },
                    {
                        title: '数量',
                        width:100,
                        render(h,params){
                            const text = params.row.count !== -1?params.row.count:'无限量'
                            return h('div',text)
                        },
                    },
                    {
                        title: '状态',
                        width:100,
                        render(h,params){
                            let text = '未知'
                            return h('div',text)
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'created_at'
                    },
                    {
                        title:'操作',
                        render(h,params){
                            return h('div','待添加')
                        }
                    }
                ],
                data: []
            }
        },
        components: {
            Table, Page, Tag, Poptip, Button,DropdownMenu,DropdownItem,Dropdown,Input,FormItem,Select,Form,Option,InputNumber
        },
        created(){
            this.current = 1
            this.query()
        },
        methods: {
            add(){

            },
            show (index) {
                this.$Modal.info({
                    title: '订单状况',
                    content: `订单号：${this.data[index].orderName}<br>任务名称：${this.data[index].taskName}<br>金额：${this.data[index].amount}`
                })
            },
            search(){
                this.current = 1
                this.query()
            },
            checkCondition(){
                if (!this.searchText) return true
                if(this.condition.value==='state'){
                    if(['已下架','正常'].indexOf(this.searchText)===-1){
                        this.$Message.error({content:"不存在该状态!"})
                        return false
                    }
                }
                return true
            },
            query(){
                if(!this.checkCondition()) return
                this.loading = true
                let condition = {start:(this.current-1) * this.pageSize,count:this.pageSize}
                let queryText = this.searchText
                if(queryText){
                    (this.condition.value==='state') && (queryText = queryText==='已下架'?-1:1)
                    condition[this.condition.value] = queryText
                }
                Api.getGoods(condition).then(result=>{
                    this.loading = false
                    if(!result.status){
                        this.$Modal.warning({
                            title:'获取商品列表出错',
                            content: result.msg || '服务器异常或者网络错误,请稍后重试!',
                        })
                        return
                    }
                    this.data = result.data.goods || []
                    this.total = result.data.total || 0
                })
            },
            changePage(value){
                this.current = value
                this.query()
            },
            changePageSize(size){
                this.pageSize = size
                this.query()
            },
            ok () {
                let msg = ''
                if(!this.formItem.channel) msg = "请填写渠道!"
                else if(this.formItem.channel.length < 5 || this.formItem.channel.length>10) msg = "渠道设置为5-10个字符!"
                else if(!this.formItem.price || this.formItem.price < 0) msg = "请正确设置价格"
                else if(!this.formItem.count || this.formItem.count < -1) msg = "请正确设置商品数量"
                else if(!this.formItem.state) msg = "请设置商品状态"
                if(msg){
                    this.$Modal.warning({
                        title:'提示',
                        content: msg,
                    });
                    return
                }
                const good = {
                    name: this.formItem.name,
                    channel: this.formItem.channel,
                    price: this.formItem.price * 100,
                    state: this.formItem.state,
                    count: this.formItem.count,
                    desc: this.formItem.describe,
                }
                Api.addGood(good).then(result=>{
                    if(!result.status){
                        this.$Modal.warning({
                            title:'添加商品失败',
                            content: result.msg || '服务器异常或者网络错误,请稍后重试!',
                        })
                    }else{
                        this.$Message.success({
                            content: '添加商品成功!',
                        })
                        this.formItem = {
                            channel: '',
                                name:'',
                                price: 0,
                                state:'正常',
                                count:-1,
                                describe:'',
                        }
                        this.query()
                    }
                })
            },
            cancel () {

            }

        },
    }
</script>

<style scoped>

</style>