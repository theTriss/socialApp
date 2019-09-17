import { dialogsAPI } from '../../api/api';

const ADD_MESSAGE = 'ADD-MESSAGE';
const SET_DIALOGS = 'SET-DIALOGS';
const SET_MESSAGE = 'SET-MESSAGE';
const DELETE_MESSAGE = 'DELETE-MESSAGE';
const RETURN_MESSAGE = 'RETURN-MESSAGE';
const SET_CURRENT_USER = 'SET-CURRENT-USER';
const ACTIVE_DIALOGS_INPUT = 'ACTIVE-DIALOGS-INPUT';

let initialState = {
    messages: [],
    currentUser: '',
    isDialogsActive: false
}

let dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    id: state.messages.length + 1,
                    message: action.message
                }]
            }
        case SET_DIALOGS:
            return {
                ...state,
                dialogs: [...action.dialogs],
            }
        case SET_MESSAGE:
            return {
                ...state,
                messages: [...action.messages],
            }
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(message => message.id === action.messageId
                    ? { ...message, isMessageDelete: true }
                    : message
                )
            }
        case RETURN_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(message => message.id === action.messageId
                    ? { ...message, isMessageDelete: false }
                    : message
                )
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.userId
            }
        case ACTIVE_DIALOGS_INPUT:
            return {
                ...state,
                isDialogsActive: true
            }
        default:
            return state;
    }

}

const setDialogs = (dialogs) => ({ type: SET_DIALOGS, dialogs });
const setMessage = (messages) => ({ type: SET_MESSAGE, messages });
const deleteMessage = (messageId) => ({ type: DELETE_MESSAGE, messageId });
const returnMessage = (messageId) => ({ type: RETURN_MESSAGE, messageId });
const activeDilalogsInput = () => ({ type: ACTIVE_DIALOGS_INPUT });


export const addMessage = (message) => ({ type: ADD_MESSAGE, message });
export const setCurrentUsers = (userId) => ({ type: SET_CURRENT_USER, userId })

export const getAllDialogThunkCreator = () => (dispatch) => {
    return dialogsAPI.getAllDialogs()
        .then(({ data }) => {
            const dialogs = [];
            data.forEach(({ userName, id }) => {
                dialogs.push({ id, userName })
            });
            dispatch(setDialogs(dialogs))
        })
}

export const getMessagesThunkCreator = (id) => (dispatch) => {
    dialogsAPI.getMessages(id)
        .then(({ data: { items } }) => {
            const messages = items.map(
                ({ id, body, viewed, senderId, addedAt }) => ({ id, body, viewed, isMessageDelete: false, senderId, addedAt })
            )
            dispatch(setMessage(messages));
            dispatch(setCurrentUsers(id));
            dispatch(activeDilalogsInput());
        })
}

export const sendMessageThunkCreator = (id, message) => (dispatch) => {
    let  body = message;
    if(typeof message === 'object') body = message.message
    dialogsAPI.sendMessage(id, body)
    .then(res => {
       dispatch(getMessagesThunkCreator(id)) 
       dispatch(getAllDialogThunkCreator())
    })
}

export const deleteMessageThunkCreator = (messageId) => (dispatch) => {
    dialogsAPI.deleteMessage(messageId)
        .then(res => {
            dispatch(deleteMessage(messageId));
        })
}

export const returnMessageThunkCreator = (messageId) => (dispatch) => {
    dialogsAPI.restoreMessage(messageId)
        .then(res => {
            dispatch(returnMessage(messageId));
        })
}

export default dialogsReducer;