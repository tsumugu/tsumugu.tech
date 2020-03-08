<template>
<div id="article">
  <div v-if="loading">
  Loading
  </div>
  <div v-if="error">
  NotFound
  </div>
  <div id="article-contents" v-else>
    <progressive-img class="profile-img" v-bind:src="profileUrl" />
    <div id="article-contents-body" v-html="body" />
  </div>
</div>
</template>

<script>
var axios = require('axios')

export default {
  data () {
    return {
      loading: true,
      error: false,
      profileUrl: null,
      body: null,
      isLogin: false
    }
  },
  methods: {
    loadArticle(articleId) {
      var _this = this
      axios.get('https://tsumugu.tech/getcontent.php?id='+articleId)
      .then(function (response) {
        var post = response.data.posts[0]
        console.log(post)
        _this.profileUrl = post.summary.join('/')
        _this.body = post.html
      })
      .catch(function (error) {
        _this.error = true
      })
      .then(function () {
        _this.loading = false
      })
    }
  },
  created () {
    this.loadArticle("aG59wLtmrgwDD77Exsqu")
  }
}
</script>
<style scoped>
</style>
