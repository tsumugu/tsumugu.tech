<template>
  <div class="worksThumb" v-on:click="openmenu()">
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
  &__img {
    width: 100%;
    vertical-align:top;
  }
  &__img:hover {
    animation: fadeIn 500ms ease 0s 1 forwards;
  }
  &__title {
    position: absolute;
    bottom: 5%;
    left: 10%;
    font-family: "Shin Go ExLight" !important;
    font-size: 1.2rem;
    color: $white;
    user-select: none;
  }
  &__img:hover + &__title {
    color: $white;
  }
}
@keyframes fadeIn {
    0% {opacity: 1}
    100% {opacity: 0.6}
}
</style>
