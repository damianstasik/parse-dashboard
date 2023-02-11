/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import Icon     from 'components/Icon/Icon.react';
import { Link } from 'react-router-dom';
import React    from 'react';
import styles   from 'components/Sidebar/Sidebar.scss';

interface Props {
  active?: boolean;
  children?: React.ReactNode;
  name: string;
  link?: string;
  icon?: string;
  style?: any;
  primaryBackgroundColor?: string;
  secondaryBackgroundColor?: string;
  isCollapsed?: boolean;
}

let SidebarSection = ({ active, children, name, link, icon, style, primaryBackgroundColor, secondaryBackgroundColor, isCollapsed }: Props) => {
  let classes = [styles.section];
  if (active) {
    classes.push(styles.active);
  }
  let iconContent = null;
  if (icon) {
    iconContent = <Icon width={25} height={25} name={icon} fill='#ffffff' />;
  }
  if (isCollapsed) {
    classes.push(styles.collapsed);
    return (
      <div className={classes.join(' ')}>
        <div className={styles.section_header} style={{ background: primaryBackgroundColor, ...(style || {}) }}>
          {iconContent}
        </div>
      </div>
    );
  }
  return (
    <div className={classes.join(' ')}>
      {active ?
        <div className={styles.section_header} style={{ background: primaryBackgroundColor, ...(style || {}) }}>{iconContent}<span>{name}</span></div> :
        <Link style={style} className={styles.section_header} to={{ pathname: link || '' }}>{iconContent}<span>{name}</span></Link>}

      {children ? <div className={styles.section_contents} style={{ background: secondaryBackgroundColor }}>{children}</div> : null}
    </div>
  );
};

export default SidebarSection;
