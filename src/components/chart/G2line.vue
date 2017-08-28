<template>
  <div id="line"></div>
</template>
<script>
import G2 from 'g2'
export default {
  data () {
      return {
        chart: null,
      };
    },
    props: {
      data: Array,
      isCollpase: Boolean
    },
    mounted: function () {
     this.drawChart();       // 第一步想到的是创建的时候更新图表，但是这个不适用于异步请求接口获取相关数据，所以采用下面的监听的方式
    },
    watch: {
      data: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
        if(this.chart){
          this.chart.changeData(val);
				}
      },
      isCollpase:function(val, oldVal){
			  if(this.chart){
			  	this.chart.forceFit();
			  }
		  }
    },
    methods: {
      drawChart (datas) {
        // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
        // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
        this.chart && this.chart.destroy();
        this.chart = new G2.Chart({
          id: 'line',
          forceFit: true,
          height: 320,
          plotCfg: {
            margin: [ 25, 70, 60, 55 ],
          },
        });

        this.chart.legend({
          mode: false,
          position: 'bottom',
          dy: 5,
        });

        this.chart.axis('days', {
          title: false,
        });

        var scale = {
          days: {
            alias: '日期',
            type: 'time',
            mask: 'mm-dd',
          },
          count: {
            alias: '使用人次',
          },
          money: {
            alias: '消费金额(元)',
            type:'pow',
          },
        };
        this.chart.source(this.data, scale);
        this.chart.line().shape('smooth').position('days*count').color('#4FAAEB').size(2);
        this.chart.line().shape('smooth').position('days*money').color('#9AD681').size(2);
        this.chart.render();
      }
    }
}
</script>
