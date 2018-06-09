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
        <Modal
                v-model="addGood"
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
                    <Input v-model="formItem.price"></Input>
                </FormItem>
                <FormItem label="状态">
                    <Select v-model="formItem.state">
                        <Option value="dropOff">下架</Option>
                        <Option value="normal">正常</Option>
                    </Select>
                </FormItem>
                <FormItem label="数量">
                    <Input v-model="formItem.count"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import Api from 'Api/pay-api'
    import { Table, Page, Tag, Poptip, Button ,DropdownMenu,DropdownItem,Dropdown,Input,FormItem,Select,Form,Option} from 'iview'
    export default {
        name: "order-list",
        data(){
            return{
                formItem: {
                    channel: '',    //渠道
                    name:'',        //商品名称
                    price:'',       //价格
                    state:'',       //状态
                    count:'',       //数量
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
                        key: 'type',
                        width:100
                    },
                    {
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '渠道',
                        key: 'channel'
                    },
                    {
                        title: '单价',
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
                        title: '创建时间',
                        key: 'created_at'
                    },
                    {
                        title: '状态',
                        width:150,
                        render(h,params){
                            let text = '未知'
                            return h('div',text)
                        }
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
            Table, Page, Tag, Poptip, Button,DropdownMenu,DropdownItem,Dropdown,Input,FormItem,Select,Form,Option
        },
        created(){
            this.current = 1
            this.query()
        },
        methods: {
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
                if(this.condition.value==='order_id' || this.condition.value === 'type'){
                    if(/^[1-9][0-9]*$/.test(this.searchText)===false){
                        this.$Message.error({content:"不能输入非数字!"})
                        return false
                    }
                }
                if(this.condition.value==='state'){
                    if(['支付成功','等待支付','支付失败'].indexOf(this.searchText)===-1){
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
                    (this.condition.value==='state') && (queryText = queryText==='支付成功'?1:(queryText==='等待支付'?2:-1))
                    condition[this.condition.value] = queryText
                }
                Api.getOrders(condition).then(result=>{
                    this.loading = false
                    if(!result.status){
                        this.$Modal.warning({
                            title:'获取订单失败',
                            content: result.msg || '服务器异常或者网络错误,请稍后重试!',
                        })
                        return
                    }
                    this.data = result.data.orders || []
                    this.total = result.data.total || 0
                    console.log(this.data)
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
                if(!this.formItem.channel || !this.formItem.name || !this.formItem.price || !this.formItem.count || !this.formItem.state){
                    this.$Modal.warning({
                        title:'提示',
                        content: '请将信息填写完整!',
                    });
                }
            },
            cancel () {

            }

        },
    }
</script>

<style scoped>

</style>