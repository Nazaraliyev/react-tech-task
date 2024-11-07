import React from 'react';
import styles from '../styles.module.css';
import cx from 'classnames';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { LogoImg } from '@/assets/images';
import { useDispatch } from 'react-redux';
import { resetUser } from '@/store/slices/user';
import { route } from '@/routes/constants/pages';
import Cookies from 'js-cookie';
import { cookieKeys } from '@/utils/constants/common';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useDelay } from '@/utils/hooks';
import { appRoutes } from '@/routes/constants/routes';
import { CustomButton } from '@/components/common';
import { ListItemButton, Typography } from '@mui/material';

const SideBar = () => {
  // States
  const [open, setOpen] = React.useState(true);

  return (
    <aside className={cx(styles.side_bar)}>
      <Header />
      <Menu />
      <Footer />
    </aside>
  );
};

export default SideBar;

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={LogoImg} alt="logo" className={styles.side_bar_logo} />
    </header>
  );
};

const Menu = () => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  console.log('route :>> ', route);

  // Memos
  const menuMemo = React.useMemo(() =>appRoutes.map(item => ({label:item.label, path:item.path, Icon: item.icon})),[]) // prettier-ignore

  // Functions
  const onClick = (path: string) => () => navigate(path);
  return (
    <section>
      <List className={styles.side_bar_menu}>
        {menuMemo.map(({ Icon, ...item }) => (
          <ListItemButton onClick={onClick(item.path!)} selected={item.path === location.pathname}>
            <ListItemIcon className={styles.side_bar_menu_item}>
              <Icon size={20} />
            </ListItemIcon>
            <ListItemText>
              <Typography fontSize={14}>{item.label}</Typography>
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </section>
  );
};

const Footer = () => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getDelay, delaying } = useDelay();

  // Functions
  const onClick = () => {
    getDelay(() => {
      dispatch(resetUser());
      Cookies.remove(cookieKeys.token);
      navigate(route.auth, { replace: true });
    });
  };

  return (
    <footer>
      <CustomButton variant="outlined" onClick={onClick} loading={delaying}>
        Logout
      </CustomButton>
    </footer>
  );
};
