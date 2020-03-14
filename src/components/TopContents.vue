<template>
  <div id="top-wrap">
    <div id="top-main-wrap">
      <div id="top-bgcolor"></div>
      <div id="top-bg-img" v-bind:style="{ backgroundImage: 'url(' + image + ')' }"></div>
      <div id="top-name">Tsumugu Yamaguchi</div>
      <div id="top-cover"><input type="file" id="files" name="files[]" multiple /></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null
    }
  },
  methods: {
    handleFileSelect(evt) {
      var files = evt.target.files;
      var _this = this
      for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
          continue
        }
        var reader = new FileReader()
        reader.onload = (function(theFile) {
          return function(e) {
            _this.image = e.target.result
          };
        })(f)
        reader.readAsDataURL(f)
      }
    }
  },
  mounted() {
    document.getElementById('files').addEventListener('change', this.handleFileSelect, false)
  }
}
</script>

<style scoped>
#top-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
#top-bgcolor {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgb(240, 240, 240);
}
#top-bg-img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;

  background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/TOPPC-RSZD.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center top;
}

#top-name {
  position: absolute;

  top: 50%;
  margin-left: 20px;
  text-align: left;
  /*
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  */
  color: #ffffff;
  font-size: xxx-large;
  z-index: 3;
}
#top-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;
}
/* SP */
@media screen and (max-width:600px) {
  #top-bg-img {
    background-image: url("https://tsumugu.s3-ap-northeast-1.amazonaws.com/1242_2688.jpg");
    background-position: center center
  }
  #top-name {
    top: 10%;
    margin-left: 20px;
    text-align: left;
  }
}
</style>
