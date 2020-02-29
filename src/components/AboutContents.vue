<template>
<div id="Bubble_wrap">
  <div id="years">
    <div class="year year-margin"><div class="year-circle year-text year-padding">{{year}}</div></div>
    <div class="year mandd-margin"><div class="year-circle year-text mandd-padding">{{mpd}}</div></div>
  </div>
  <p id="mes">{{mes}}</p>
</div>
</template>

<script>
export default {
  props: {
    pageNumMinus2: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      mes: '',
      year: 2000,
      mpd: '',
      month: 1,
      day: 1,
      mes_arr: [
        {
          'title': '生まれる',
          'des': null,
          'year': 2003,
          'month': 1,
          'day': 5
        },
        {
          'title': '小学校入学前',
          'des': null,
          'year': 2005,
          'month': 1,
          'day': null
        },
        {
          'title': '小学校入学',
          'des': null,
          'year': 2009,
          'month': 4,
          'day': null
        },
        {
          'title': '小3',
          'des': '初PC',
          'year': 2011,
          'month': 4,
          'day': null
        },
        {
          'title': '小6',
          'des': 'ハッカー',
          'year': 2014,
          'month': 8,
          'day': null
        },
        {
          'title': '中1',
          'des': 'プログラミングスクール',
          'year': 2015,
          'month': 8,
          'day': null
        }
      ]
    }
  },
  watch: {
    pageNumMinus2() {
      this.draw(this.pageNumMinus2)
    }
  },
  methods: {
    setInfo(index) {
      var infoDic = this.mes_arr[index]
      this.mes = infoDic['title']
      this.year = infoDic['year']
      this.month = infoDic['month']
      this.day = infoDic['day']
      var mpdTxt = ''
      if (this.day !== null) {
        mpdTxt = this.month+' / '+this.day
      } else {
        mpdTxt = this.month
      }
      this.mpd = mpdTxt
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
  margin: 10px;
}
#mes, #years, .year {
  display: table-cell;
  vertical-align: middle;
}
#mes {
  font-size: x-large;
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
