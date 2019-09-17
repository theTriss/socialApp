import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Settings from './Settings';
import { editProfileThunkCreator, getUserProfileThunkCreator } from '../../redux/reducers/pprofile-reducer';
import { getUserProfile } from '../../redux/selectors/profile-selector';
import { togglePreloader } from '../../redux/reducers/app-reducers';
import withPreloader from '../../hoc/Preloader';


const SettingsContainer = (props) => {
    const Preloader = withPreloader('preloader')(Settings)

    const { myId, togglePreloader, userProfile, getUserProfileThunkCreator } = props;

    useEffect(() => {
        const getUser = async () => {
                await togglePreloader('settingPreloader', false)
                await getUserProfileThunkCreator(myId);
                await togglePreloader('settingPreloader', true)
        }
        getUser();
    }, [myId])

    return <Preloader {...props} />
}

const mapStateToProps = (state) => {
    return {
        userProfile: getUserProfile(state),
        myId: state.auth.id,
        preloader: state.init.settingPreloader
    }
}

export default compose(
    connect(mapStateToProps, { editProfileThunkCreator, getUserProfileThunkCreator, togglePreloader }),
)(SettingsContainer)