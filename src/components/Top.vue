<template>
<div id="top-wrap">
<div id="top-name">Tsumugu Yamaguchi</div>
<div id="top-bg-canvas" ref="canvas"></div>
</div>
</template>

<script>
import Matter from 'matter-js'
export default {
  data: function () {
    return {
      canvas: null,
      dimensions: null
    }
  },
  methods: {
    f(){
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        World = Matter.World,
        Bodies = Matter.Bodies;
    var engine = Engine.create(),
        world = engine.world;
    var render = Render.create({
      element: this.canvas,
      engine: engine,
      options: {
        background: '#FFFFFF',
        wireframes: false
      }
    })
    Render.run(render)
    var runner = Runner.create()
    Runner.run(runner, engine)

    //オブジェクト作成
    var floor = Bodies.rectangle(400, 350, 800, 30, {
      isStatic: true
    })
    var square = Bodies.rectangle(500, 0, 100, 80)
    var circle = Bodies.circle(200, 0, 50)
    World.add(world, [floor, square, circle])
  }
}
</script>

<style scoped>
#top-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
#top-name {
  position: absolute;
}
#top-bg-canvas {
  width: 100%;
  height: 100%;
}
</style>
