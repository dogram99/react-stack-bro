import { UsersActionType } from '../../action-types';
import { IUserFilter, IUserType } from '../../../shared/types/user.types';

export interface SetUsers {
  type: UsersActionType.SET_USERS;
}

export interface SetUsersSuccess {
  type: UsersActionType.SET_USERS_SUCCESS;
  totalUsersCount: number;
  users: IUserType[];
}

export interface SetFriendsSuccess {
  type: UsersActionType.SET_FRIENDS_SUCCESS;
  totalFriendsCount: number;
  friends: IUserType[];
}

export interface SetTotalUserCount {
  type: UsersActionType.SET_TOTAL_USERS_COUNT;
  totalUserCount: number;
}

export interface SetCurrentPage {
  type: UsersActionType.SET_CURRENT_PAGE;
  currentPage: number;
}

export interface ToggleFollowUnfollow {
  type: UsersActionType.TOGGLE_FOLLOW_UNFOLLOW;
  userId: number;
}

export interface ToggleFollowingProgress {
  type: UsersActionType.TOGGLE_IS_FOLLOWING_PROGRESS;
  followingInProgress: boolean;
  userId: number;
}

export interface SetFilter {
  type: UsersActionType.SET_USERS_FILTER;
  filter: IUserFilter;
}

export interface ToggleIsFetching {
  type: UsersActionType.TOGGLE_IS_FETCHING_USERS;
}

export type UsersActions =
  | SetUsers
  | SetUsersSuccess
  | SetFriendsSuccess
  | SetTotalUserCount
  | SetCurrentPage
  | ToggleFollowUnfollow
  | ToggleFollowingProgress
  | SetFilter
  | ToggleIsFetching;
