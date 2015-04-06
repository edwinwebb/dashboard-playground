'use strict';

import PIXI from 'pixi.js';
import TWEEN from 'tween.js';
import GRAD from './gradient.jpg';

var options = {
  barSize : 1,
  lineWidth : 20,
  tweenLength : 1000,
  blurFactor : 20,
  radius : 100,
  percent : 100
}

const BAR_START = (Math.PI * 2) * .4;
const BAR_END = (Math.PI * 2) * 1.1;

export default class ArcGraph extends PIXI.DisplayObjectContainer {

  /**
   * ArcGraph
   * @param  {...[type]} args 
   * @return {null}
   */
  constructor(...args) {

    super(...args);

    // Add all our globals
    this.tween = new TWEEN.Tween(this);
    this.gradTexture = new PIXI.Texture.fromImage(GRAD);
    this.blurFilter = new PIXI.BlurFilter();
    this.bg = this.addBackground();
    this.grad = this.addGradient();
    this.grad2 = this.addGradient();
    this.bar = new PIXI.Graphics();

    // add assets to stage
    this.addChild(this.bg);
    this.addChild(this.bar);
    this.addChild(this.grad);
    this.addChild(this.grad2);

    // First masked gradient
    this.grad.filters = [this.blurFilter];
    this.grad.mask = this.bar;

    // Second masked gradient
    this.grad2.blendMode = PIXI.blendModes.ADD;
    this.grad2.mask = this.bar;

    // Start an animation
    this.percent = .3;
    this.setPercent(options.percent);

  }

  /**
   * Set graph in %
   * @param {number} perc 0-100
   */
  setPercent(perc) {
  	this.setDecimal(perc/100);
  }

  /**
   * Set graph as .
   * @param {number} decimal 0-100
   */
  setDecimal(decimal) {

    if(decimal > 1) {
      decimal = 1;
    }

    this.tween.to({percent: decimal}, options.tweenLength);

    this.tween.onUpdate(this.drawArc.bind(this));

    this.tween.start();
  }

  /**
   * Get a gradient sprite
   */
  addGradient() {
    var grad = new PIXI.Sprite(this.gradTexture);

    grad.width = options.radius * 2 + options.blurFactor * 2;
    grad.height = options.radius * 2 + options.blurFactor * 2;
    grad.position = new PIXI.Point(-options.blurFactor / 2, -options.blurFactor / 2)

    return grad;
  }

  /**
   * Get a background graphics
   */
  addBackground() {
  	var bg = new PIXI.Graphics();
    
    var cy = options.radius + options.lineWidth / 2;
    var cx = cy;

  	bg.lineStyle(options.lineWidth, 0x000000);
	  bg.drawCircle(cx, cy, options.radius);
	  bg.lineStyle(options.lineWidth, 0x444444);
	  bg.arc(cx,cy,options.radius, BAR_START, BAR_END, true);

    return bg;

  }

  /**
   * Update a graphics
   * @return {null}
   */
  drawArc() {

    var angle = ((BAR_END - BAR_START) * this.percent) + BAR_START;
    var blurDescale = .7;
    var cy = options.radius + options.lineWidth / 2;
    var cx = cy;

  	this.bar.clear();
  	this.bar.lineStyle(options.lineWidth, 0xFF00FF);
    // Move to origin
    this.bar.moveTo(options.radius * Math.cos(BAR_START) + cx, options.radius * Math.sin(BAR_START) + cy);
    //this.bar.lineTo(options.radius * Math.cos(angle) + cx, options.radius * Math.sin(angle) + cy);

    this.bar.arc(cx, cy, options.radius, BAR_START, angle, false);

    // descale blur to prevent blue clipping
    this.blurFilter.blurX = (options.blurFactor * blurDescale) * this.percent;
    this.blurFilter.blurY = (options.blurFactor * blurDescale) * this.percent;

  }

}
