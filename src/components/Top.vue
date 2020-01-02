<template>
  <div class="page1">
    <div class="bgtree">
      <div class="links">
        <router-link to="/works-php">WorksPHP</router-link>
        <router-link to="/works-others">WorksOthers</router-link>
      </div>
      <tree></tree>
    </div>
  </div>
</template>

<script>
Vue.component('tree', {
  data: function () {
    return {
      scrollY: 0
    }
  },
  template: '<span>{{ scrollY }}</span><img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/main_tree_noanim.png">',
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll:function() {
        this.scrollY = window.scrollY;
    }
  }
})
</script>

<style scoped>
img {
  width: 100%;
}
.bgtree {
  position: relative;
  width: 100%;
}
.links {
  position: absolute;
  top: 30px;
  left: 30px;
}
</style>
