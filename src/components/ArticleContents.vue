<template>
<div id="article">
  <div id="article-slideshow"><vue-gallery-slideshow :images="imagesList" :index="slideshowindex" @close="slideshowindex = null"></vue-gallery-slideshow></div>
  <div v-if="loading">
  <Loading></Loading>
  </div>
  <div v-if="error">
  NotFound
  </div>
  <div id="article-contents" v-else>
    <div v-show="isDispEdit&&isLogin"><button @click="oepnEdit(cardArticleId)">Edit</button></div>
    <div id="article-contents-body" v-html="body"></div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
var axios = require('axios')
import Loading from './Loading.vue'
import VueGallerySlideshow from 'vue-gallery-slideshow'
export default {
  components: {
    Loading,
    VueGallerySlideshow
  },
  props: {
    cardArticleId: {
      type: String
    },
    isDispEdit: {
      type: Boolean
    },
    isLogin: {
      type: Boolean
    }
  },
  watch: {
    cardArticleId() {
      this.loadArticle(this.cardArticleId)
    }
  },
  data () {
    return {
      loading: true,
      error: false,
      body: null,
      imagesList: [],
      isLogin: false,
      slideshowindex: null
    }
  },
  methods: {
    oepnEdit(articleId) {
      window.open("https://readme.tsumugu2626.xyz/edit/?author=tsumugu-tech&rip="+articleId)
    },
    updateLinkBlank() {
      for (var i=0;i<document.links.length;i++) {
		    var e = document.links[i]
			  e.target = "_blank"
	    }
    },
    addImgtagToList() {
      this.imagesList = []
      this.slideshowindex = null
      var imgtags = document.getElementById("article-contents-body").getElementsByTagName("img")
      var _this = this
      for (var i=0;i<imgtags.length;i++) {
        var tagelm = imgtags[i]
		    var src = tagelm.src
			  this.imagesList.push(src)
        //クリックイベントのためにデータ属性を付与
        tagelm.setAttribute("data-imgindex", i)
        //クリックイベントを設定
        tagelm.addEventListener("click", e => {
          var imgIndex = e.target.getAttribute("data-imgindex")
          _this.slideshowindex = imgIndex
        })
	    }
    },
    loadArticle(articleId) {
      if (articleId == null) {
        return false
      }
      var _this = this
      this.loading = true
      this.error = false
      _this.body = ""
      axios.get('https://tsumugu.tech/getcontent.php?id='+articleId)
      .then(function (response) {
        var post = response.data.posts[0]
        _this.body = post.html
        setTimeout(() => {
          //リンクを別タブ開くように上書き
          _this.updateLinkBlank()
          //画像をスライドショー用の配列にぶち込む
          _this.addImgtagToList()
        }, 500)
      })
      .catch(function (error) {
        _this.error = true
      })
      .then(function () {
        _this.loading = false
      })
      //firebase
      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          _this.isLogin = true
        }
      });
    }
  },
  created () {
    this.loadArticle(this.cardArticleId)
  }
}
</script>

<style scoped>
>>> #article-contents {
  margin: 10px !important;
}
>>> #article-contents-body {
  display: inline-block;
  /* 800pxまでは100%, それより上は800px固定 */
  max-width: 800px;
  width: 100%;
}
>>> p {
  font-size: large;
  margin: 3px 3px 3px;
}
>>> iframe {
  margin: 0 !important;
  max-width: 100%;
  height: 360px;
}
>>> h1,
>>> h2,
>>> h3,
>>> h4,
>>> h5,
>>> h6 {
  margin: 1px 1px 1px !important;
}
>>> hr,
>>> .h1hr {
  border: 1px solid #eaecef;
  margin: 1px 1px 2px;
}
>>> .hhr {
  border: 0.5px solid #eaecef;
  margin: 1px 1px 2px;
}
>>> a {
  width:100%;
}
#article-contents >>> img {
  border: 0.5px solid #eaecef;
  height: auto;
}
@media screen and (min-width: 600px) {
  #article-contents >>> img {
    width: 50%;
  }
}
@media screen and (max-width: 600px) {
  #article-contents >>> img {
    width: 100%;
  }
}
>>> .emojione {
  height: 16px !important;
  width: 16px !important;
  border-style: none !important;
}
>>> .emojione_h1 {
  height: 32px !important;
  width: 32px !important;
  border-style: none !important;
}
>>> .emojione_h2 {
  height: 25px !important;
  width: 25px !important;
  border-style: none !important;
}
>>> .emojione_h3 {
  height: 18px !important;
  width: 18px !important;
  border-style: none !important;
}
>>> .emojione_h4 {
  height: 14px !important;
  width: 14px !important;
  border-style: none !important;
}
>>> .emojione_h5 {
  height: 12px !important;
  width: 12px !important;
  border-style: none !important;
}
>>> .emojione_h6 {
  height: 10px !important;
  width: 10px !important;
  border-style: none !important;
}
>>> code {
  border-radius: 3px;
  margin: 1em 0;
  background-color: #f7f7f7;
  line-height: 0;
}
>>> pre {
  border-radius: 3px;
  border: 0;
  margin: 0;
  padding: .6em 1.2em;
  line-height: 1.2;
  background-color: #f7f7f7;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  word-wrap: normal;
  white-space: pre;
}
>>> blockquote {
  border-left: 5px solid #dddddd;
}
>>> table {
  border-collapse: collapse;
  border: 2px #dddddd solid;
}
>>> td, th {
  border: 1px #dddddd solid;
}
>>> th {
  background-color: #87CEFA;
}
>>> .twitter-color {
  color: #55acee;
}
>>> .com_a {
  color: #55acee;
  text-decoration: none;
}
>>> .emojione {
    height: 1.25em;
    width: 1.25em;
    border: none;
    vertical-align: -.2em;
}
</style>
