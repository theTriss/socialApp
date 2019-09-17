import { createSelector } from 'reselect';

const getDialogs = (state) => state.dialogsPage.dialogs;
export const getDialogsSelector = createSelector( getDialogs, (dialogs) => {
    return dialogs
} )