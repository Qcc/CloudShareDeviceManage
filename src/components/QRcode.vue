<template>
  <div id='qr'>
    <img v-if="qrnode !== null" :src="qrnode.toDataURL()"></img>
	</div>
</template>
<script>
import Qr from 'arale-qrcode'
export default {
  // created: function (){
  //   this.createQr()
  // },
	props: {
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
	      // correctLevel: 0,
	      // render: 'canvas',
	      // text: this.text,
	      // size: this.size,
	      // background: this.bgcolor,
	      // foreground: this.fgcolor,
	      // pdground: this.pgcolor,
	      // image : this.image,
	      // imageSize : Math.ceil(this.size * 0.21)
      });
    }
  }
}
</script>
