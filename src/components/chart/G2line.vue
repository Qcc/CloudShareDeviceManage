<template>
  <div id="line"></div>
</template>
<script>
import G2 from 'g2'
export default {
  data () {
      return {
        chart: null,
        second: 1000,
        minute: 1000 * 60,
        hour: 60 * this.minute,
        day: 24 * this.hour,
      };
    },
    props: {
      data: Array,
      dash: Array,      
      width:Number,
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
        console.log('new: %s, old: %s', val, oldVal);
        if(this.chart){
					this.chart.changeData(val);
				}
      },
      width: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
        console.log('new: %s, old: %s', val, oldVal);
        if(this.chart){
					this.drawChart();
				}
      }
    },
    methods: {
      toInterge (number, fix = 1) {
        if (Math.round(number) === number) {
          return `${number}`;
        }
        return `${Number(number).toFixed(fix)}`;
      },
      humanizeDuration(duration, fix = 1) {
        if (duration === 0) {
          return 0;
        }
      
        if (duration < this.minute) {
          return `${this.toInterge(duration / this.second, fix)} 秒`;
        }
      
        if (duration < this.hour) {
          return `${this.toInterge(duration / this.minute, fix)} 分`;
        }
      
        if (duration < this.day) {
          return `${this.toInterge(duration / this.hour, fix)} 小时`;
        }
      
        return `${this.toInterge(duration / this.hour / 24, fix)} 天`;
      },
      pick(data, field) {
        return data.map(item => {
          const result = {};
          for (const key in item) {
            if (item.hasOwnProperty(key) && field.indexOf(key) !== -1) {
              result[key] = item[key];
            }
          }
          return result;
        });
      },
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

        this.chart.axis('date', {
          title: false,
        });

        var scale = {
          date: {
            alias: '日期',
            type: 'time',
            mask: 'mm-dd',
          },
          pv: {
            alias: '收款金额',
            min: 0,
          },
          time: {
            alias: '使用人次',
            formatter: value => this.humanizeDuration(value, 0),
          },
          count: {
            alias: '次数',
          },
        };

        var view1 = this.chart.createView();
        view1.source(this.pick(this.data, [ 'pv', 'time', 'date' ]), scale);
        view1.line().position('date*pv*count').color('#4FAAEB').size(2);
        view1.line().position('date*time').color('#9AD681').size(2);

        var view2 = this.chart.createView();
        view2.source(this.pick(this.dash, [ 'pv', 'time', 'date' ]), scale);
        view2.col('time', {
          alias: ' '
        });
        view2.axis('time', false);
        view2.tooltip(false);
        view2.line().position('date*time').color('white').size(3).style({
          lineDash: [ 4, 4 ]
        });
        this.chart.render();
      }
    }
}
</script>
