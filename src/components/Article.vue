<template>
<div id="article_wrap">
  <ArticleContents :cardArticleId="cardArticleId"></ArticleContents>
</div>
</template>

<script>
import firebase from 'firebase'
import ArticleContents from './ArticleContents.vue'
export default {
  components: {
    ArticleContents
  },
  data: function () {
    return {
      cardArticleId: null
    }
  },
  created() {
    this.cardArticleId = this.$route.params.id
  }
}
</script>

<style scoped>
#article_wrap {
  padding: 10px;
}
</style>
