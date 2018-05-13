<template>
    <div>
        <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tableData1: this.mockTableData1(),
      tableColumns1: [
        {
          title: '链接名称',
          key: 'name',
        },
        {
            title: 'url',
            key: 'url',
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            const row = params.row
            const color = row.status === 1 ? 'blue' : row.status === 2 ? 'green' : 'red' // eslint-disable-line
            const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail' // eslint-disable-line

            return h('Tag', {
              props: {
                type: 'dot',
                color,
              },
            }, text)
          },
        },
        {
          title: '类型',
          key: 'config',
          render: (h, params) => h('Tag', `${params.row.config.type} [${params.row.config.contentType}]`),
        },
        {
          title: '访问量',
          key: 'people',
          render: (h, params) => h('Tag', params.row.people.length),
        },
        {
          title: '创建时间',
          key: 'created_at',
          render: (h, params) => h('div', this.formatDate(this.tableData1[params.index].created_at)),
        },{
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
                      }, '修改'),
                      h('Button', {
                          props: {
                              type: 'error',
                              size: 'small'
                          },
                          on: {
                              click: () => {
                                  this.remove(params.index)
                              }
                          }
                      }, '删除')
                  ]);
              }
          }
      ],
    }
  },
  methods: {
    mockTableData1() {
      const data = []
      for (let i = 0; i < 10; i += 1) {
        data.push({
          name: `Business${Math.floor(Math.random() * 100 + 1)}`,
          status: Math.floor(Math.random() * 3 + 1),
          url: `/usenglsj/aqfsswf`,
          config: {type: 'html', file: {name:'AAA.html',key: 'xxxxxxxxxxx'}, contentType: 'text/html'},
          people: [
            {
              n: `People${Math.floor(Math.random() * 100 + 1)}`,
              c: Math.floor(Math.random() * 1000000 + 100000),
            },
            {
              n: `People${Math.floor(Math.random() * 100 + 1)}`,
              c: Math.floor(Math.random() * 1000000 + 100000),
            },
            {
              n: `People${Math.floor(Math.random() * 100 + 1)}`,
              c: Math.floor(Math.random() * 1000000 + 100000),
            },
          ],
          created_at: new Date(),
        })
      }
      return data
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
