import React from 'react';
import styles from './index.less';
import { NavLink } from 'umi';
import classNames from 'classnames';

interface Props {
  link: string;
  title?: string;
  className?: string;
}

const NavBarLink: React.FC<Props> = ({
  link,
  className = '',
  title = '',
}: Props) => {
  return (
    <NavLink to={link} exact className={classNames(styles.navLink, className)}>
      <span
        className={classNames('body-16-bold', styles.hidden)}
        data-content={title}
      >
        {title}
      </span>
    </NavLink>
  );
};

export default NavBarLink;
