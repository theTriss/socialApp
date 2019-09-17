import { createSelector } from 'reselect';

const getAllUsers = (state) => state.usersPage.users;
const getBannedUsers = (state) => state.usersPage.bannedUsers;
export const getUsers = createSelector( getAllUsers, getBannedUsers, (users, bannedUsers) => {
    return users.filter( user => bannedUsers.indexOf(user.id) == -1 );
} )

export const getTotalCount = (state) => state.usersPage.totalCount;
export const getUsersLimit = (state) => state.usersPage.usersLimit;
export const getCurrentPage = (state) => state.usersPage.currentPage;
export const getFollowProcess = (state) => state.usersPage.followProcess;