import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AdminLayout() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);

  const handelToggleSidebar = () => {
    setIsToggleSidebar(!isToggleSidebar);
  };

  return (
    <>
      <div className={cx('header')}>
        <Header handelToggleSidebar={handelToggleSidebar} />
      </div>
      <div className={cx('container')}>
        <div
          className={cx('sidebar', {
            'sidebar-toggle': isToggleSidebar,
          })}
        >
          <Sidebar isToggleSidebar={isToggleSidebar} />
        </div>
        <div
          className={cx('content', {
            'content-toggle': isToggleSidebar,
          })}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
