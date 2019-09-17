import React from 'react';
import Login from './Login';
import { connect } from 'react-redux';
import { logInThunkCreator } from '../../redux/reducers/auth-reducers';

class LoginContainer extends React.Component {
    render() {
        return(
            <Login {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        captcha: state.auth.captcha,
    }
}

export default connect(mapStateToProps, { logInThunkCreator } )(LoginContainer)