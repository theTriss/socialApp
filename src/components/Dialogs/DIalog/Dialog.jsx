import React from 'react';
import style from './Dialog.module.css'

const Dialog = (props) => {

    const getMessages = (id) => {
        props.getMessages(id);
    }

    let { name, id, currentUser } = props;

    return (
        <div className={`${style.dialog} ${(id == currentUser ? style.active : '')}`} onClick={() => { getMessages(id) }}>
            {name}
        </div>
    )
}

export default Dialog