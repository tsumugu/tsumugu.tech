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
        world.gravity.y = 0
        world.gravity.x = 0
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

    var attractiveBody = Bodies.circle(
      this.render.options.width / 2,
      this.render.options.height / 2,
      (Math.max(dimensions.width / 4, dimensions.height / 4)) / 2,
      {
        render: {
          fillStyle: `rgb(0,0,0,0)`,
          strokeStyle: `rgb(0,0,0,0)`,
          lineWidth: 0
        },
        isStatic: true,
        plugin: {
          attractors: [
            function(bodyA, bodyB) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                y: (bodyA.position.y - bodyB.position.y) * 1e-6,
              };
            }
          ]
        }
      });

    World.add(world, attractiveBody);
        // add some bodies that to be attracted
        for (var i = 0; i < 60; i += 1) {
          let x = Common.random(0, this.render.options.width);
          let y = Common.random(0, this.render.options.height);
          let s = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
          let poligonNumber= Common.random(3, 6);
          var body = Bodies.polygon(
            x,y,
            poligonNumber,
            s,

            {
              mass: s / 20,
              friction: 0,
              frictionAir: 0.02,
              angle: Math.round(Math.random() * 360),
              render: {
                fillStyle: '#FFFFFF',
                strokeStyle: `#DDDDDD`,
                lineWidth: 2
              }
            }
          );

          World.add(world, body);


          let r = Common.random(0,1)
          var circle = Bodies.circle(x, y, Common.random(2, 8), {
                mass: 0.1,
                friction: 0,
                frictionAir: 0.01,
                render: {
                fillStyle: '#FFFFFF',
                strokeStyle: `#DDDDDD`,
                lineWidth: 2
                }
              });
          World.add(world, circle);

          var circle = Bodies.circle(x, y, Common.random(2, 20), {
                mass: 6,
                friction: 0,
                frictionAir: 0,
                render: {
                fillStyle: '#FFFFFF',
                strokeStyle: `#DDDDDD`,
                lineWidth: 2
                }
              });
          World.add(world, circle);

          var circle = Bodies.circle(x, y, Common.random(2, 30), {
                mass: 0.2,
                friction: 0.6,
                frictionAir: 0.8,
                render: {
                  fillStyle: `rgb(240,240,240)`,
                  strokeStyle: `#FFFFFF`,
                  lineWidth: 3}
              });
          World.add(world, circle);
        }

        // add mouse control
        var mouse = Mouse.create(this.render.canvas);
        Events.on(this.engine, 'afterUpdate', function() {
            if (!mouse.position.x) return;
            // smoothly move the attractor body towards the mouse
            Body.translate(attractiveBody, {
                x: (mouse.position.x - attractiveBody.position.x) * 0.12,
                y: (mouse.position.y - attractiveBody.position.y) * 0.12
            });
        });

        Runner.run(runner, this.engine);
        Render.run(this.render);
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
