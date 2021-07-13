import React, {useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import ProfileInfo from "./ProfileInfo";
import ProfilePhoto from './ProfilePhoto';
import MyPosts from "./MyPosts";
import {MyProfileType, ProfileType} from "../../types";
import {Nullable} from "../../types";

export type ProfilePropsType = {
    profile: ProfileType,
    myProfile: MyProfileType,
    isLoading: boolean,
    errorText: Nullable<string>,
    saveProfile: (formData: ProfileType, setSubmitting: Function) => Promise<ProfileType>,
    savePhoto: () => void,
    updateProfile: (userId: string | undefined) => void,
    authMe: () => void
}

type PathParamsType = {
    userId: string | undefined
}

const Profile: React.FC<ProfilePropsType & RouteComponentProps<PathParamsType>> = props => {
    const {match, updateProfile} = props;
    const currentUserId = match?.params?.userId;

    useEffect(() => {
        if (currentUserId) {
            updateProfile(currentUserId)
        } else {
            updateProfile('17461')
        }
    }, [currentUserId, updateProfile])

    return (
        <div>
            <div className="row">
                <div className="col-12 col-lg-4 pr-lg-2">
                    <ProfilePhoto {...props}/>
                </div>
                <div className="col-12 col-lg-8 pl-lg-2">
                    <ProfileInfo {...props}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <MyPosts/>
                </div>
            </div>
        </div>
    );
}

export default Profile;