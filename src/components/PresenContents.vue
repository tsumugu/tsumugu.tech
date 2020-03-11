<template>
<div id="Bubble_wrap">
  <div v-if="isLoading">Loading</div>
  <div v-else>
    <div id="years">
      <div class="year year-margin"><div class="year-circle year-text year-padding">{{year}}</div></div>
      <div class="year mandd-margin"><div class="year-circle year-text mandd-padding" v-html="mpd"></div></div>
      <p id="mes" v-html="mes"></p>
    </div>
    <div id="imgAndDes">
      <div id="imgWrap"><progressive-img v-bind:src="imgUrl" /></div>
    </div>
  </div>
</div>
</template>

<script>
var firebase = require('firebase')
export default {
  props: {
    pageNum: {
      type: Number
    }
  },
  data: function () {
    return {
      mes: '',
      mesArr: [],
      mesArrLength: 0,
      worksArr: [],
      worksArrLength: 0,
      readArr: null,
      imgUrl: '',
      des: '',
      year: 2000,
      mpd: '',
      month: 1,
      day: 1,
      isLoading: true
    }
  },
  watch: {
    pageNum() {
      this.draw(this.pageNum)
    }
  },
  methods: {
    setInfo(arr, index) {
      var infoDic = arr[index]
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
    draw(pageNum) {
      if (pageNum > 0) {
        var pn = pageNum
        if (pageNum > this.mesArrLength) {
          this.readArr = this.worksArr
          pn = pn-this.mesArrLength
        }
        console.log(pn+"/"+this.readArr.length)
        this.setInfo(this.readArr, pn)
      }
    }
  },
  mounted() {
    var _this = this
    this.readArr = this.mesArr
    //
    var getAbout = new Promise(function(resolve, reject) {
      firebase.firestore().collection('about').orderBy("year", "asc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = {
            'id': doc.id,
            'title': doc.data().title,
            'des': doc.data().des,
            'imgUrl': doc.data().imgUrl,
            'year': doc.data().year,
            'month': doc.data().month,
            'day': doc.data().day
          }
          _this.mesArr.push(data)
        })
        resolve();
      })
      .catch(function(error) {
        reject();
      })
    })
    // Works
    var getWorks = new Promise(function(resolve, reject) {
      firebase.firestore().collection('Works').orderBy("madeYear", "asc").orderBy("madeMonth", "asc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = {
            'id': doc.id,
            'title': doc.data().title,
            'des': doc.data().description,
            'imgUrl': doc.data().thumbnail,
            'year': doc.data().madeYear,
            'month': doc.data().madeMonth,
            'day': null
          }
          _this.worksArr.push(data)
        })
        resolve();
      })
      .catch(function(error) {
        reject();
      })
    })
    Promise.all([getAbout, getWorks]).then(function () {
      _this.setInfo(_this.readArr, 0)
      _this.mesArrLength = _this.mesArr.length
      _this.worksArrLength = _this.worksArr.length
      _this.isLoading = false
    }).catch(function () {
      alert('データの取得に失敗しました');
    });
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
>>> h1,
>>> h2 {
  margin: 1px 1px 1px !important;
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
#imgWrap {
  width: 100%;
}
#imgWrap > img {
  width: 100%;
  border-radius: 10px;
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
