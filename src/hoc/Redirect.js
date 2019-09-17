import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

const withRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            return (
                <div>
                    {this.props.isAuth ? <Component {...this.props}/> : <Redirect to='/login' />}
                </div>
            )
        }
    }

    const RedirectComponentContainer = connect(mapStateToProps, {})(RedirectComponent);
    return RedirectComponentContainer;
}

export default withRedirect;