import Cookies from 'js-cookie';

import { Nullable, ResultCodes, ResultCodesForCaptcha } from '../../types';
import { securityAPI } from '../../api/securityAPI.ts';
import { authAPI } from '../../api/authAPI';
import { BaseThunkType, InferActionsTypes } from '../reducers';
import { AuthActionType } from '../action-types';
import { updateOwnerProfile } from '../actions_old/profileActions';

export const authActions = {
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: AuthActionType.GET_CAPTCHA_URL_SUCCESS,
    payload: captchaUrl,
  }),
  logOutStart: () => ({
    type: AuthActionType.LOG_OUT_START,
  }),
  logOutAccepted: () => ({
    type: AuthActionType.LOG_OUT_ACCEPTED,
  }),
  logOutDenied: () => ({
    type: AuthActionType.LOG_OUT_DENIED,
  }),
};

export type ProfileActionType = {
  email: string;
  password: string;
  captcha?: string;
  rememberMe?: boolean;
};

/**
 * Authorize on the service
 * @param profile
 * @param setSubmitting
 * @param resetForm
 */
export const signIn = (
  profile: ProfileActionType,
  setSubmitting: Nullable<Function> = null,
  resetForm: Nullable<Function> = null,
): ThunkType => {
  return async (dispatch: Function) => {
    authAPI
      .postSignIn(profile)
      .then(data => {
        if (data.resultCode === ResultCodes.Success) {
          resetForm && resetForm();
          dispatch({
            type: AuthActionType.SIGN_IN,
            userId: data.data.userId,
          });
          dispatch(authMe());
        } else {
          if (data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
          }
          dispatch({
            type: AuthActionType.AUTH_NOT_VALID,
            error: data.messages,
          });
        }
        setSubmitting && setSubmitting(false);
      })
      .catch(e => {
        console.error(e);
        setSubmitting && setSubmitting(false);
      });
  };
};

/**
 * Is current user authorized
 */
export const authMe = (): ThunkType => {
  return async (dispatch: Function) => {
    authAPI
      .getAuthMe()
      .then(data => {
        if (data.resultCode === ResultCodes.Success) {
          dispatch({
            type: AuthActionType.AUTH_ME,
            payload: data.data,
          });
          Cookies.set('token', String(data.data.id));
          dispatch(updateOwnerProfile(data.data.id));
        }
      })
      .catch(e => console.error(e));
  };
};

/**
 * Unfollow requested user
 */
export const logOut = (): ThunkType => {
  return async (dispatch: Function) => {
    try {
      dispatch(authActions.logOutStart());
      await authAPI.deleteLogOut().then(() => Cookies.remove('token'));
      dispatch(authActions.logOutAccepted());
    } catch (e) {
      console.error(e);
      dispatch(authActions.logOutDenied());
    }
  };
};

/**
 * Get New Captcha
 */
export const getCaptchaUrl = (): ThunkType => {
  return async (dispatch: Function) => {
    securityAPI.getCaptcha().then(data => {
      dispatch(authActions.getCaptchaUrlSuccess(data.url));
    });
  };
};

export type ActionsTypes = InferActionsTypes<typeof authActions>;
type ThunkType = BaseThunkType<any>;
