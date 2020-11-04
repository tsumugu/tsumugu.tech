<template>
  <div class="worksThumb" v-on:click="openmenu()">
    <div class="worksThumb__cover"></div>
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
    openmenu() {
      this.$emit('openmenu', null)
    }
  }
}
</script>
<style lang="scss" scoped>
.worksThumb {
  position: relative;
  max-width: 760px;
  background-color: $img-mouseover-bg;
  cursor: pointer;
  text-align:center;
  &__cover {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
  }
  &__img {
    width: 100%;
    vertical-align:top;
  }
  &__cover:hover + &__img {
    animation: fadeIn 500ms ease 0s 1 forwards;
  }
  &__title {
    position: absolute;
    z-index: 2;
    bottom: 5%;
    left: 10%;
    font-family: "Shin Go ExLight" !important;
    font-size: 1.2rem;
    color: $white;
    user-select: none;
    text-shadow:  2px  2px 10px $text-shadow,
              -2px  2px 10px $text-shadow,
               2px -2px 10px $text-shadow,
              -2px -2px 10px $text-shadow;
  }
}
@keyframes fadeIn {
    0% {opacity: 1}
    100% {opacity: 0.4}
}
</style>
