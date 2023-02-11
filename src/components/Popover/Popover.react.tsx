/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import hasAncestor      from 'lib/hasAncestor';
import React            from 'react';
import styles           from 'components/Popover/Popover.scss';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  position?: { x: number; y: number };
  fixed?: boolean;
  modal?: boolean;
  fadeIn?: boolean;
  color?: string;
  parentContentId?: string;
  contentId?: string;
  onExternalClick?: (e: MouseEvent) => void;
}

// We use this component to proxy the current tree's context
// (React Router history and ParseApp) to the new tree
export default class Popover extends React.Component<Props> {
  private popoverLayer = document.createElement('div');
  private popoverWrapper: HTMLDivElement;
  constructor(props) {
    super(props);
    this._checkExternalClick = this._checkExternalClick.bind(this);
  }

  componentDidUpdate(prevState) {
    if (this.props.position !== prevState.position) {
      this.popoverLayer.style.left = this.props.position.x + 'px';
      this.popoverLayer.style.top = this.props.position.y + 'px';
    }
  }

  componentDidMount() {
    if (!this.popoverWrapper) {
      this.popoverWrapper = document.createElement('div');
      document.body.appendChild(this.popoverWrapper);
    }

    let wrapperStyle = this.props.fixed
      ? styles.fixed_wrapper
      : styles.popover_wrapper;

    this.popoverWrapper.className = wrapperStyle;
    this.popoverWrapper.appendChild(this.popoverLayer);

    if (this.props.position) {
      this.popoverLayer.style.left = this.props.position.x + 'px';
      this.popoverLayer.style.top = this.props.position.y + 'px';
    }
    if (this.props.modal) {
      this.popoverLayer.style.right = '0';
      this.popoverLayer.style.bottom = '0';
    }
    if (this.props.color) {
      this.popoverLayer.style.background = this.props.color;
    }
    if (this.props.fadeIn) {
      this.popoverLayer.className = styles.transition;
    }

    if (this.props.parentContentId) {
      this.popoverLayer.dataset.parentContentId = this.props.parentContentId;
    }

    document.body.addEventListener('click', this._checkExternalClick);
  }

  setPosition(position) {
    this.popoverLayer.style.left = position.x + 'px';
    this.popoverLayer.style.top = position.y + 'px';
    this.forceUpdate();
  }

  componentWillUnmount() {
    document.body.removeChild(this.popoverWrapper);
    document.body.removeEventListener('click', this._checkExternalClick);
  }

  _checkExternalClick(e) {
    const { contentId } = this.props;
    const popoverWrapper = contentId
      ? document.getElementById(contentId)
      : this.popoverLayer;
    const isChromeDropdown = e.target.parentNode.classList.contains('chromeDropdown');
    if (
      !hasAncestor(e.target, popoverWrapper, contentId) &&
      this.props.onExternalClick &&
      !isChromeDropdown
    ) {
      this.props.onExternalClick(e);
    }
  }

  render() {
    return createPortal(this.props.children, this.popoverLayer);
  }
}
