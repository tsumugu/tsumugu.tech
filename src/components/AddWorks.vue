<template>
<div>
サムネイルURL: <input v-model="thumbnail"><br>
サイトURL: <input v-model="siteurl"><br>
タイトル: <input v-model="title"><br>
メイン言語:<input v-model="mainLang"><br>
すべての言語: <input v-model="allLang"><br>
制作年: <input v-model="madeYear"><br>
説明: <textarea v-model="description"></textarea><br>
こだわり: <textarea v-model="kdwr"></textarea>
<button v-on:click="submit">Submit</button>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      col: null,
      thumbnail: null,
      title: null,
      siteurl: null,
      description: null,
      mainLang: null,
      allLang: null,
      madeYear: null,
      kdwr: null
    }
  },
  methods: {
    submit: function (event) {
      var _this = this
      this.col.add({
        'thumbnail': this.thumbnail,
        'title': this.title,
        'siteurl': this.siteurl,
        'description': this.description,
        'mainLang': this.mainLang,
        'allLang': this.allLang,
        'madeYear': this.madeYear,
        'kdwr': this.kdwr
      })
      .then(doc => {
        alert("succeed!!")
        _this.thumbnail = ''
        _this.title = ''
        _this.siteurl = ''
        _this.description = ''
        _this.mainLang = ''
        _this.allLang = ''
        _this.kdwr = ''
      })
      .catch(error => {
      })
    }
  },
  created () {
    this.col = firebase.firestore().collection('Works')
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
</style>
