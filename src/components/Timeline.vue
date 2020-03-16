<template>
<div id="Info_wrap">
  <TimelineContents ref="TimelineContents"></TimelineContents>
</div>
</template>

<script>
import firebase from 'firebase'
import TimelineContents from './TimelineContents.vue'
export default {
  components: {
    TimelineContents
  },
  data: function () {
    return {
      count_data: [],
      langs: [],
      colors: [],
      lang_color: [],
      gData: {
        labels: this.langs,
        datasets: [
          {
            data: this.count_data,
            backgroundColor: this.colors
          }
        ]
      }
    }
  },
  methods: {
  },
  created () {
    /* #1 change lang theme -> #2 is in Works.vue */
    // var theme = "none"

    this.db = firebase.firestore()
    var _this = this
    this.db.collection('languages').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // var color_code = doc.data()[theme]
        var color_code = "#ffffff"
        _this.count_data.push(10)
        _this.langs.push(doc.id)
        _this.colors.push(color_code)
        _this.lang_color[doc.id] = color_code
      })
      _this.$set(_this.gData, 'labels', _this.langs)
      _this.$set(_this.gData, 'datasets', [{data: _this.count_data, backgroundColor: _this.colors}])
      _this.$refs.TimelineContents.drawTL(_this.lang_color)
    })
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
#Info_wrap {
  width: 100%;
  height: 10000px;
  overflow-x: hide;
}
</style>
