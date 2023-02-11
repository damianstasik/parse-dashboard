/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import React     from 'react';
import styles    from 'components/FlowFooter/FlowFooter.scss';

interface Props {
  /** A primary action Button. */
  primary?: React.ReactNode;

  /** A secondary action Button. */
  secondary?: React.ReactNode;

  /** An error message to display. */
  errorMessage?: React.ReactNode;

  /** Style override for footer border-top. */
  borderTop?: string;

  /** The text of the footer. <strong> tags will be rendered in bold. */
  children?: React.ReactNode;
}

let FlowFooter = ({ primary, secondary, errorMessage, borderTop, children }: Props) => (
  <div className={styles.footer} style={borderTop ? { borderTop } : null}>
    <div className={styles.right}>
      {secondary}
      {primary}
    </div>
    <div role='alert' className={[styles.content, errorMessage ? styles.error : ''].join(' ')}>
      {errorMessage || children}
    </div>
  </div>
);
export default FlowFooter;
