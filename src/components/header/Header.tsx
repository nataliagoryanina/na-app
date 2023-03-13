import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// styles
import styles from './Header.module.scss';
// components
import Modal from '../common/modal/Modal';
// metamask
import MetaMaskOnboarding from '@metamask/onboarding';

type RouteType = {
  name: string;
  path: string;
};

const Header = () => {
  const { t } = useTranslation();
  const [isConnectModalOpened, setIsConnectModalOpened] =
    useState<boolean>(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] =
    useState<boolean>(false);
  const [isMetaMaskConected, setIsMetaMaskConected] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<string[]>([]);

  const onboarding = new MetaMaskOnboarding();
  const { ethereum } = window;

  useEffect(() => {
    setIsMetaMaskInstalled(Boolean(ethereum && ethereum.isMetaMask));
  }, [ethereum]);

  useEffect(() => {
    if (isMetaMaskInstalled) {
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((response: string[]) => {
          setAccounts(response);
        });
      if (accounts.length > 0) {
        setIsMetaMaskConected(true);
      }
    }
  }, [accounts.length, ethereum, isMetaMaskInstalled]);

  const navRoutes: RouteType[] = useMemo(
    () => [
      {
        name: 'Home',
        path: '/'
      },
      {
        name: 'Explore',
        path: '/explore'
      },
      {
        name: 'Create',
        path: '/create'
      },
      {
        name: 'Sell',
        path: '/sell'
      }
    ],
    []
  );

  const toggleConnectModal = () => {
    setIsConnectModalOpened(false);
  };

  const installMetaMask = () => {
    onboarding.startOnboarding();
  };

  const connectMetaMask = async () => {
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((response: string[]) => {
        console.log(response);
        setAccounts(response);
      })
      .catch((error: Error) => console.log(error));
  };

  return (
    <header>
      <nav className={styles.header_nav}>
        <ul className={styles.nav_list}>
          {navRoutes.map((route) => (
            <li key={route.name}>
              <NavLink to={route.path} className={styles.nav_link}>
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {isMetaMaskConected ? (
          <div className={styles.account_icon}></div>
        ) : (
          <button
            className={styles.connect_btn}
            onClick={() => setIsConnectModalOpened(true)}
          >
            Connect wallet
          </button>
        )}
      </nav>
      {isConnectModalOpened && (
        <Modal onCloseClick={toggleConnectModal}>
          <>
            <h2 className={styles.connection_modal_text}>
              {isMetaMaskInstalled
                ? t('header.connect-modal.connect-text')
                : t('header.connect-modal.onboard-text')}
            </h2>
            <button
              className={styles.modal_btn}
              onClick={() => {
                isMetaMaskInstalled ? connectMetaMask() : installMetaMask();
              }}
            >
              <img src='/img/metamask.svg' alt='metamask' />
              <p>
                {isMetaMaskInstalled
                  ? t('header.connect-modal.connect-btn')
                  : t('header.connect-modal.onboard-btn')}
              </p>
            </button>
          </>
        </Modal>
      )}
    </header>
  );
};

export default Header;
