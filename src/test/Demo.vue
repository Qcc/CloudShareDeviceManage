<template>
<div>
  <div class="use-content">
    <g2-line :charData="lineData"></g2-line>
  </div>
  <div class="crd-content">
    <g2-pie :charData="sectorData"></g2-pie>
  </div>
  <div class="crd-content">
    <g2-bar :charData="barData"></g2-bar>
  </div>
</div>
</template>
<script>
import G2Line from '../components/chart/G2line'
import G2Pie from '../components/chart/G2pie'
import G2Bar from '../components/chart/G2bar'
  export default {
    data() {
      return {
        lineData:[{month: 'Jan', temperature: 7.0},
        {month: 'Feb', temperature: 6.9},
        {month: 'Mar', temperature: 9.5},
        {month: 'Apr', temperature: 14.5},
        {month: 'May', temperature: 18.2},
        {month: 'Jun', temperature: 21.5},
        {month: 'Jul', temperature: 25.2},
        {month: 'Aug', temperature: 26.5},
        {month: 'Sep', temperature: 23.3},
        {month: 'Oct', temperature: 18.3},
        {month: 'Nov', temperature: 13.9},
        {month: 'Dec', temperature: 9.6}],
        // 饼图
      sectorData:[
        {name: 'IE', value: 56.33 },
        {name: 'Chrome', value: 24.03},
        {name: 'Firefox', value: 10.38},
        {name: 'Safari',  value: 4.77},
        {name: 'Opera', value: 0.91},
        {name: 'Pu', value: 0.2}],
      // 柱状图
      barData:[
        {name: 'Tokyo',data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]},
        {name: 'New York',data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]},
        {name: 'London',data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]},
        {name: 'Berlin',data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]}]
      };
    },
  components:{
    G2Line,
    G2Pie,
    G2Bar 
  }
  }
</script>