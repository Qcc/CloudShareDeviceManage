<template>
  <div id="pie"></div>
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
		isCollpase: Boolean,
    charData: Array,
    id: String
  },
  mounted: function () {
   	this.drawChart();       // 第一步想到的是创建的时候更新图表，但是这个不适用于异步请求接口获取相关数据，所以采用下面的监听的方式
	},
  // beforeUpdate: function () {
  //  this.drawChart();
  // },
  watch: {
    charData: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
      if(this.chart){
				this.chart.changeData(val);
			}
    },
		isCollpase:function(val, oldVal){
			if(this.chart){
				this.chart.forceFit();
				console.log(11,this.chart.forceFit);
			}
		}
  },
  methods: {
    drawChart: function (datas) {
      // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
      // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
      this.chart && this.chart.destroy();
      let data = this.charData;
			G2.track(false);
      var Stat = G2.Stat;
      this.chart = new G2.Chart({
        id: 'pie',
        forceFit: true,
        height: '200',
        plotCfg: {
          margin: [25, 5, 25, 5] // 上，右，下，左
        }
    	});
    	this.chart.source(data);
    	// 重要：绘制饼图时，必须声明 theta 坐标系
    	this.chart.coord('theta', {
    	  radius: 0.9 // 设置饼图的大小
    	});
    	this.chart.legend('name', {
    	  position: 'bottom',
    	  itemWrap: true,
    	  formatter: function(val) {
    	    for(var i = 0, len = data.length; i < len; i++) {
    	      var obj = data[i];
    	      if (obj.name === val) {
    	        return val + ': ' + obj.value + '%'; 
    	      }
    	    }
    	  }
    	});
    	this.chart.tooltip({
    	  title: null,
    	  map: {
    	    value: 'value'
    	  }
    	});
    	this.chart.intervalStack()
    	  .position(Stat.summary.percent('value'))
    	  .color('name')
    	  .label('name*..percent',function(name, percent){
    	  percent = (percent * 100).toFixed(2) + '%';
    	  return name + ' ' + percent;
    	});
    	this.chart.render();
    	// 设置默认选中
    	var geom = this.chart.getGeoms()[0]; // 获取所有的图形
    	var items = geom.getData(); // 获取图形对应的数据
    	geom.setSelected(items[1]); // 设置选中
    }
  }
}
</script>
