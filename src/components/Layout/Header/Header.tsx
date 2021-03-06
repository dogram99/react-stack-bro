import React, { CSSProperties, FC } from 'react';
import { GithubFilled, LinkedinOutlined } from '@ant-design/icons';
import { Layout, Tag } from 'antd';

import { MY_GITHUB, MY_LINKEDIN } from '../../../configs/constants';
import { AudioPlayer } from './AudioPlayer/AudioPlayer';
import { MyAccount } from './MyAccount/MyAccount';
import { Logo } from './Logo/Logo';
import styles from './Header.module.scss';

const TAG_INLINE_STYLES: CSSProperties = { marginRight: 0 };

export const Header: FC = () => {
  return (
    <Layout.Header className={`${styles.header} site-layout-background`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 col-md-1 col-md-1 col-lg-2">
            <Logo />
          </div>
          <div className="d-none d-md-block col-md-4 col-lg-3 text-center">
            <a href={MY_LINKEDIN} target="_blank" rel="noreferrer">
              <Tag icon={<LinkedinOutlined />} color="#55acee">
                LinkedIn
              </Tag>
            </a>
            <a href={MY_GITHUB} target="_blank" rel="noreferrer">
              <Tag icon={<GithubFilled />} color="#333" style={TAG_INLINE_STYLES}>
                GitHub
              </Tag>
            </a>
          </div>
          <div className="d-none d-md-block col-md-4 col-lg-5">
            <AudioPlayer />
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <MyAccount />
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};
