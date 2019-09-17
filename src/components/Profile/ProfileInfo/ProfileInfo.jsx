import React, { Fragment } from 'react';
import style from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus/ProfileStatus';

const ProfileInfo = (props) => {

    if(props.userProfile) {
        var { aboutMe, fullName, lookingForAJob, lookingForAJobDescription, 
                userId, photos: { small, large }, 
                contacts: { facebook, github, instagram, mainLink, twitter, vk, website, youtube} } = props.userProfile;
    }

    return (
        <Fragment>
            <img className={style.logo} src="" alt="" />
            <ProfileStatus status={props.status} changeStatus={props.changeStatus}/>
            <div className={style.about}>
                <img className={style.about__img} src={small ? small : ''} alt="" />
                <div className={style.about__info}>
                    <h2>{fullName}</h2>
                    <p><b>about me: </b>{aboutMe ? aboutMe : ''}</p>
                    <p><b>looking for a job: </b>{lookingForAJob ? `i'm looking for a job` : `i'am not looking for a job`}</p>
                    <p><b>job description: </b>{lookingForAJobDescription}</p>
                    <div className={style.contacts}>
                        <h2>Контакты</h2>
                        {facebook && <p><b>facebook: </b>{facebook}</p>}
                        {github && <p><b>github: </b>{github}</p>}
                        {instagram && <p><b>instagram: </b>{instagram}</p>}
                        {mainLink && <p><b>mainLink: </b>{mainLink}</p>}
                        {twitter && <p><b>twitter: </b>{twitter}</p>}
                        {vk && <p><b>vk: </b>{vk}</p>}
                        {website && <p><b>website: </b>{website}</p>}
                        {youtube && <p><b>youtube: </b>{youtube}</p>}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileInfo;
