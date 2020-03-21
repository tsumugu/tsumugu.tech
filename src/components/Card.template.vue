<template>
  <div class="card">
    <div class="tl-item-contents-wrapper">
      <progressive-img class="card-img" v-bind:src="item.thumbnail" />
      <h2 class="card-title">{{item.title}}</h2>
      <p class="card-description" v-html="item.description"></p>
      <p class="card-main-lang">{{item.genle}} ({{item.allLang}})</p>
      <p class="card-kdwr">{{item.kdwr}}</p>
      <div v-show="isDispEdit&&isLogin"><button @click="oepnEdit(item.id)" class="button b-edit">Edit</button></div>
      <div id="card-button-wrapper">
        <button @click="cardButtonEv(item.siteurl, item.id)" class="button b-read" v-bind:class="{ wid50per: item.isDispGotoSiteButton, wid100per: !item.isDispGotoSiteButton }"><font-awesome-icon icon="book-reader" /> 解説を読む</button>
        <button @click="goToSite(item.siteurl)" class="button b-gosite" v-bind:class="{ wid50per: item.isDispGotoSiteButton }" v-show="item.isDispGotoSiteButton"><font-awesome-icon icon="external-link-alt" /> サイトを開く</button>
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
}
</script>
<style scoped>
.card {
  border-radius: 25px;
}
.card-img {
  border-radius: 25px;
}
.card-title {
  margin: 0 5px 0;
}
.card-main-lang {
  display: inline-block;
  padding: 10px;
  border-radius: 25px;
  color: #78a644;
  border: 2px solid #82b349;
  margin: 0;
}
.card-description {
  font-size: large;
  margin: 0px 5px 5px 5px;
}
.card-kdwr {
  margin: 5px;
}
.button {
  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;
}
.b-close {
  height: 35px;
  width: 35px;
  margin-bottom: 10px;
  background-color: #e6e6e6;
}
.b-edit {
}
.b-read {
  margin-top: 10px;
}
.b-read, .b-gosite {
  display: inline-block;
  height: 50px;
  border-radius: 25px;
  background-color: #82b349;
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
