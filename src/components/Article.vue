<template>
<div id="article">
  <div v-if="loading">
  Loading
  </div>
  <div v-if="error">
  NotFound
  </div>
  <div id="contents" v-else>
    <p><a v-bind:href="writeUrl" v-show="isLogin">edit</a></p>
    <div id="body" v-html="body"></div>
  </div>
</div>
</template>

<script>
var firebase = require('firebase')
var axios = require('axios')

export default {
  data () {
    return {
      loading: true,
      error: false,
      body: null,
      isLogin: false,
      writeUrl: null
    }
  },
  created () {
    var _this = this
    axios.get('https://tsumugu.tech/getcontent.php?id='+this.$route.params.id)
    .then(function (response) {
      var post = response.data.posts[0]
      _this.body = post.html
    })
    .catch(function (error) {
      _this.error = true
    })
    .then(function () {
      _this.loading = false
    })
    this.writeUrl = "http://readme.tsumugu2626.xyz/view/tsumugu-tech/"+this.$route.params.id
    //firebase
    firebase.auth().onAuthStateChanged((user) => {
      _this.isLogin = user
    });
  }
}
</script>
<style scoped>
</style>
