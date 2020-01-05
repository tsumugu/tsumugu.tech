<template>

  <div class="status_bar_wrap">
    <div class="hp_wrap"><span class="hp_inner"></span></div>
    <div class="food_wrap"><div class="food_inner"><div class="niku_mask"><img src="https://tsumugu.tech/images/niku.png" class="niku_img"></div><p>100%</p></div></div>
    <div class="like_wrap"><div class="like_inner"><div class="heart_mask"><img src="https://tsumugu.tech/images/heart.png" class="heart_img"></div><p>100%</p></div></div>
  </div>
</template>

<script>
export default {
  props: {
    hp_num: {
      type: Number,
      default: 100
    },
    food_num: {
      type: Number,
      default: 100
    },
    like_num: { 
      type: Number,
      default: 100
    }
  },
  watch: {
    hp_num() {
      this.draw(this.hp_num, this.food_num, this.like_num)
    },
    food_num() {
      this.draw(this.hp_num, this.food_num, this.like_num)
    },
    like_num() {
      this.draw(this.hp_num, this.food_num, this.like_num)
    }
  },
  methods: {
    draw(hp_num, food_num, like_num) {
    }
  },
  mounted() {
    this.draw(this.hp_num, this.food_num, this.like_num)
  }
}
</script>

<style scoped>
p {
  text-align: center;
  margin: 0;
  padding: 0;
}

.hp_wrap {
  display: inline-block;
  width: 100%;
  height: 30px;
  background-color: white;
}
.hp_inner {
  width: 100%;
  height: 30px;
  display: inline-block;
  background-color: green;
}

.food_wrap {
  display: inline-block;
  color: white;
  background-color: gray;
  margin: 5px 5px 5px;
}
.like_wrap {
  display: inline-block;
  color: white;
  background-color: gray;
  margin: 5px 5px 5px;
}

.food_innner {
  display: inline-block;
}
.like_innner {
  display: inline-block;
}
.niku_mask {
  display: inline-block;
  width:100%;
  height:80px;
  text-align: center;
}
.heart_mask {
  display: inline-block;
  width:100%;
  height:80px;
  text-align: center;
}

.niku_img {
  display: inline-block;
  width:80px;
  height:80px;
}
.heart_img {
  display: inline-block;
  width:80px;
  height:80px;
}
</style>
