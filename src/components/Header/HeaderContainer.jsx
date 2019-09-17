import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getAuthThunkCreator, logOutThunkCreator } from '../../redux/reducers/auth-reducers';

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getAuthThunkCreator();
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        id: state.auth.id,
        login: state.auth.login,
        email: state.auth.email
    }
}

export default connect(mapStateToProps, { getAuthThunkCreator, logOutThunkCreator })(HeaderContainer);