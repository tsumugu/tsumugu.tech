<template>
<div id="article_wrap">
  <div v-if="!isLoading">
    <div v-if="isCardExist">
      <Card :item="item" :isDispEdit=false :isLogin=false :isLimit=true></Card>
      <ArticleContents v-show="item.isDispReadButton" :cardArticleId="cardArticleId"></ArticleContents>
      <div v-show="!item.isDispReadButton" v-html="item.description"></div>
    </div>
    <div v-else>
      Article Not Found
    </div>
  </div>
  <div v-else>
    <Loading/>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import ArticleContents from './ArticleContents.vue'
import Card from './Card.template.vue'
import Loading from './Loading.vue'
export default {
  components: {
    ArticleContents,
    Card,
    Loading
  },
  data: function () {
    return {
      cardArticleId: null,
      item: null,
      isCardExist: false,
      isLoading: true
    }
  },
  created() {
    this.cardArticleId = this.$route.params.id
    var _this = this
    firebase.firestore().collection('Works').doc(this.cardArticleId).get().then((doc) => {
      _this.isCardExist = doc.exists
      if (_this.isCardExist) {
        var isDispRead = doc.data().isDispReadButton==undefined ? true : doc.data().isDispReadButton
        var whatLearned = (doc.data().whatLearned === undefined || doc.data().whatLearned == null || doc.data().whatLearned == "") ? '' : doc.data().whatLearned
        var solution = (doc.data().solution === undefined || doc.data().solution == null || doc.data().solution == "") ? '' : doc.data().solution
        var problem = (doc.data().problem === undefined || doc.data().problem == null || doc.data().problem == "") ? '' : doc.data().problem
        var targetUser = (doc.data().targetUser === undefined || doc.data().targetUser == null || doc.data().targetUser == "") ? '' : doc.data().targetUser
        var docVal = {
          'id': doc.id,
          'thumbnail': doc.data().thumbnail,
          'title': doc.data().title,
          'siteurl': doc.data().siteurl,
          'description': doc.data().description,
          'whatLearned': whatLearned,
          'solution': solution,
          'problem': problem,
          'targetUser': targetUser,
          'genle': doc.data().genle,
          'allLang': doc.data().allLang,
          'madeYear': doc.data().madeYear,
          'madeMonth': doc.data().madeMonth,
          'kdwr': doc.data().kdwr,
          'isShow': true,
          'isDispGotoSiteButton': (doc.data().siteurl !== null),
          'isDispArticle': doc.data().isDispArticle,
          'isDispReadButton': isDispRead
        }
        _this.item = docVal
      }
      _this.isLoading = false
    })
    .catch(function(error) {
      //onError
      console.log(error)
      alert("情報の取得に失敗しました。再読み込みしてください")
    })
  }
}
</script>

<style lang="scss" scoped>
#article_wrap {
  height: 100%;
  background-color: $works-background;
  padding: 10px;
}
</style>
