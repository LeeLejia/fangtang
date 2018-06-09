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
        </div>
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="total"
              :current = "current"
              :page-size="pageSize"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              show-sizer style="margin: 20px 0"></Page>
    </div>
</template>

<script>
    import Api from 'Api/pay-api'
    import { Table, Page, Tag, Poptip, Button ,DropdownMenu,DropdownItem,Dropdown,Input} from 'iview'
    export default {
        name: "order-list",
        data(){
            return{
                loading: false,
                condition:{name:'订单号',value:'order_id',desc:'请输入部分或全部订单号'},
                conditions:[
                    {name:'订单号',value:'order_id',desc:'请输入部分或全部订单号'},
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
                        title: '订单号',
                        width: 240,
                        key: 'order_id',
                    },
                    {
                        title: '渠道',
                        key: 'channel'
                    },
                    {
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '商品类型',
                        key: 'type',
                        width:100
                    },
                    {
                        title: '金额',
                        render(h,params){
                            const text = `￥${params.row.price/100}元 ➠ ${params.row.expend.count}个`
                            return h('div',text)
                        },
                    },
                    {
                        title: '支付方式',
                        width:100,
                        render(h,params){
                            const text = (params.row.expend && params.row.expend.payType) || '未知'
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
                            switch (params.row.state){
                                case 1:
                                    text = '支付成功'
                                    break
                                case 2:
                                    text = '等待支付'
                                    break
                                case -1:
                                    text = '支付失败'
                                    break
                            }
                            return h('div',text)
                        }
                    }
                ],
                data: []
            }
        },
        components: {
            Table, Page, Tag, Poptip, Button,DropdownMenu,DropdownItem,Dropdown,Input
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
            }
        },
    }
</script>

<style scoped>

</style>