/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import fieldStyles  from 'components/Field/Field.scss';
import React        from 'react';
import styles       from 'components/Label/Label.scss';

interface Props {
  /** The main text/node of the label. */
  text: React.ReactNode;

  /** The secondary text/node of the label. */
  description?: React.ReactNode;

  /** Allows you to override the left-right padding of the label. */
  padding?: number;
}

let Label = (props: Props) => {
  let padding = (props.padding || 20) + 'px';
  return (
    <div
      className={[styles.label, fieldStyles.centered].join(' ')}
      style={{ padding: '0 ' + padding }}>
      <div className={styles.text}>{props.text}</div>
      {props.description ? <div className={styles.description}>{props.description}</div> : null}
    </div>
  );
};

export default Label;
