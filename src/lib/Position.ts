/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
export default class Position {
  constructor(public x = 0, public y = 0) {
  }

  transform(x: number, y: number) {
    return new Position(this.x + x, this.y + y);
  }

  static inDocument(node: HTMLElement) {
    let pos = Position.inWindow(node);
    pos.x += window.pageXOffset;
    pos.y += window.pageYOffset;
    return pos;
  }

  static inWindow(node: HTMLElement) {
    let rect = node.getBoundingClientRect();
    return new Position(rect.left, rect.top);
  }
}
