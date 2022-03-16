'use strict';
import GlowParticle from './Glowparticle.js';

const COLORS = [
  {r: 255, g: 205, b: 210},   //pink
  {r: 224, g: 190, b: 231},   //purple
  {r: 197, g: 203, b: 232},   //skyblue
  {r: 232, g: 245, b: 233},   //mint
  {r: 255, g: 243, b: 224}    //yellow
];

class App {
  constructor(){
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

    this.totalParticles = 15;
    this.particles = [];
    this.maxRadius = 900;
    this.minradius = 400;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize(){
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio; //pixelRatio
    this.canvas.height = this.stageHeight * this.pixelRatio; //pixelRatio
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.globalCompositeOperation = 'saturation'

    this.createParticles();
  }

  createParticles(){
    let curColor = 0;
    this.particles = [];

    for (let i = 0; i < this.totalParticles; i++){
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minradius,
        COLORS[curColor]
      );
      if(++curColor >= COLORS.length){
        curColor = 0;
      }
      this.particles[i] = item;
    }
  }

  animate(t){
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

    for (let i =0; i < this.totalParticles; i++) {
      const item = this.particles[i];
      item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  }
}


window.onload = () => {
  new App();
}