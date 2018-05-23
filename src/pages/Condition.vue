<template>
    <div class="show-digtals">
    <Card class="card origin">
        <div class="desc">今日访问量</div>
        <div class="digtal">52</div>
    </Card>
     <Card class="card blue">
        <div class="desc">当前任务数</div>
        <div class="digtal">5</div>
    </Card>
    <Card class="card yellow">
        <div class="desc">稳定运行</div>
        <div class="digtal">89<sub>天</sub></div>
    </Card>
    </div>
</template>
<script>
import { Card } from 'iview'

export default{
  components: { Card },
}
</script>
<style scoped lang="less">
.show-digtals{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    .card{
        color: white;
        width:150px;
        margin: 20px;
        height: 150px;
        .digtal{
            height: 100px;
            line-height: 40px;
            font-family: 'Lato';
            font-size: 50px;
            text-align: center;
            font-weight: 700;
        }
        .desc{
            height: 50px;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
        }
    }
    .origin{
        background: #db6623;
    }
    .blue{
        background: #3e5eb3;
    }
    .yellow{
        background: #aa9e5c;
    }
}
</style>
