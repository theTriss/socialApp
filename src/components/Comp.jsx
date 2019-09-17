import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './../css/Comp.css';
import HeaderContainer from './Header/HeaderContainer'
import Aside from './Aside/Aside';
import DialogsContainer from './Dialogs/DialogsContainer';
import ProfileContainer from './Profile/ProfileContainer';
import UsersContainer from './Users/UsersContainer';
import LoginContainer from './Login/LoginContainer';
import SettingsContainer from './Settings/SettingsContainer'
import { initializeThunkCreator } from '../redux/reducers/app-reducers';
import Preloader from '../common/Preloader';
import NewsContainer from './News/NewsContainer';
import MusicContainer from './Music/MusicContainer'

class Comp extends Component {

    componentDidMount() {
        this.props.initializeThunkCreator();
    }

    render() {
        return (
            <>
                {this.props.initialize
                    ? <BrowserRouter>
                        <div className='my-app'>
                            <HeaderContainer />
                            <Aside />
                            <div className='main-content'>
                                <Route path='/login' render={() => <LoginContainer />} />
                                <Route path='/profile/:id?' render={() => <ProfileContainer />} />
                                <Route exact path='/dialogs' render={() => <DialogsContainer />} />
                                <Route path='/users' render={() => <UsersContainer />} />
                                <Route path='/settings' render={ () => <SettingsContainer /> }/>
                                <Route path='/news' render={ () => <NewsContainer /> } />
                                <Route path='/music' render={ () => <MusicContainer /> } />
                            </div>
                        </div>
                    </BrowserRouter>
                    : <Preloader />
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialize: state.init.initialize
    }
}

export default connect(mapStateToProps, { initializeThunkCreator })(Comp);