<template>
<div>
サイトURL: <input v-model="siteurl"><br>
サムネイルURL: <input v-model="thumbnail"><br>
タイトル: <input v-model="title"><br>
説明:<br>
<textarea v-model="description"></textarea><br>
こだわり:<br>
<textarea v-model="kdwr"></textarea><br>
ジャンル: <div><input type="radio" id="one" value="web" v-model="genle"><label for="one">Web</label><br>
<input type="radio" id="two" value="iOS" v-model="genle"><label for="two">iOS</label><br>
<input type="radio" id="seven" value="Android" v-model="genle"><label for="seven">Android</label><br>
<input type="radio" id="eight" value="Unity" v-model="genle"><label for="eight">Unity</label><br>
<input type="radio" id="three" value="マイコン" v-model="genle"><label for="three">マイコン</label><br>
<input type="radio" id="four" value="Bot" v-model="genle"><label for="four">Bot</label><br>
<input type="radio" id="five" value="openFrameworks" v-model="genle"><label for="five">openFrameworks</label><br>
<input type="radio" id="six" value="Other" v-model="genle"><label for="six">Other</label><br>
</div>
制作年: <input v-model="madeYear"><br>
制作月: <input v-model="madeMonth"><br>
すべての言語: <input v-model="allLang"><br>
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
      genle: null,
      allLang: null,
      madeYear: null,
      madeMonth: null,
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
        'genle': this.genle,
        'allLang': this.allLang,
        'madeYear': Number(this.madeYear),
        'madeMonth': Number(this.madeMonth),
        'kdwr': this.kdwr
      })
      .then(doc => {
        alert("succeed!! ID->"+doc.id)
        var result = confirm("Do you want to write this ID's article?");
        if(result) {
          window.location = "http://readme.tsumugu2626.xyz/edit/?title="+doc.id;
        }
        _this.thumbnail = ''
        _this.title = ''
        _this.siteurl = ''
        _this.description = ''
        _this.genle = ''
        _this.allLang = ''
        _this.madeYear = ''
        _this.madeMonth = ''
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
