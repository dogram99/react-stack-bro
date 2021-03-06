import { Dispatch } from 'react';

import { ProfileActionType, UsersActionType } from '../action-types';
import { UsersActions } from '../actions/users-actions/users-actions';
import { usersService } from '../../services/users.service';
import { ResultCodesEnum } from '../../shared/types';
import { IUserFilter, IUsersType } from '../../shared/types/user.types';

export const usersActions = {
  toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({
    type: UsersActionType.TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress,
    userId,
  }),
  setCurrentPage: (pageNumber: number) => ({
    type: UsersActionType.SET_CURRENT_PAGE,
    currentPage: pageNumber,
  }),
  setTotalUserCount: (totalUserCount: number) => ({
    type: UsersActionType.SET_TOTAL_USERS_COUNT,
    totalUserCount,
  }),
  toggleIsFetching: (isFetching: boolean) => ({
    type: UsersActionType.TOGGLE_IS_FETCHING_USERS,
    isFetching,
  }),
  setFilter: (filter: IUserFilter) => ({ type: UsersActionType.SET_USERS_FILTER, payload: filter }),
};

/**
 * Returns all (or only filtered by name with term parameter) users separated by page
 * @param:number requestPage
 * @param:number pageSize
 */
export const setUsers = (requestPage: number, pageSize: number, filter: IUserFilter) => {
  return async (dispatch: Function) => {
    dispatch(usersActions.toggleIsFetching(true));
    dispatch(usersActions.setCurrentPage(requestPage));
    dispatch(usersActions.setFilter(filter));
    const data = await usersService.requestUsers(requestPage, pageSize, filter);
    dispatch(usersActions.toggleIsFetching(false));
    dispatch(setUsersSuccess(data));
  };
};

export const setFriends = (requestPage: number, pageSize: number) => {
  return async (dispatch: Function) => {
    usersService
      .requestUsers(requestPage, pageSize, { term: '', friend: true })
      .then((data: IUsersType) => dispatch(setFriendsSuccess(data)))
      .catch(e => console.error(e));
  };
};

const setUsersSuccess = (data: IUsersType) => (dispatch: Dispatch<UsersActions>) => {
  dispatch({
    type: UsersActionType.SET_USERS_SUCCESS,
    users: data.items,
    totalUsersCount: data.totalCount,
  });
};

const setFriendsSuccess = (data: IUsersType) => (dispatch: Dispatch<UsersActions>) => {
  dispatch({
    type: UsersActionType.SET_FRIENDS_SUCCESS,
    friends: data.items,
    totalFriendsCount: data.totalCount,
  });
};

/**
 * Get following status current user
 * @param:number userId
 */
export const setCurrentUserFollower = (userId: number) => {
  return async (dispatch: Function) => {
    usersService
      .getCurrentUserFollower(userId)
      .then(data => {
        dispatch({
          type: ProfileActionType.GET_FOLLOWING_STATUS,
          userId,
          followStatus: data,
        });
      })
      .catch(e => console.error(e));
  };
};

/**
 * Follow to user
 * @param:number userId
 */
export const userFollow = (userId: number) => {
  return async (dispatch: Function) => {
    await dispatch(usersActions.toggleFollowingProgress(true, userId));
    usersService
      .postUserFollow(userId)
      .then(data => {
        if (data.resultCode === ResultCodesEnum.Success) {
          dispatch({
            type: UsersActionType.TOGGLE_FOLLOW_UNFOLLOW,
            userId,
          });
        }
        dispatch(usersActions.toggleFollowingProgress(false, userId));
      })
      .then(() => dispatch(setCurrentUserFollower(userId)))
      .then(() => dispatch(setFriends(1, 9)))
      .catch(e => console.error(e));
  };
};

/**
 * Unfollow to user
 * @param:number userId
 */
export const userUnfollow = (userId: number) => {
  return async (dispatch: Function) => {
    usersService
      .deleteUserUnfollow(userId)
      .then(data => {
        if (data.resultCode === ResultCodesEnum.Success) {
          dispatch(usersActions.toggleFollowingProgress(false, userId));
          dispatch({
            type: UsersActionType.TOGGLE_FOLLOW_UNFOLLOW,
            userId,
          });
        }
      })
      .then(() => dispatch(setCurrentUserFollower(userId)))
      .then(() => dispatch(setFriends(1, 9)))
      .catch(e => console.error(e));
  };
};
