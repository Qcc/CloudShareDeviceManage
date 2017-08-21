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
      data: Array,
      isCollpase: Boolean
    },
    mounted: function () {
     this.drawChart();       // 第一步想到的是创建的时候更新图表，但是这个不适用于异步请求接口获取相关数据，所以采用下面的监听的方式
    },
    watch: {
      charData: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
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
      drawChart: function (datas) {
        // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
        // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
        this.chart && this.chart.destroy();
        let data = this.data;
        for(var i=0; i < data.length; i++) {
          var item = data[i];
          var datas = item.data;
          var months = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'];
          for(var j=0; j < datas.length; j++) {
            item[months[j]] = datas[j];
          }
          data[i] = item;
        }
        var Stat = G2.Stat;
        var Frame = G2.Frame;
        var frame = new Frame(data);
        frame = Frame.combinColumns(frame, ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],'注册会员','周','name');
        this.chart = new G2.Chart({
          id: 'bar',
          forceFit: true,
          height : 190,
          plotCfg: {
            margin: [5, 76, 25, 60]
          }
        });
        this.chart.source(frame);
        this.chart.col('name',{alias: '会员'});
        this.chart.intervalDodge().position('周*注册会员').color('name');
        this.chart.render();
      }
    }
}
</script>
