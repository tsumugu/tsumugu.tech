<template>
<div class="cat_div">
  <div class="status_bar"><CatStatusBars :hp_num="hp_num" :food_num="food_num" :like_num="like_num"></div>
  <div class="cat_room"><CatRoom :img_type="img_type"></div>
  <!--
  <p><input type="range" min="0" max="100" v-model.number="hp_num"></p>
  <p><input type="range" min="0" max="100" v-model.number="food_num"></p>
  <p><input type="range" min="0" max="100" v-model.number="like_num"></p>
  -->
<div>
</template>

<script>
import CatStatusBars from './CatStatusBars.vue'
import CatRoom from './CatRoom.vue'
export default {
  components: {
    CatStatusBars,
    CatRoom
  },
  data() {
    return {
      hp_num: 100,
      food_num: 100,
      like_num: 100,
      img_type: "run_cat_smile"
    }
  }
}
</script>

<style>
.cat_div {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.status_bar {
  display: inline-block;
  width: 100%;
  background-color: gray;
}
.cat_room {
  width: 100%;
  height: 100%;
}
</style>
