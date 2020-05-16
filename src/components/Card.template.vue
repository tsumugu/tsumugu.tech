<template>
  <div class="card" v-bind:id="item.id">
    <div class="tl-item-contents-wrapper">
      <progressive-img class="card-img" v-bind:src="item.thumbnail" />
      <h2 class="card-title">{{item.title}}</h2>
      <p class="card-description" v-show="item.description!=''" v-html="item.description"></p>
      <div class="card-tags">
        <div class="card-tags-wrap-border" v-show="item.problem!=''||item.targetUser!=''||item.solution!=''">
          <div v-bind:class="{ cardTagsWrapTaishoKadai: item.targetUser!=''&&item.problem!='' }">
            <div class="card-tags-wrap card-tags-green-border" v-show="item.targetUser!=''"><p class="card-tags-title card-tags-green-title card-tags-green-bgcolor">対象 <font-awesome-icon icon="user" /></p><p class="card-tags-val card-tags-green-val">{{item.targetUser}}</p></div>
            <div class="card-tags-wrap card-tags-green-border" v-show="item.problem!=''"><p class="card-tags-title card-tags-green-title card-tags-green-bgcolor">課題 <font-awesome-icon icon="sad-tear" /></p><p class="card-tags-val card-tags-green-val">{{item.problem}}</p></div>
          </div>
          <div class="card-tags-green-arrow" v-show="item.solution!=''" v-bind:class="{ cardTagsArrowMargin: item.targetUser!=''&&item.problem!='' }"><font-awesome-icon icon="arrow-down" size="lg" /></div>
          <div class="card-tags-wrap card-tags-green-border" v-show="item.solution!=''"><p class="card-tags-title card-tags-green-title card-tags-green-bgcolor">解決 <font-awesome-icon icon="grin-beam" /></p><p class="card-tags-val card-tags-green-val">{{item.solution}}</p></div>
        </div>
        <div class="card-tags-wrap card-tags-green-border" v-show="item.whatLearned!=''"><p class="card-tags-title card-tags-green-bgcolor">学習 <font-awesome-icon icon="school" /></p><p class="card-tags-val">{{item.whatLearned}}</p></div>
        <div class="card-tags-wrap" v-show="item.genle!=''"><p class="card-tags-title">環境 <font-awesome-icon icon="mobile-alt" /></p><p class="card-tags-val">{{item.genle}}</p></div>
        <div class="card-tags-wrap" v-show="item.allLang!=''"><p class="card-tags-title">言語 <font-awesome-icon icon="code" /></p><p class="card-tags-val">{{item.allLang}}</p></div>
      </div>
      <p class="card-kdwr" v-show="item.kdwr!=''&&item.kdwr!=null">{{item.kdwr}}</p>
      <div v-show="isDispEdit&&isLogin"><button @click="oepnEdit(item.id)" class="button b-edit">Edit</button></div>
      <div id="card-button-wrapper">
        <button @click="cardButtonEv(item.siteurl, item.id)" class="button b-read wid50per" v-bind:disabled="!item.isDispReadButton"><font-awesome-icon icon="book-reader" /> 詳しく読む</button>
        <button @click="goToSite(item.siteurl)" class="button b-gosite wid50per" v-bind:disabled="!item.isDispGotoSiteButton"><font-awesome-icon icon="external-link-alt" /> サイトを開く</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    isDispEdit: {
      type: Boolean
    },
    isLogin: {
      type: Boolean
    }
  },
  methods: {
    cardButtonEv(siteUrl, articleId) {
      this.$emit('cardButtonEv', {"siteUrl": siteUrl, "articleId": articleId})
    },
    goToSite(siteUrl) {
      this.$emit('goToSite', siteUrl)
    },
    oepnEdit(articleId) {
      this.$emit('oepnEdit', articleId)
    }
  }
}
</script>
<style scoped>
.card {
  border-radius: 25px;
  padding: 15px 10px 15px 10px;
  box-shadow: 0 0 5px 3px rgba(204, 204, 204, 0.2);
  overflow: scroll;
}
.card-img {
  border-radius: 25px;
  z-index: 1;
}
.card-title {
  margin: 0 5px 0;
}
.card-description {
  font-size: large;
  margin: 0px 5px 0px 5px;
}
.card-kdwr {
  margin: 5px;
}
.card-tags {
  display: grid;
  gap: 5px;
  margin-top: 5px;
}
.cardTagsWrapTaishoKadai {
  display: grid;
  gap: 5px;
  grid-template-columns: 0.5fr 0.5fr;
}
.card-tags-wrap-border {
  padding: 10px;
  border: 2px solid #94cf55;
  border-radius: 25px;
}
.card-tags-wrap {
  border: 2px solid #60bece;
  border-radius: 25px;
}
.card-tags-title {
  display: inline-block;
  width: 80px;
  margin: 0;
  padding: 10px;
  color: white;
  background-color: #60bece;
  border-radius: 18px 0 0 18px;
  opacity: 0.75;
  text-align: center;
}
.card-tags-val {
  display: inline-block;
  width: calc(100% - 120px);
  margin: 0;
  padding: 10px;
}
/* green */
.card-tags-green-border {
  border-color: #94cf55 !important;
}
.card-tags-green-bgcolor {
  background-color:#97cf57 !important;
}
.card-tags-green-arrow {
  margin: 5px;
  text-align: center;
  color: #7fb349;
}
.cardTagsArrowMargin {
  margin: 0 !important;
  margin-bottom: 5px !important;
}
.card-tags-green-title {
  display: block !important;
  width: auto !important;
  padding: 5px !important;
  border-radius: 18px 18px 0 0 !important;
}
.card-tags-green-val {
  display: block !important;
  width: auto !important;
  text-align: center !important;
}
.button {
  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;
}
.button:disabled {
  opacity: 0.3;
  cursor: default;
}
.b-close {
  height: 35px;
  width: 35px;
  margin-bottom: 10px;
  background-color: #e6e6e6;
}
.b-gosite, .b-read {
  margin-top: 10px;
}
.b-read, .b-gosite {
  display: inline-block;
  height: 50px;
  border-radius: 25px;
  background-color: #60bece;
  color: white;
  font-size: large;
}
.wid50per {
  width: 49%;
}
.wid100per {
  width: 100%;
}
</style>
