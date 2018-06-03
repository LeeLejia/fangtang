<template>
    <Form label-position="left" :label-width="100">
        <FormItem label="选择分类">
            <Cascader :data="kmClassification" v-model="kmData"></Cascader>
        </FormItem>
        <FormItem label="选择商品">
            <AutoComplete
                    v-model="search"
                    placeholder="搜索商品">
                <Option v-for="item in filterItems" :value="item.name" :key="item.type" @click.native="select(item)">{{ item.name }}</Option>
            </AutoComplete>
        </FormItem>
        <FormItem label="商品价格" v-if="search">
            <Input :readonly="true" :value="total"></Input>
        </FormItem>
        <FormItem label="商品数量" v-if="search">
            <Input :number="true" v-model="count"></Input>
        </FormItem>
        <FormItem label="邮箱" v-if="search">
            <Input :number="true" v-model="email"></Input>
        </FormItem>
        <Button type="primary" v-if="search" :loading="paying" @click="pay">确定支付</Button>
    </Form>
</template>
<style scoped></style>
<script>
    import Api from 'Api/pay-api'
    import {Option, Form, FormItem, Cascader, AutoComplete, Input, Button} from 'iview'
    export default{
        components:{Option, Form, FormItem, Cascader, AutoComplete, Input, Button},
        data() {
            return {
                kmClassification: [
                    {
                        value: 'bigData',
                        label: '大数据',
                        children: [
                            {
                                value: 'traffic',
                                label: '交通',
                            },
                            {
                                value: 'shopping',
                                label: '购物',
                            },
                            {
                                value: 'social',
                                label: '社交',
                            },
                        ],
                    }, {
                        value: 'data',
                        label: '学习资料',
                        children: [
                            {
                                value: 'doc',
                                label: '文档',
                                children: [
                                    {
                                        value: 'english',
                                        label: '英语四六级',
                                    },
                                    {
                                        value: 'code',
                                        label: '课程设计',
                                    },
                                ],
                            },
                            {
                                value: 'Substitution',
                                label: '视频课代课',
                                children: [
                                    {
                                        value: 'erya',
                                        label: '尔雅',
                                    },
                                    {
                                        value: 'muke',
                                        label: '慕课',
                                    },
                                ],
                            },
                        ],
                    }],
                kmData: [],
                search: '',
                selectItem: null,
                filterItems: [
                    {name:'天线宝宝',type:1001,price:100},
                    {name:'野猪佩奇',type:1002,price:200},
                    {name:'十万个为什么',type:1003,price:300},
                ],
                count: 1,
                email: '',
                paying: false,
            }
        },
        created() {
            this.email = this.$store.state.user.email || ''
        },
        methods: {
            pay() {
                if(!this.selectItem){
                    this.$Message.warning('请先选择商品')
                    return
                }
                if(this.count<=0){
                    this.$Message.warning('请输入正确的商品数量')
                    return
                }
                this.paying = true
                Api.aliPay(this.selectItem.type,this.count,window.location.href).then(result=>{
                    this.paying = false
                    console.log(result)
                    if(!result.status){
                        this.$Modal.warning({title:'提醒', content:result.msg || '订单生成错误!'})
                        return
                    }
                    this.$Modal.success({title:'生成订单成功',content:'请在支付页面支付!'})
                    window.open(result.data.url,"支付")
                })
            },
            select(item){
                this.selectItem = item
                console.log(item)

            }
        },
        computed: {
            total() {
                const price = ((this.selectItem && this.selectItem.price)||0)/100
                if (this.count <= 1) {
                    return `${price}元`
                }
                return `￥${price * this.count}元 ➠ ${this.count}个`
            },
        }
    }
</script>