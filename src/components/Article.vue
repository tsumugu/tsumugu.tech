<template>
<div id="article">
  <div v-if="loading">
  Loading
  </div>
  <div v-if="error">
  NotFound
  </div>
  <div id="contents" v-else>
    <h1 id="title" v-html="title"></h1>
    <hr>
    <div id="body" v-html="body"></div>
  </div>
</div>
</template>

<script>
var firebase = require('firebase')
const axios = require('axios')

export default {
  data () {
    return {
      loading: true,
      error: false,
      title: null,
      body: null
    }
  },
  created () {
    var _this = this
    // 5e53df0067592a243bee3c2d
    axios.get('https://tsumugu.tech/getcontent.php?id='+this.$route.params.id)
    .then(function (response) {
      var post = response.data.posts[0]
      _this.title = post.title
      _this.body = post.html
    })
    .catch(function (error) {
      _this.error = true
    })
    .then(function () {
      _this.loading = false
    })
  }
}
</script>
<style scoped>
</style>
