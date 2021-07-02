import React from 'react';
import ProfileInfo from "./ProfileInfo";
import ProfilePhoto from './ProfilePhoto';
import MyPosts from "./MyPosts";
import {ProfilePropsType} from "../../types/PropsTypes";

const Profile: React.FC<ProfilePropsType> = props => {
    // const currentUserId = match?.params.userId;
    // useEffect(() => {
    //     console.log(currentUserId)
    // }, [currentUserId])

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