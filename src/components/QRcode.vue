<template>
  <div id='qr'>
    <a :href="qrnode.toDataURL()" :download='bianhao'>
    <img v-if="qrnode !== null" alt="二维码" title="点击下载二维码图片" :src="qrnode.toDataURL()"></img>
    </a>
	</div>
</template>
<script>
import Qr from 'arale-qrcode'
export default {
  // created: function (){
  //   this.createQr()
  // },
	props: {
    bianhao: {type: String, default:'download', required: false},    
    // 二维码内容，尺寸，背景色，前景色，基点色，logo，logo尺寸
    text: {type: String, required: true},
		size: {type: Number, default:150, required: false},
		bgcolor:{type: String, default:'#fff', required: false},
		fgcolor:{type: String, default:'#000', required: false},
		pgcolor:{type: String, default:'#d09409', required: false},
		image: {type: String, default:'', required: false},
  },
  data () {
    return {
      qrnode: null
    }
  },
  watch:{
    bgcolor:function(){
      this.createQr()
    },
    fgcolor:function(){
      this.createQr()
    },
    pgcolor:function(){
      this.createQr()
    },
    size:function(){
      this.createQr()
    },
  },
  created: function () {
    this.createQr()
  },
  methods:{
    createQr () {
      this.qrnode = new Qr({
        correctLevel: 0,
	      render: 'canvas',
	      text: this.text,
	      size: this.size,
        background: this.bgcolor,
        foreground: this.fgcolor,
	      pdground: this.pgcolor,
      });
    }
  }
}
</script>
