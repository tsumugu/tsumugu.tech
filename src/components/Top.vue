<template>
  <div class="page1">
    <div class="bgtree">
      <div class="links">
        <router-link to="/works-php">WorksPHP</router-link>
        <router-link to="/works-others">WorksOthers</router-link>
        <!-- debug panel start -->
        <div class="debug">
          <input type="range" min="0" max="100" v-model.number="deg">
        </div>
        <!-- debug panel end -->
      </div>
      <Tree :deg="deg"></Tree>
    </div>
  </div>
</template>

<script>
import Tree from './Tree.vue'
export default {
  components: {
    Tree
  },
  data() {
    return {
      deg: 0
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
