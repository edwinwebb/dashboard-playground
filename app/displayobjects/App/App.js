'use strict';

import PIXI from 'pixi.js';
import ScaledObjectGroup from '../ScaledObjectGroup/ScaledObjectGroup.js';
import LabeledArcGraph from '../LabeledArcGraph/LabeledArcGraph.js';

export default class App extends ScaledObjectGroup {

  constructor(...args) {
    super(...args);

    var graph = new LabeledArcGraph(1,99);
    var graph2 = new LabeledArcGraph(1,99);
    var graph3 = new LabeledArcGraph(1,99);
    var test = new PIXI.Graphics();

    graph.position.x = (1920 / 2) - 405;
    graph2.position.x = (1920 / 2) - 105;
    graph3.position.x = (1920 / 2) + 205;

    graph.position.y = (1080 / 2) - 105;
    graph2.position.y = (1080 / 2) - 105;
    graph3.position.y = (1080 / 2) - 105;

    test.beginFill(0xFF0000);
    test.drawRect(0,0,5,5);
    test.drawRect(1915,0,5,5);
    test.drawRect(1915,1075,5,5);
    test.drawRect(0,1075,5,5);
    test.drawRect(1918/2,1078/2, 5, 5);
    test.endFill();

    this.addChild(graph);
    this.addChild(graph2);
    this.addChild(graph3);
    //this.addChild(test);

    setInterval(function() {
      graph.setNumber(Math.random()*100)
      graph2.setNumber(Math.random()*100)
      graph3.setNumber(Math.random()*100)
    }, 2000);

    graph.setNumber(50);
    graph2.setNumber(50);
    graph3.setNumber(50);

    graph.setLabel('OTHER VALUES');
    graph2.setLabel('BASIC GRAPHER');
    graph3.setLabel('GLOW EFFECTS');

  }

}
