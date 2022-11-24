import { faChartSimple, faClipboardCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Sidebar({ isToggleSidebar }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('user')}>
        <div
          className={cx('avatar', {
            'avatar-toggle': isToggleSidebar,
          })}
        >
          <img src={require('../../../../assets/images/avatar-default.png')} alt="" />
        </div>
        {!isToggleSidebar && <div>Khiem</div>}
      </div>
      <NavLink
        to="/admin/dashboard"
        className={cx('menu-item', {
          'menu-toggle': isToggleSidebar,
        })}
      >
        <div>
          <FontAwesomeIcon icon={faChartSimple} />
        </div>
        <div>Dashboard</div>
      </NavLink>
      <NavLink
        to="/admin/campaign"
        className={cx('menu-item', {
          'menu-toggle': isToggleSidebar,
        })}
      >
        <div>
          <FontAwesomeIcon icon={faClipboardCheck} />
        </div>
        <div>Campaign</div>
      </NavLink>
      <NavLink
        to="/admin/account"
        className={cx('menu-item', {
          'menu-toggle': isToggleSidebar,
        })}
      >
        <div>
          <FontAwesomeIcon icon={faUsers} />
        </div>
        <div>Account</div>
      </NavLink>
    </div>
  );
}

export default Sidebar;
