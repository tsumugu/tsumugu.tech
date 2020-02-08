<template>
<div id="timeline">
  <div v-if="loading">
  Loading
  </div>

  <div id="tl-wrap" v-else>
    <div id="left-line"></div>
    <div id="tl-items">
      <div class="tl-item" v-for="(item, key) in items" :key="key">
        <!-- Year -->
        <div class="year" v-bind:class="{ hide: !item.isTitle }">
          <div class="year-circle"></div>
          <div class="year-text">{{item.madeYear}}</div>
        </div>
        <!-- Left Line -->
        <div class="card-left" v-bind:class="{ hide: item.isTitle }">
          <div class="card-left-circle"></div>
          <div class="card-left-line"></div>
        </div>
        <!-- Card -->
        <div class="card" v-bind:class="{ hide: item.isTitle }">
          <a :href="item.siteurl">
            <img class="card-img" :src="item.thumbnail">
            <h2>{{item.title}}</h2>
            <p>{{item.mainLang}} ( {{item.allLang}} )</p>
            <p>{{item.madeYear}}</p>
            <p>{{item.description}}</p>
            <p>{{item.kdwr}}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      db: null,
      loading: true,
      items: []
    }
  },
  created () {
    this.db = firebase.firestore()
    var _this = this
    this.db.collection('Works').orderBy("madeYear", "asc").get().then((querySnapshot) => {
      _this.items = []
      _this.loading = false
      var before_madeYear = 0
      querySnapshot.forEach((doc) => {
        var now_madeYear = doc.data().madeYear
        if (before_madeYear !== now_madeYear) {
          _this.items.push({
            'madeYear': doc.data().madeYear,
            'isTitle': true
          })
        }
        let data = {
          'id': doc.id,
          'thumbnail': doc.data().thumbnail,
          'title': doc.data().title,
          'siteurl': doc.data().siteurl,
          'description': doc.data().description,
          'mainLang': doc.data().mainLang,
          'allLang': doc.data().allLang,
          'madeYear': doc.data().madeYear,
          'kdwr': doc.data().kdwr,
          'isTitle': false
        }
        _this.items.push(data)
        before_madeYear = now_madeYear
      })
    })
  }
}
</script>

<style scoped>
h1, h2, p {
  margin: 5px;
}
img {
  width: 70%;
}
a {
 color: #2c3e50;
 text-decoration: none;
}
.show {
  display: block !important;
}
.hide {
  display: none !important;
}
#timeline {
  width: 100%;
  height: 10000px;
}
#tl-wrap {
  position: relative;
  width: 100%;
  height: 10000px;
}
#left-line {
  display: inline-block;
  width: 15px;
  height: 10000px;
  margin-top: 5px;
  margin-left: 17px;
  float: left;
  background-color: orange;
}
#tl-items {
  position: absolute;
  width: 100%;
}
.card {
  margin: 10px;
  margin-left: 60px;
  padding: 10px;
  background-color: #fcfcfc;
  border: 1px solid #000000;
  border-radius: 25px;
}
.card-img {
  border: 1px solid #c7c7c7;
  border-radius: 10px;
}
.card-left-circle {
  position: absolute;
  width: 27px;
  height: 27px;
  margin-top: 23px;
  margin-left: 11px;
  background-color: white;
  border-radius: 50px;
}
.card-left-line {
  width: 40px;
  height: 14px;
  float: left;
  margin-top: 30px;
  margin-left: 20px;
  background-color: pink;
}
.year {
}
.year-text {
	vertical-align: middle;
  display: inline-block;
  font-size: x-large;
}
.year-circle {
	vertical-align: middle;
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50px;
}
</style>
