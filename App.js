import GlowParticle from './Glowparticle.js';

const COLORS = [
  {r: 244, g: 143, b: 177},   //pink
  {r: 206, g: 146, b: 216},   //purple
  {r: 128, g: 203, b: 196},   //deep green
  {r: 255, g: 171, b: 145},   //coral
  {r: 255, g: 204, b: 128}    //yellow
];

class App{
  constructor(){
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;
    this.totalParticles = 30;
    this.particles = [];
    this.maxRadius = 900;
    this.minRadius = 400;
    window.addEventListener("resize",this.resize.bind(this),false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.ctx.globalCompositeOperation = 'saturation';
    this.createParticles();
  }

  createParticles() {
    let curColor = 0;
    this.particles = [];
    for (let i = 0; i < this.totalParticles; i++){
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        COLORS[curColor]
      );
      if (++curColor >=COLORS.length) {
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
};