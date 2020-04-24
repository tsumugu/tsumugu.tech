<template>
  <div id="edit">
    <div><button v-on:click="goReadme">Edit</button></div>
    <div><input type="text" placeholder="title" v-model="title"></input></div>
    <div><input type="text" placeholder="siteurl" v-model="siteurl"></input></div>
    <div><input type="text" placeholder="thumbnail" v-model="thumbnail"></input></div>
    <div><button v-on:click="save">Save</button><label name="isDispRead"><input type="checkbox" id="isDispRead" v-model="isDispRead">読むボタンを表示</input></label><label name="isDispRead"><input type="checkbox" id="isDispArticle" v-model="isDispArticle">絞り込み時この記事を表示</input></label></div>
    <div><textarea v-model="description">{{description}}</textarea></div>
    <div><textarea v-model="kdwr">{{kdwr}}</textarea></div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      firebaseDoc: null,
      isLogin: false,
      isDispRead: false,
      isDispArticle: true,
      articleId: null,
      title: null,
      siteurl: null,
      thumbnail: null,
      description: null,
      kdwr: null
    }
  },
  methods: {
    save() {
      // Update here
      this.firebaseDoc.set({title: this.title, siteurl: this.siteurl, thumbnail: this.thumbnail, kdwr: this.kdwr, description: this.description, isDispReadButton: this.isDispRead, isDispArticle: this.isDispArticle}, {merge: true})
        .then(() => {
          alert("Succeed!")
        })
        .catch(function(error) {
          alert("Firebase Error")
        })
    },
    goReadme() {
      window.open("http://readme.tsumugu2626.xyz/view/tsumugu-tech/"+this.articleId);
    }
  },
  created() {
    this.articleId = this.$route.params.id
    var _this = this
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        _this.isLogin = true
      }
    })
    // 1. ログインかくにん
    this.firebaseDoc = firebase.firestore().collection('Works').doc(this.articleId)
    this.firebaseDoc.get().then((querySnapshot) => {
      var dataDoc = querySnapshot.data()
      console.log(dataDoc)
      _this.title = dataDoc.title
      _this.description = dataDoc.description
      _this.kdwr = dataDoc.kdwr
      _this.siteurl = dataDoc.siteurl
      _this.thumbnail = dataDoc.thumbnail
      //
      var isDispFlag = false
      var isDispFlagFirebase = dataDoc.isDispReadButton
      if (isDispFlagFirebase !== undefined) {
        isDispFlag = isDispFlagFirebase
      }
      //
      _this.isDispRead = isDispFlag
    })
    .catch(function(error) {
      alert("Firebase Error")
    })
  }
}
</script>

<style scoped>
#edit {
  height: 100%;
}
textarea {
  width: 100%;
}
</style>
