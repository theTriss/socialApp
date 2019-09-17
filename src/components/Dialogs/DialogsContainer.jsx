import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import withRedirect from '../../hoc/Redirect';
import {
    addMessage, getAllDialogThunkCreator, getMessagesThunkCreator,
    deleteMessageThunkCreator, returnMessageThunkCreator, sendMessageThunkCreator
} from '../../redux/reducers/dialogs-reducers';
import withPreloader from '../../hoc/Preloader';
import { getDialogsSelector } from '../../redux/selectors/dialogs-selector';

const mapStateToProps = state => {
    return {
        dialogs: getDialogsSelector(state),
        messages: state.dialogsPage.messages,
        myId: state.auth.id,
        currentUser: state.dialogsPage.currentUser,
        isDialogsActive: state.dialogsPage.isDialogsActive,
    }
};


const DialogsContainer = (props) => {

    const Preloader = withPreloader('dialogs')(Dialogs)

    useEffect(() => {
        if(!props.dialogs){
            props.getAllDialogThunkCreator();
        }
    }, [props.dialogs])

    return (
        <Preloader {...props}/>
    )
}

export default compose(
    connect(mapStateToProps, {
        addMessage, getAllDialogThunkCreator, getMessagesThunkCreator,
        deleteMessageThunkCreator, returnMessageThunkCreator,
        sendMessageThunkCreator
    }),
    withRedirect,
)(DialogsContainer);