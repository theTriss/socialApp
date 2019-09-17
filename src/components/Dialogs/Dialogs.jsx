import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Dialogs.module.css';
import { Field, reduxForm } from 'redux-form';
import { required, maxlength } from '../../validations/validations';
import { FormElement } from '../FormControl/FormControl';
import Message from './Message/Message';
import Dialog from './DIalog/Dialog';

const Dialogs = (props) => {

    const { deleteMessageThunkCreator, returnMessageThunkCreator, getMessagesThunkCreator, sendMessageThunkCreator, currentUser } = props;

    const addMessage = (data) => {
        if(data.message) sendMessageThunkCreator(currentUser, data);
    }

    let MessageForm = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <Field component={FormElement} name='message' element='textarea' placeholder='your message' />
                <button>Add Message</button>
            </form>
        )
    }

    MessageForm = reduxForm({
        form: "dialogs"
    })(MessageForm)

    return (
        <div className={style.dialogsPage}>

            <div className={style.dialogs}>
                {props.dialogs && props.dialogs.map(item => {
                    let { id, userName } = item;
                    return <Dialog key={`${id}`} id={id} name={userName} getMessages={getMessagesThunkCreator} currentUser={currentUser}/>
                })}
            </div>

            <div className={style.messages}>
                <div className={style.messageField}>
                    {!props.isDialogsActive && <div style={{ textAlign: 'center', fontSize: '2em' }}>Выберите собеседника</div>}
                    {props.messages.map(message => <Message myId={props.myId} message={message} key={message.id}
                        deleteMessageThunkCreator={deleteMessageThunkCreator}
                        returnMessageThunkCreator={returnMessageThunkCreator} />)}
                </div>
                <div>
                    {props.isDialogsActive && <MessageForm onSubmit={addMessage} />}
                </div>

            </div>
        </div>
    )
}


export default Dialogs