/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import fieldStyles      from 'components/Field/Field.scss';
import React            from 'react';
import styles           from 'components/Toggle/Toggle.scss';
import baseStyles       from 'stylesheets/base.scss';

export interface Props {
  /** The value of the toggle. */
  value: boolean | string;

  /** Controls the words that appear beside the toggle. Default is ToggleTypes.YES_NO. Other options are ToggleTypes.TRUE_FALSE, ToggleTypes.ON_OFF, ToggleTypes.TWO_WAY or  ToggleTypes.CUSTOM. If using TWO_WAY, supply your own text using optionLeft and optionRight. If using CUSTOM, supply your own text using labelLeft and labelRight, supply your own values using optionLeft and optionRight. */
  type?: ToggleTypes;

  /** The value that is returned when the toggle is on the left side. */
  optionLeft?: string;

  /** The value that is returned when the toggle is on the right side. */
  optionRight?: string;

  /** The callback that is called when the toggle is clicked. */
  onChange: (value: boolean | string) => void;

  /** Custom left toggle label, case when label does not equal content. [For Toggle.Type.CUSTOM] */
  labelLeft?: string;

  /** Custom right toggle label, case when label does not equal content. [For Toggle.Type.CUSTOM] */
  labelRight?: string;

  /** Flag describing is toggle is colored. [For Toggle.Type.CUSTOM] */
  colored?: boolean;


  darkBg?: boolean;

  /** Additional styles to apply to the toggle. */
  additionalStyles?: any;

  switchNoMargin?: boolean;
}

export default class Toggle extends React.Component<Props> {
  toLeft() {
    if (this.props.type === ToggleTypes.TWO_WAY || this.props.type === ToggleTypes.CUSTOM) {
      this.props.onChange(this.props.optionLeft);
    } else {
      this.props.onChange(false);
    }
  }

  toRight() {
    if (this.props.type === ToggleTypes.TWO_WAY || this.props.type === ToggleTypes.CUSTOM) {
      this.props.onChange(this.props.optionRight);
    } else {
      this.props.onChange(true);
    }
  }

  toggle() {
    if (this.props.type === ToggleTypes.TWO_WAY || this.props.type === ToggleTypes.CUSTOM) {
      if (this.props.value === this.props.optionLeft) {
        this.props.onChange(this.props.optionRight);
      } else {
        this.props.onChange(this.props.optionLeft);
      }
    } else {
      this.props.onChange(!this.props.value);
    }
  }

  render() {
    let type = this.props.type;
    let labelLeft = '';
    let labelRight = '';
    let colored = false;
    let left = false;
    switch (type) {
      case ToggleTypes.ON_OFF:
        labelLeft = 'Off';
        labelRight = 'On';
        colored = true;
        left = !this.props.value;
        break;
      case ToggleTypes.TRUE_FALSE:
        labelLeft = 'False';
        labelRight = 'True';
        colored = true;
        left = !this.props.value;
        break;
      case ToggleTypes.TWO_WAY:
        if (!this.props.optionLeft || !this.props.optionRight) {
          throw new Error(
            'TWO_WAY toggle must provide optionLeft and optionRight props.'
          );
        }
        labelLeft = this.props.optionLeft;
        labelRight = this.props.optionRight;
        left = this.props.value === labelLeft;
        break;
      case ToggleTypes.CUSTOM:
        if (!this.props.optionLeft || !this.props.optionRight || !this.props.labelLeft || !this.props.labelRight) {
          throw new Error(
            'CUSTOM toggle must provide optionLeft, optionRight, labelLeft, and labelRight props.'
          );
        }
        labelLeft = this.props.labelLeft;
        labelRight = this.props.labelRight;
        left = this.props.value === this.props.optionLeft;
        colored = this.props.colored;
        break;
      case ToggleTypes.HIDE_LABELS:
        colored = true;
        left = !this.props.value;
        break;
      default:
        labelLeft = 'No';
        labelRight = 'Yes';
        colored = true;
        left = !this.props.value;
        break;
    }

    let switchClasses = [styles.switch];
    if (colored) {
      switchClasses.push(styles.colored);
    }
    if (this.props.switchNoMargin) {
      switchClasses.push(styles.switchNoMargin);
    }
    let toggleClasses = [styles.toggle, baseStyles.unselectable, fieldStyles.input];
    if (left) {
      toggleClasses.push(styles.left);
    }
    if (this.props.darkBg) {
      toggleClasses.push(styles.darkBg);
    }
    return (
      <div className={toggleClasses.join(' ')} style={this.props.additionalStyles || {}}>
        {labelLeft && <span className={styles.label} onClick={this.toLeft.bind(this)}>{labelLeft}</span>}
        <span className={switchClasses.join(' ')} onClick={this.toggle.bind(this)}></span>
        {labelRight && <span className={styles.label} onClick={this.toRight.bind(this)}>{labelRight}</span>}
      </div>
    );
  }
}

export enum ToggleTypes {
  YES_NO = 1,
  TRUE_FALSE = 2,
  ON_OFF = 3,
  TWO_WAY = 4,
  CUSTOM = 5,
  HIDE_LABELS = 6,
};
