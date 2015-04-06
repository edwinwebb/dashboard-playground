import PIXI from 'pixi.js';
import ArcGraph from '../ArcGraph/ArcGraph.js';
import TWEEN from 'tween.js';

var min = 0;
var max = 1;
var fromToDigits = {
  from: 0,
  to : 100
}

var labelStyle = {
  fill : '#99ff00',
  align : 'center',
  font : 'bold 30px Helvetica'
}

var digitStyle = {
  fill : '#99ff00',
  align : 'center',
  font : 'bold 90px Helvetica'
}

export default class LabeledArcGraph extends PIXI.DisplayObjectContainer {
  constructor(mi, ma) {
    this.graph = new ArcGraph();
    this.label = new PIXI.Text('UP AND DOWN', labelStyle);
    this.digits = new PIXI.Text('5', digitStyle);

    this.digits.position.y = 55;
    this.digits.position.x = 55;

    this.label.position.y = 240;
    this.label.position.x = 30;
    this.label.width = 200;

    min = mi || min;
    max = ma || max;

    super();

    // this.blurFilter = new PIXI.BlurFilter();
    // this.blurFilter.blurX = 2;
    // this.blurFilter.blurY = 2;
    // this.digits.filters = [this.blurFilter];

    this.addChild(this.graph);
    this.addChild(this.label);
    this.addChild(this.digits);

    this.oldDigit = 0;
    this.tween = new TWEEN.Tween(fromToDigits);

    this.setNumber(this.oldDigit);

  }

  setLabel(label) {
    this.label.setText(label);
  }

  setDigit(digit) {
    var d = digit;



    if(digit > 1) {
      d = Math.round(digit);
    }

    if(digit < 10) {
      d = new String("0" + d);
    }

    d = new String(d);

    if (d.length > 3) {
      d = d.slice(0,3);
    }

    this.digits.setText(d);
  }

  tweenHanlder() {
    this.setDigit(fromToDigits.to);
  }

  setNumber(n) {
    if(n < min) n = min;
    if(n > max) n = max;

    this.graph.setDecimal((n + min) / max);
    this.setDigit(n);

    this.tween.to({to: n}, 1000);

    this.tween.onUpdate(this.tweenHanlder.bind(this));

    this.tween.start();
  }
}