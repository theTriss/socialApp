import React, { Component } from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { getUsersThunkCreator, changeCurrentPageThunkCreator, followUserThunkCreator, bannUser } from '../../redux/reducers/users-reducers';
import { getUsers, getTotalCount, getUsersLimit, getCurrentPage, getFollowProcess } from '../../redux/selectors/user-selector';
import { sendMessageThunkCreator, setCurrentUsers } from '../../redux/reducers/dialogs-reducers';

class UsersContainer extends Component {

    componentDidMount() {
        this.props.getUsersThunkCreator( this.props.currentPage, this.props.usersLimit );
    }

    requestOnCurrentPage = (pageNumber) => {
        this.props.changeCurrentPageThunkCreator( pageNumber, this.props.usersLimit );
    }

    render() {
        return <Users users={this.props.users}
                      totalCount={this.props.totalCount}
                      currentPage={this.props.currentPage}
                      usersLimit={this.props.usersLimit}
                      requestOnCurrentPage={this.requestOnCurrentPage}
                      followProcess={this.props.followProcess}
                      followUserThunkCreator={this.props.followUserThunkCreator}
                      bannUser={this.props.bannUser}
                      getUsersThunkCreator={this.props.getUsersThunkCreator}
                      currentUser={this.props.currentUser}
                      setCurrentUsers={this.props.setCurrentUsers}
                      sendMessageThunkCreator={this.props.sendMessageThunkCreator}
                      />
    }
}


const mapStateToProps = state => {
    return {
        users: getUsers(state),
        totalCount: getTotalCount(state),
        usersLimit: getUsersLimit(state),
        currentPage: getCurrentPage(state),
        followProcess: getFollowProcess(state),
        currentUser: state.dialogsPage.currentUser
    }
} 

export default connect( mapStateToProps, { getUsersThunkCreator, changeCurrentPageThunkCreator, followUserThunkCreator, 
                        sendMessageThunkCreator, bannUser, setCurrentUsers })(UsersContainer);