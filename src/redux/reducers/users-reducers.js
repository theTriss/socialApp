import { userAPI } from '../../api/api';

const FOLLOW_USER = 'FOLLOW-USER';
const ADD_USERS = "ADD-USERS";
const CHANGE_TOTAL_COUNTER = "CHANGE-TOTAL-COUNTER";
const CHANGE_CURRENT_PAGE = "CHANGE-CURRENT-PAGE";
const CHANGE_FOLLOW_PROCESS = "CHANGE-FOLLOW-PROCESS";
const BANN_USER = "BANN-USER";

let initialState = {
    users: [],
    totalCount: 0,
    usersLimit: 10,
    currentPage: 1,
    followProcess: [],
    bannedUsers: [],
};

let usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id == action.id) {
                        return {
                            ...user,
                            followed: !user.followed,
                        }
                    }
                    return user
                })
            };
        case ADD_USERS:
            return {
                ...state,
                users: [...action.users],
            }
        case CHANGE_TOTAL_COUNTER:
            return {
                ...state,
                totalCount: action.totalCount,
            }
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case CHANGE_FOLLOW_PROCESS:
            return {
                ...state,
                followProcess: state.followProcess.indexOf(action.userID) == -1
                    ? [...state.followProcess, action.userID]
                    : state.followProcess.filter(id => id != action.userID)
            }
        case BANN_USER:
            return {
                ...state,
                bannedUsers: state.bannedUsers.indexOf(action.userId) == -1
                ? [...state.bannedUsers, action.userId]
                : state.bannedUsers
            }
        default:
            return state
    }
}

export const addUsers = (users) => ({ type: ADD_USERS, users });
export const changeStatus = (id) => ({ type: FOLLOW_USER, id });
export const changeTotalCount = (totalCount) => ({ type: CHANGE_TOTAL_COUNTER, totalCount });
export const changeCurrentPage = (currentPage) => ({ type: CHANGE_CURRENT_PAGE, currentPage });
export const changeFollowProcess = (userID) => ({ type: CHANGE_FOLLOW_PROCESS, userID });
export const bannUser = (userId) => ({ type: BANN_USER, userId });

export const getUsersThunkCreator = (currentPage, usersLimit, search) => {
    return (dispatch) => {
        userAPI.getUsers(currentPage, usersLimit, search)
            .then(response => {
                dispatch(changeCurrentPage(currentPage));
                dispatch(addUsers(response.items))
                dispatch(changeTotalCount(response.totalCount))
            });
    }
}

export const changeCurrentPageThunkCreator = (pageNumber, usersLimit) => {
    return (dispatch) => {
        dispatch(changeCurrentPage(pageNumber));

        userAPI.getUsers(pageNumber, usersLimit)
            .then(response => {
                dispatch(addUsers(response.items))
            })
    }
}

export const followUserThunkCreator = (userId, followStatus) => {
    return (dispatch) => {
        dispatch(changeFollowProcess(userId));
        followStatus
            ? userAPI.unfollowUser(userId)
                .then(res => {
                    dispatch(changeStatus(userId));
                    dispatch(changeFollowProcess(userId))
                })
            : userAPI.followUser(userId)
                .then(res => {
                    dispatch(changeStatus(userId))
                    dispatch(changeFollowProcess(userId))
                })
    }
}

export default usersReducer;