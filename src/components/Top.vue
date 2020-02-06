<template>
  <div id="page1">
    <div id="items">
      <div id="bgitems">
        <div id="bgtree">
          <Tree :pageWcNum="pageWcNum"></Tree>
        </div>
      </div>
      <div id="infoitems">
        <Info @updated="infoUpdateEvt"></Info>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from './Tree.vue'
import BAY from './BubbleAndYears.vue'
import Info from './Info.vue'
export default {
  components: {
    Tree,
    BAY,
    Info
  },
  data() {
    return {
      pageNum: 0,
      pageWcNum: 0
    }
  },
  methods: {
    infoUpdateEvt: function(value) {
      // Info.vue Update Event
      this.pageWcNum = value
    }
  },
  mounted() {
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
img {
  width: 100%;
}
#page1 {
  width: 100%;
  height: 100%;
}
#items {
  width: 100%;
  height: 100%;
}
#bgitems {
  display: inline-block;
  width: 40%;
  height: 100%;
  overflow-y: scroll;
  float: left;
}
#infoitems {
  display: inline-block;
  width: 60%;
  height: 100%;
  overflow: scroll;
  background-color: #F4F5F7;
}
#bgtree {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100%;
}
#links {
  position: absolute;
  top: 30px;
  left: 30px;
}
</style>
