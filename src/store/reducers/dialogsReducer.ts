import {ADD_DIALOG, SEND_MESSAGE} from "../store-types";

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

const initialState = {
    isLoading: true,
    dialogs: [
        {
            id: 1,
            name: 'Anatoly'
        },
        {
            id: 2,
            name: 'Sergei'
        },
        {
            id: 3,
            name: 'Pavel'
        },
    ] as Array<DialogType>,
    messages: [
        {
            id: 1,
            message: 'Impedit neque qui voluptas?'
        },
        {
            id: 2,
            message: 'A consectetur dolores?'
        },
        {
            id: 3,
            message: 'Dolores qui voluptas?'
        }
    ] as Array<MessageType>
}

type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_DIALOG:
            return {
                ...state,
                dialogs: [{...action.payload}, ...state.dialogs]
            }
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [{...action.payload}, ...state.messages]
            }
        default:
            return state
    }
}

export default dialogsReducer;