<template>
<div id="top-wrap">
<div id="top-name">Tsumugu Yamaguchi</div>
<div id="top-bg-canvas" ref="canvas"></div>
</div>
</template>

<script>
var Matter = require('matter-js')
require('matter-attractors')
require('matter-wrap')
Matter.use('matter-attractors')
Matter.use('matter-wrap')
var Engine = Matter.Engine,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Bodies = Matter.Bodies

export default {
  data: function () {
    return {
      canvas: null,
      engine: null,
      render: null,
      dimensions: null
    }
  },
  methods: {
    handleResize: function() {
      let dimensions = {};
          dimensions.width  = window.innerWidth;
          dimensions.height = window.innerHeight;
      // Engine.clear(this.engine)
      this.render.canvas.width = window.innerWidth;
      this.render.canvas.height = window.innerHeight;
      this.dimensions = dimensions
    }
  },
  mounted() {
    let dimensions = {}
        dimensions.width  = window.innerWidth
        dimensions.height = window.innerHeight
    this.dimensions = dimensions
    this.canvas = this.$refs.canvas

    this.engine = Engine.create()
    var world = this.engine.world
        world.gravity.scale = 0

    this.render = Render.create({
      element: this.canvas,
      engine: this.engine,
      options: {
        showVelocity: false,
        width: this.dimensions.width,
        height: this.dimensions.height,
        wireframes: false,
        background: 'rgb(240,240,240)'
      }
    })

    var runner = Runner.create()
    Runner.run(runner, this.engine)
    Render.run(this.render)

    var attractiveBody = Bodies.circle(
      this.render.options.width / 2,
      this.render.options.height / 2,
      50,
      {
        isStatic: true,
        plugin: {
          attractors: [
            function(bodyA, bodyB) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                y: (bodyA.position.y - bodyB.position.y) * 1e-6,
              }
            }
          ]
        }
      })

    World.add(world, attractiveBody);
    for (var i = 0; i < 300; i += 1) {
      var body = Bodies.polygon(
        Common.random(0, this.render.options.width),
        Common.random(0, this.render.options.height),
        Common.random(1, 5),
        Common.random() > 0.9 ? Common.random(15, 25) : Common.random(5, 10)
      );
      World.add(world, body);
    }

    var mouse = Mouse.create(this.render.canvas);
    Events.on(this.engine, 'afterUpdate', function() {
      if (!mouse.position.x) {
        return;
      }
      Body.translate(attractiveBody, {
        x: (mouse.position.x - attractiveBody.position.x) * 0.18,
        y: (mouse.position.y - attractiveBody.position.y) * 0.18
      });
    });
    window.addEventListener('resize', this.handleResize)
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
