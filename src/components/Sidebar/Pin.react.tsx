import React from 'react';

import Icon from 'components/Icon/Icon.react';
import styles from 'components/Sidebar/Sidebar.scss';

interface Props {
  onClick: () => void;
}

const Pin = ({ onClick }: Props) => (
  <div className={styles.pinContainer} onClick={onClick}>
    <Icon className={styles.sidebarPin} name='pin' width={20} height={20} />
  </div>
);

export default Pin;
