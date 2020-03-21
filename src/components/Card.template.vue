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
</style>
