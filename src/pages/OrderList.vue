<template>
    <div>
        <div style="margin: 0 0 20px 0">
            <Dropdown trigger="click" style="margin-left: 20px">
                <a href="javascript:void(0)">
                    click 触发
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in columns" :key="item.key">{{item.title}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Input v-model="searchText" placeholder="输入搜索内容" style="width: 200px"> </Input>
            <Button type="primary" @clcik="search">搜索</Button>
        </div>
        <Table border :columns="columns" :data="data"></Table>
        <Page :total="totalCount" :current="1" @on-change="changePage" show-sizer style="margin: 20px 0"></Page>
    </div>
</template>

<script>
    import { Table, Page, Tag, Poptip, Button ,DropdownMenu,DropdownItem,Dropdown,Input} from 'iview'
    export default {
        name: "order-list",
        data(){
            return{
                totalCount:1000,    //数据总数
                searchText:'',      //搜索内容
                columns: [
                    {
                        title: '订单号',
                        key: 'orderName',
                    },
                    {
                        title: '任务名称',
                        key: 'taskName'
                    },
                    {
                        title: '金额',
                        key: 'amount'
                    },
                    {
                        title: '支付方式',
                        key: 'payWay'
                    },
                    {
                        title: '创建时间/完成时间',
                        key: 'createTime'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '补单'),
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        orderName: '000001',
                        taskName: '小水管1号',
                        amount: '1000',
                        payWay:'alipay',
                        createTime:'2018-06-03',
                        status:'已支付',
                    },
                    {
                        orderName: '000001',
                        taskName: '小水管1号',
                        amount: '1000',
                        payWay:'alipay',
                        createTime:'2018-06-03',
                        status:'已支付',
                    },
                    {
                        orderName: '000001',
                        taskName: '小水管1号',
                        amount: '1000',
                        payWay:'alipay',
                        createTime:'2018-06-03',
                        status:'已支付',
                    },
                    {
                        orderName: '000001',
                        taskName: '小水管1号',
                        amount: '1000',
                        payWay:'alipay',
                        createTime:'2018-06-03',
                        status:'已支付',
                    },
                    {
                        orderName: '000001',
                        taskName: '小水管1号',
                        amount: '1000',
                        payWay:'alipay',
                        createTime:'2018-06-03',
                        status:'已支付',
                    },

                ]
            }
        },
        components: {
            Table, Page, Tag, Poptip, Button,DropdownMenu,DropdownItem,Dropdown,Input
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '订单状况',
                    content: `订单号：${this.data[index].orderName}<br>任务名称：${this.data[index].taskName}<br>金额：${this.data[index].amount}`
                })
            },
            search(){

            }
        },
    }
</script>

<style scoped>

</style>