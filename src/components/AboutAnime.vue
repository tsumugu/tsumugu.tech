<template>
  <div id="aboutanime">
    <div id="topcontents">
      <div id="topcontents-text" v-bind:class="{ fadein: isFadein }">{{topText}}</div>
    </div>
    <TreeSingle :pageWcNum="pageWcNum" @updated="treeUpdateEvt"></TreeSingle>
  </div>
</template>

<script>
import TreeSingle from './TreeSingle.vue'

export default {
  components: {
    TreeSingle
  },
  props: {
    pageNum: {
      type: Number,
      default: 0
    },
    pageWcNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      topText: 'About',
      isFadein: false
    }
  },
  watch: {
    pageNum: function() {
      if (this.pageNum === 1) {
        // fadein #topcontents-text
        setTimeout(() => {
          this.isFadein = true
        }, 3000)
      }
    }
  },
  methods: {
    treeUpdateEvt: function(value) {
      this.$emit('updated', value)
    }
  }
}
</script>

<style scoped>
* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*::-webkit-scrollbar {
  display:none;
}
#aboutanime {
  width: 100%;
  height: 100%;
}
#topcontents {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
#topcontents-text {
  margin-top: 20px;
  opacity: 0;
  text-align: center;
  font-size: xxx-large;
}
.fadein {
  animation: fadeIn 2000ms ease 0s 1 forwards;
}
@keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
}
</style>
