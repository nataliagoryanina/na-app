import React, { ReactNode } from 'react';
// styles
import styles from './Modal.module.scss';
// common
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

type ModalProps = {
  children?: ReactNode;
  onCloseClick: () => void;
};

const Modal = ({ children, onCloseClick }: ModalProps) => {
  return (
    <>
      <div className={styles.modal_wrap}>
        <CloseIcon className={styles.close_icon} onClick={onCloseClick} />
        {children}
      </div>
      <div className={styles.overlay} onClick={onCloseClick}></div>
    </>
  );
};

export default Modal;
