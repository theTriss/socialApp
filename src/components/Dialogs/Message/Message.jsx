import React from 'react';
import style from './Message.module.css';

const Message = ({ message: { id, body, viewed, isMessageDelete, senderId, addedAt }, myId, 
                   deleteMessageThunkCreator, returnMessageThunkCreator }) => {

    const isIdMatch = senderId == myId;

    return (
        <div className={`${style.messageField} ${(isIdMatch ? style.myMessage : style.anotherMessage)}`}>
            <div className={viewed ? style.messageViewed : style.messageNotViewed}>{body}
                <div className={`${style.date} ${(isIdMatch ? style.right : '')}`}>
                    {addedAt.match(/\d{4}-\d{2}-\d{2}/)}
                </div>
            </div>
            {isMessageDelete 
                ? <button title='return message' onClick={ () => { returnMessageThunkCreator(id) } }>&#8635;</button> 
                : <button title='delete message' onClick={ () => { deleteMessageThunkCreator(id) } }>&#10008;</button>
            }
        </div>
    )
}

export default Message