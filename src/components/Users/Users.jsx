import React, { useState } from 'react';
import style from './Users.module.css';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form'
import { FormElement, SendMessageTextArea } from '../FormControl/FormControl';
import PaginationBlock from './PaginationBlock';

const Users = (props) => {

    const [editeMod, setEditeMod] = useState(false);

    let pages = [],
        pageCount = Math.ceil(props.totalCount / props.usersLimit);

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }


    let users = props.users.map(user => <div className={style.user} key={user.id}>

        <div className={style.userInfo}>
            <div className={style.userAvatar}>
                <NavLink to={'/profile/' + user.id}>
                    <img className={style.userAvatarImg} src={user.photos.small
                        ? user.photos.small
                        : 'http://skachatvkontakte.ru/wp-content/uploads/2011/08/deactivated_an.png'} alt="" />
                </NavLink>
            </div>

            <button className={style.send} onClick={() => {
                props.setCurrentUsers(user.id)
                setEditeMod(true);
            }}>Send</button>

            <button className={style.follow} onClick={() => {
                props.followUserThunkCreator(user.id, user.followed);
            }} disabled={props.followProcess.some(id => id == user.id)} >{!user.followed ? 'follow' : 'unfollow'}</button>

            <button className={style.bann} onClick={() => {
                props.bannUser(user.id);
            }}>Bann</button>

        </div>

        <div className={style.userStatus}>
            <div className={style.dataUser}>
                <div className={style.name}>{user.name}</div>
                <div className={style.location}>
                    <div className={style.country}>{"user.location.country"}</div>
                    <div className={style.city}>{"user.location.city"}</div>
                </div>
            </div>
            <div className={style.status}>{user.status}</div>
        </div>

    </div>)

    const searchUsers = ({ search }) => {
        props.getUsersThunkCreator(1, props.usersLimit, search);
    }

    const sendMessage = ({ message }) => {
        if (message) props.sendMessageThunkCreator(props.currentUser, message);
        setEditeMod(false);
    }

    let FormSearch = ({ handleSubmit }) => {

        return (
            <form onSubmit={handleSubmit} className={style.search}>
                <Field component={FormElement} element='input' type='search' placeholder='search...' name='search' />
                <button>&#10004;</button>
            </form>
        )
    }

    let SendMessageForm = ({ handleSubmit }) => {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Field component={FormElement} element='textarea' name='message' placeholder='Введите ваше сообщение...' autoFocus={true} />
                    <button>Send</button>
                </form>
            </div>
        )
    }

    FormSearch = reduxForm({
        form: 'search'
    })(FormSearch);

    SendMessageForm = reduxForm({
        form: 'message'
    }
    )(SendMessageForm);

    return (
        <div>
            {editeMod && <div className={style.moduleWindow}><div className={style.formContainer}><SendMessageForm onSubmit={sendMessage} /></div></div>}
            <FormSearch onSubmit={searchUsers} />
            <h1 className={style.pageTitle}>Users</h1>
            <PaginationBlock pages={pages} currentPage={props.currentPage} requestOnCurrentPage={props.requestOnCurrentPage} pageCount={pageCount}/>
            {users}
        </div>
    )
}

export default Users;