<template>
  <div>
    <mymyBreadcrumb :paramsPathValOne="'数据统计'" :paramsPathValTwo="'数据报表'"></mymyBreadcrumb>
    <el-card>
      <div id="main" style="width: 1600px;height:700px;"></div>
    </el-card>
  </div>
</template>

<script>
import mymyBreadcrumb from '@/components/Breadcrumb'
import * as echarts from 'echarts'
import reportsAPI from '@/api/reports.js'
import _ from 'lodash'

export default {
  data() {
    return {
      options: {
        title: {
          text: '周淑怡'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  components: {
    mymyBreadcrumb
  },
  created() {},
  // 此时dom渲染完毕
  async mounted() {
    var myChart = echarts.init(document.getElementById('main'))

    const { data: res } = await reportsAPI.reports()

    const result = _.merge(this.option, res.data)

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(result)
  },
  methods: {}
}
</script>

<style lang='less' scoped>
</style>
