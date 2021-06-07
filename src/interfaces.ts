import {setProfile} from "./store/actions/profileActions";

export interface ICopyToClipboard {
    children: string
}

export interface IMessages {
    messages: Array<object>
}

export interface IMessageItem {
    id: number | string,
    message: string,
}

export interface IMessageInput {
    message: string,
    setMessage: Function,
    onAddMessage: Function
}

export interface IHeader {
    authMe: Function,
    login: string,
    logOut: Function
}

export interface IHeaderUser {
    login: string,
    logOut: Function
}

export interface ILogin {
    signIn: Function
}

export interface IProfile {
    setProfile: Function,
    profile: any,
    isLoading: boolean,
    match: any,
    location: any,
    history: any
}

export interface IProfileInfo {
    profile: any,
    isLoading: boolean,
    history: any
}

export interface IMyPosts {
    posts: Array<{
        id: number,
        message: string,
        likeCount: number
    }>
    onAddPost: Function
}

export interface IPost {
    message: string,
    likes: number
}

export interface IUsers {
    users: Array<{
        id: number,
        name: string,
        photos: { small: string, large: string },
        status: string,
        followed: boolean,
    }>,
    isLoading: boolean,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    setUsers: Function,
    userFollow: Function,
    userUnfollow: Function,
    setCurrentPage: Function,
    setCurrentUserFollower: Function,
    followingInProgress: [number]
}

export interface IUser {
    user: {
        id: number,
        name: string,
        photos: { small: string, large: string },
        status: string,
        followed: boolean
    },
    userFollow: Function,
    userUnfollow: Function,
    setCurrentUserFollower: Function,
    isLoading: boolean,
    followingInProgress: [number]
}

export interface ISideBar {
    profile: any
}

export interface IAppNavigation {
    setProfile: any
}

export interface IGoBack {
    title?: string,
    history: any
}

export interface IPagination {
    pages: any,
    onPageChanged: Function,
    currentPage: number
}