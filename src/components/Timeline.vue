<template>
<div id="Info_wrap">
  <TimelineContents></TimelineContents>
</div>
</template>

<script>
import TimelineContents from './TimelineContents.vue'
export default {
  components: {
    TimelineContents
  },
  data: function () {
    return {
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
#Info_wrap {
  width: 100%;
  height: 10000px;
  overflow-x: hide;
}
</style>
