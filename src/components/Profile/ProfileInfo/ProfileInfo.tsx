import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {Alert} from "antd";
import {ApiTwoTone, EditTwoTone, CloseCircleTwoTone} from '@ant-design/icons';
import styles from './ProfileInfo.module.scss';
import ProfileStatus from "./ProfileStatus";
import ProfileData from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";
import {getProfile, getProfileErrorText} from "../../../store/selectors/profile-selectors";
import {saveProfile} from "../../../store/actions/profileActions";
import {getAppTheme} from "../../../store/selectors/app-selectors";

const {ErrorBoundary} = Alert;

const ProfileInfo: React.FC = () => {
    const profile = useSelector(getProfile);
    const errorText = useSelector(getProfileErrorText);
    const appTheme = useSelector(getAppTheme);
    const [editMode, setEditMode] = useState<boolean>(false);

    const setEditModeHandler = () => {
        setEditMode(!editMode)
    }

    return (
        <div className={`${styles.wrapper} default-box default-box--${appTheme}`}>
            <ErrorBoundary>
                <div className={styles.profileHead}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className={styles.profileName}>{profile?.fullName}</h1>
                        <div className={styles.online}>online <span className="ml-1"><ApiTwoTone/></span></div>
                    </div>
                    <ProfileStatus/>
                    <span className={styles.status}/>
                </div>
                <div className="d-flex justify-content-end mt-3 mb-2">
                    {editMode
                        ? <CloseCircleTwoTone onClick={setEditModeHandler}/>
                        : <EditTwoTone onClick={setEditModeHandler}/>
                    }
                </div>
                {!editMode
                    ? <ProfileData profile={profile}/>
                    : <ProfileDataForm profile={profile} onSubmit={saveProfile} errorText={errorText}/>
                }
            </ErrorBoundary>
        </div>
    );
}

export default ProfileInfo;
