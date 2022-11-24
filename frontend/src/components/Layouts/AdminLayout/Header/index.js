import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ handelToggleSidebar }) {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('toggle-sidebar')} onClick={handelToggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={cx('logo')}>Logo</div>
      <div className={cx('avatar')}>
        <img src={require('../../../../assets/images/default_avatar.png').default} alt="avatar" />
      </div>
    </header>
  );
}

export default Header;
