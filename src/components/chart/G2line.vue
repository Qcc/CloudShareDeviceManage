<template>
  <div id="line"></div>
</template>
<script>
import G2 from 'g2'
export default {
  data () {
      return {
        chart: null
      };
    },
    props: {
      charData: Array,
      id: String
    },
    mounted: function () {
     this.drawChart();       // 第一步想到的是创建的时候更新图表，但是这个不适用于异步请求接口获取相关数据，所以采用下面的监听的方式
    },
    beforeUpdate: function () {
     this.drawChart();
    },
    watch: {
      charData: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
        console.log('new: %s, old: %s', val, oldVal);
        this.drawChart(val);
      }
    },
    methods: {
      drawChart: function (datas) {
        // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
        // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
        this.chart && this.chart.destroy();
        let data = this.charData;
        this.chart = new G2.Chart({
          id: 'line',
          forceFit: true,
          height: 310
        });
        this.chart.source(data, {
          month: {
            alias: '月份',
            range: [0, 1]
          },
          temperature: {
            alias: '平均温度(°C)'
          }
        });
        this.chart.line().position('month*temperature').size(2);
        this.chart.render();
      }
    }
}
</script>
