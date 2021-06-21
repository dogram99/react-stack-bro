import {ADD_POST, REMOVE_POST, SET_PROFILE_STATUS, SET_USER_PROFILE} from "../../types";

const initialState = {
    isLoading: true,
    posts: [{id: 1, message: 'Hello World!', likesCount: 1}, {id: 2, message: 'Hi...', likesCount: 2}],
    selectedProfile: null,
    status: ''
}

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
                isLoading: false
            }
        case SET_PROFILE_STATUS:
            return {
                ...state,
                status: action.status
            }
        case ADD_POST:
            return {
                ...state,
                posts: [{...action.payload}, ...state.posts]
            }
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        default:
            return state
    }
}

export default profileReducer;