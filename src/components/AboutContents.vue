<template>
<div id="Bubble_wrap">
  <div v-if="aboutLoading">Loading</div>
  <div v-else>
    <div id="years">
      <div class="year year-margin"><div class="year-circle year-text year-padding">{{year}}</div></div>
      <div class="year mandd-margin"><div class="year-circle year-text mandd-padding" v-html="mpd"></div></div>
      <p id="mes" v-html="mes"></p>
    </div>
    <div id="imgAndDes">
      <div id="imgWrap"><progressive-img v-bind:src="imgUrl" /></div>
      <div id="desWrap" v-show="!isPresenMode"><p v-html="des"></p></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    pageNumMinus2: {
      type: Number,
      default: 0
    },
    mesArr: {
      type: Array,
      default: []
    },
    aboutLoading: {
      type: Boolean,
      default: true
    },
    isPresenMode: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      mes: '',
      imgUrl: '',
      des: '',
      year: 2000,
      mpd: '',
      month: 1,
      day: 1
    }
  },
  watch: {
    pageNumMinus2() {
      this.draw(this.pageNumMinus2)
    }
  },
  methods: {
    setInfo(index) {
      var infoDic = this.mesArr[index]
      this.mes = infoDic['title']
      this.year = infoDic['year']
      this.month = infoDic['month']
      this.day = infoDic['day']
      var mpdTxt = ''
      if (this.day !== null) {
        mpdTxt = this.month+' / '+this.day
      } else {
        // 日付が指定されている時と横幅をそろえるため前後にスペースを挿入
        mpdTxt = '&nbsp;&nbsp;'+this.month+'&nbsp;&nbsp;'
      }
      this.mpd = mpdTxt
      this.imgUrl = infoDic['imgUrl']
      this.des = infoDic['des']
    },
    draw(pageNumMinus2) {
      //console.log(pageNumMinus2)
      if (pageNumMinus2 >= 0) {
        this.setInfo(pageNumMinus2)
      }
    }
  },
  mounted() {
    this.setInfo(0)
  }
}
</script>

<style scoped>
* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*::-webkit-scrollbar {
  display:none;
}
p {
  margin: 0;
  padding: 0;
}
#Bubble_wrap {
  width: 100%;
}
#mes, #years, .year {
  display: table-cell;
  vertical-align: middle;
}
#mes {
  font-size: x-large;
  padding-left: 10px;
}
#imgAndDes {
  margin-top: 10px;
}
#imgWrap > img {
  width: 100%;
  border-radius: 10px;
}
#imgWrap {
  margin-right: 10px
}
#desWrap > p {
  border-radius: 10px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #9699a0;
  font-size: large;
}
@media (max-width: 3000px) and (min-width: 600px) {
  #Bubble_wrap {
    padding: 10px 10px 10px 10px;
  }
  #imgWrap {
    float: left;
    width: 60%;
    margin-right: 10px
  }
  #desWrap {
    float: left;
    width: 33%;
  }
  #desWrap > p {
    display: inline-block;
  }
}
@media (max-width: 600px) {
  #Bubble_wrap {
    padding: 0;
  }
  #years {
    padding: 10px 10px 0px 10px;
  }
  #imgWrap, #desWrap {
    width: 100%;
  }
  #desWrap > p {
    width: 92%;
    margin: auto;
  }
}
.year-text {
  display: table-cell;
  text-align: center;
	vertical-align: middle;
  font-size: x-large;
}
.year-circle {
  border-radius: 50px;
}
.year-padding {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.year-margin {
}
.mandd-padding {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.mandd-margin {
}
</style>
