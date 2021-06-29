import React from 'react';
import {Avatar, Dropdown, Button} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import styles from "./MyAccount.module.scss";
import SubMenu from "./SubMenu";
import {MyAccountType} from "../../../types";

const MyAccount: React.FC<MyAccountType> = props => {
    const {logOut, profile} = props;

    return (
        <div className={`${styles.wrapper} no-border`}>
            <Dropdown overlay={<SubMenu logOut={logOut}/>}>
                <Button style={{height: 40}}>
                    <div className={styles.inner}>
                        <span className={`${styles.login} mr-2`}>{profile?.fullName}</span>
                        <Avatar icon={<UserOutlined/>}/>
                    </div>
                </Button>
            </Dropdown>
        </div>
    );
}

export default MyAccount;
