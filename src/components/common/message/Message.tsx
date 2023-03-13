import React, { ReactNode } from 'react';
// styles
import styles from './Message.module.scss';

type MessageProps = {
  type: 'error' | 'notification';
  title?: string;
  description?: string;
  icon?: ReactNode;
  closeIcon?: ReactNode;
  onCloseClick?: () => void;
};

const Message = ({
  type,
  title,
  description,
  icon,
  closeIcon,
  onCloseClick
}: MessageProps) => {
  return (
    <div className={styles.message_wrap}>
      <div data-message-type={type}>
        <div className={styles.text_wrap}>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
