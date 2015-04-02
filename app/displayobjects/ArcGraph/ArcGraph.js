'use strict';

import PIXI from 'pixi.js';
import TWEEN from 'tween.js';
import GRAD from './gradient.jpg';

export default class ArcGraph extends PIXI.DisplayObjectContainer {

  constructor(...args) {

    super(...args);

    this.percent = 0;
  	this.rotation = Math.PI * .7; // easier than doing math in drawArc => moveto (but also buggered things up)
  	this.pivot = new PIXI.Point(.5, .5);
    this.lineWidth = 12;

    this.blurFilter = new PIXI.BlurFilter();
    this.bar = new PIXI.Graphics();
    this.tween = new TWEEN.Tween(this);
    this.grad = this.addGradient();
    this.grad2 = this.addGradient();

    this.addBackground();

    this.blurFilter.blurX = 20;
    this.blurFilter.blurY = 20;

    this.addChild(this.grad);
    this.addChild(this.grad2);
    this.addChild(this.bar);

    this.grad.filters = [this.blurFilter];
    this.grad.mask = this.bar;
    this.grad2.mask = this.bar;

    this.setDecimal(1);

    window.test = this;

  }

  setPercent(perc) {
  	this.setDecimal(perc/100);
  }

  setDecimal(decimal) {

    if(decimal > 1) {
      decimal = 1;
    }

    this.tween.to({percent: decimal}, 1000);

    this.tween.onUpdate(this.drawArc.bind(this));

    this.tween.start();
  }

  addGradient() {

    this.gradTexture = new PIXI.Texture.fromImage(GRAD);
    var grad = new PIXI.Sprite(this.gradTexture);
    grad.pivot = new PIXI.Point(240, 240);
    grad.rotation = Math.PI * -.7;
    grad.width = 240;
    grad.height = 240;
    grad.position = new PIXI.Point(-15, 20);

    return grad;
  }

  addBackground() {
  	var bg = new PIXI.Graphics();

  	bg.lineStyle(this.lineWidth, 0x000000);
	  bg.drawCircle(0, 0, 100);
	  bg.lineStyle(this.lineWidth, 0x444444);
	  bg.arc(0,0,100, (Math.PI * 2) * .8, 0,  false);

    this.addChild(bg);

  }

  drawArc() {
    var angle = (Math.PI * 1.6) * this.percent;

  	this.bar.clear();
  	this.bar.moveTo(100,0); // move to origin to avoid extra lines, needs to be positioned properly
    //console.log(100 * Math.cos(angle), 100 * Math.sin(angle));
  	this.bar.lineStyle(this.lineWidth, 0xFF00FF);
    this.bar.arc(0, 0, 100,
    	0,
    	angle
    );

    this.blurFilter.blurX = (15 * this.percent) + 5;
    this.blurFilter.blurY = (15 * this.percent) + 5;

  }

}
