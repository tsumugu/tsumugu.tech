<template>
  <div class="worksThumb">
    <img class="worksThumb__img" v-bind:src="item.thumbnail">
    <p class="worksThumb__title">{{item.name}}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    cardButtonEv(siteUrl, articleId) {
      this.$emit('cardButtonEv', {"siteUrl": siteUrl, "articleId": articleId})
    }
  }
}
</script>
<style lang="scss" scoped>
.worksThumb {
  position: relative;
  max-width: 760px;
  background-color: $img-mouseover-bg;
  &__img {
    width: 100%;
  }
  &__img:hover {
    opacity: 0.6;
  }
  &__title {
    position: absolute;
    bottom: 5%;
    left: 10%;
    font-family: "Shin Go ExLight" !important;
    font-size: 1.5rem;
  }
  &__img:hover + &__title {
    color: $white;
  }
}
</style>
