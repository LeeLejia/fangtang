<template>
    <div>
        <Table :data="tableData1" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="totalPage" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
import mockData from '@/assets/mock/mock_links.json'
import { Table, Page, Tag, Poptip, Button } from 'iview'

export default {
  data() {
    return {
      tableData1: this.mockTableData1(),
      total: 20,
      per: 10,
      tableColumns: [],
    }
  },
  mounted() {
    this.tableColumns = [
      {
        title: '链接名称',
        key: 'name',
      },
      {
        title: 'url',
        key: 'urlSuffix',
        render: this.urlRender,
      },
      {
        title: '状态',
        key: 'status',
        render: this.statusRender,
      },
      {
        title: '类型',
        key: 'content',
        render: (h, params) => h('Tag', `${params.row.content.type} [${params.row.content.header}]`),
      },
      {
        title: '访问量',
        key: 'visited',
        render: (h, params) => h('Tag', `${params.row.visited}${params.row.configs.max ? `/${params.row.configs.max}` : ''}`),
      },
      {
        title: '创建时间',
        key: 'created_at',
        render: (h, params) => h('div', this.formatDate(new Date())),
      }, {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: this.actionsRender,
      },
    ]
  },
  components: {
    Table, Page, Tag, Poptip, Button,
  },
  computeds: {
    totalPage() {
      return Math.ceil(this.total / this.per)
    },
  },
  methods: {
    statusRender(h, params) {
      const row = params.row
      const color = row.status === 'diable' ? 'grey' : row.status === 'normal' ? 'green' : 'red' // eslint-disable-line
      const text = row.status === 'diable' ? 'disable' : row.status === 'normal' ? 'working' : 'error' // eslint-disable-line
      return h('Poptip', {
        props: {
          trigger: 'hover',
          title: '设置状态',
          placement: 'bottom',
        },
      }, [
        h('Tag', { props: { type: 'dot', color } }, text),
        h('div', { slot: 'content' }, [
          h('div', [
            h('Tag', { props: { type: 'dot', color: 'grey' }, nativeOn: { click: () => this.disable(params.row) } }, '禁用'),
            h('Tag', { props: { type: 'dot', color: 'green' }, nativeOn: { click: () => this.enable(params.row) } }, '启用'),
          ]),
        ]),
      ])
    },
    actionsRender(h, params) {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small',
          },
          style: {
            marginRight: '5px',
          },
          on: {
            click: () => {
              // todo
            },
          },
        }, '修改'),
        h('Button', {
          props: {
            type: 'error',
            size: 'small',
          },
          on: {
            click: () => {
              // todo
            },
          },
        }, '删除'),
      ])
    },
    urlRender(h, params) {
      return h('div', [params.row.urlSuffix, h('Tag', { style: { 'margin-left': '5px' }, nativeOn: { click: () => { console.log('hi!') } } }, '复制')])
    },
    disable(row) {
      alert(row)
    },
    enable(row) {
      alert(row)
    },
    mockTableData1() {
      console.log(mockData)
      return mockData.data
    },
    formatDate(date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? `0${m}` : m
      let d = date.getDate()
      d = d < 10 ? (`0${d}`) : d
      return `${y}-${m}-${d}`
    },
    changePage() {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.tableData1 = this.mockTableData1()
    },
  },
}
</script>
