<template>
  <div class="page1">
    <div class="bgtree">
      <div class="links">
        <router-link to="/works-php">WorksPHP</router-link>
        <router-link to="/works-others">WorksOthers</router-link>
        <span>{{ scrollY }}</span>
      </div>
      <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/main_tree_noanim.png">
    </div>
  </div>
</template>

<script>
/*
export default {
  data() {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    scrollY: 0,
    scrollYPer: 0
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },
  methods: {
    handleScroll: function() {
        this.scrollY = window.scrollY;
        this.scrollYPer = this.scrollY/this.windowHeight;
    },
    handleResize: function() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    }
  }
}
*/
export default {
  data: {
    scrollY: 0
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
        this.scrollY = window.scrollY;
    }
  }
}
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
