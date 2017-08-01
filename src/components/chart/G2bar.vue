<template>
  <div id="bar"></div>
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
        for(var i=0; i < data.length; i++) {
          var item = data[i];
          var datas = item.data;
          var months = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
          for(var j=0; j < datas.length; j++) {
            item[months[j]] = datas[j];
          }
          data[i] = item;
        }
        var Stat = G2.Stat;
        var Frame = G2.Frame;
        var frame = new Frame(data);
        frame = Frame.combinColumns(frame, ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'],'月均降雨量','月份','name');
        this.chart = new G2.Chart({
          id: 'bar',
          forceFit: true,
          height : 190,
          plotCfg: {
            margin: [20,90,60,60]
          }
        });
        this.chart.source(frame);
        this.chart.col('name',{alias: '城市'});
        this.chart.intervalDodge().position('月份*月均降雨量').color('name');
        this.chart.render();
      }
    }
}
</script>
