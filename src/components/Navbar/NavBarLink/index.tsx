import React from 'react';
import styles from './index.less';
import { NavLink } from 'umi';
import classNames from 'classnames';

interface Props {
  link: string;
  title?: string;
  className?: string;
  onClick?: (value: boolean) => void;
}

const NavBarLink: React.FC<Props> = ({
  link,
  className = '',
  title = '',
  onClick,
}: Props) => {
  return (
    <NavLink to={link} exact className={classNames(styles.navLink, className)}>
      <span className="size-16" data-content={title}></span>
    </NavLink>
  );
};

export default NavBarLink;
