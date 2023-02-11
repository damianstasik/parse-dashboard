/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import React     from 'react';
import styles    from 'components/Tooltip/Tooltip.scss';

interface Props {
  /** The tooltip text. */
  value: React.ReactNode;

  /** The content that should reveal a tooltip when hovered. */
  children: React.ReactNode;
}

let Tooltip = ({ value, children }: Props) => {
  return (
    <div className={styles.tooltipWrap}>
      {children}
      <div className={styles.tooltip}>
        <div className={styles.tooltipContent}>
          {value}
        </div>
        <div className={styles.callout1} />
        <div className={styles.callout2} />
      </div>
    </div>
  );
};

export default Tooltip;
