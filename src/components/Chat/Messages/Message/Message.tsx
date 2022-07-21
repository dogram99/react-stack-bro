import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

import { getAuthState } from '../../../../store/selectors/auth-selectors';
import { ChatMessageType } from '../../../../shared/types/chat.types';
import styles from './Message.module.scss';

export const Message: FC<ChatMessageType> = ({ message, photo, userId, userName }) => {
  const ownerUserId = useSelector(getAuthState);

  return (
    <div className={styles.message}>
      <Link to={`/${userId}`}>
        <Avatar src={photo} icon={<UserOutlined />} />
      </Link>
      <div className={styles.MessageStack}>
        <Link to={`/${userId}`}>
          <span className={styles.MessageStackName}>
            {userName} {ownerUserId.userId === userId && ''}
          </span>
        </Link>
        <small className={styles.messageBox}>{message}</small>
      </div>
    </div>
  );
};
