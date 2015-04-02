'use strict';

import PIXI from 'pixi.js';
import ScaledObjectGroup from '../ScaledObjectGroup/ScaledObjectGroup.js';
import ArcGraph from '../ArcGraph/ArcGraph.js';

export default class App extends ScaledObjectGroup {

  constructor(...args) {
    super(...args);

    var graph = new ArcGraph();

    graph.position.x = 1920 / 2;
    graph.position.y = 1080 / 2;

    this.addChild(graph)

    console.log('hello world');

  }

}
