<template>
  <div>
    <div><button v-on:click="goReadme">Edit</button></div>
    <div><input type="text" v-model="title"></input></div>
    <div><button v-on:click="save">Save</button><label name="isDispRead"><input type="checkbox" id="isDispRead" v-model="isDispRead">読むボタンを表示</input></label></div>
    <div><textarea v-model="description">{{description}}</textarea></div>
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
      articleId: null,
      title: null,
      description: null
    }
  },
  methods: {
    save() {
      // Update here
      this.firebaseDoc.set({title: this.title, description: this.description, isDispReadButton: this.isDispRead}, {merge: true})
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
textarea {
  width: 100%;
  height: 10000px;
}
</style>
