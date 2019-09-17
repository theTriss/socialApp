import React, { useState, useEffect } from 'react';
import style from './ProfileStatus.module.css';


// class ProfileStatus extends React.Component {

//     state = {
//         editMode: false,
//         statusText: this.props.status
//     }

//     componentDidUpdate(prevProps, prevState){
//         if( prevProps.status !== this.props.status ) {
//             this.setState({
//                 statusText: this.props.status
//             })
//         }
//     }

//     activeAditeMode = () => {
//         this.setState( {
//             editMode: true
//         } )
//     }

//     deactiveAditeMode = () => {
//         this.setState( {
//             editMode: false
//         } )
//         this.props.changeStatus( this.state.statusText )
//     }

//     changeStatusText = (e) => {
//         this.setState({
//             statusText: e.target.value
//         })
//     }

//     render() {
//         return (
//             <div >
//                 {
//                     !this.state.editMode
//                         ? <div onDoubleClick={this.activeAditeMode} className={style.statusField}>{this.props.status || 'No status'}</div>
//                         : <div ><input type="text" autoFocus={true} onBlur={this.deactiveAditeMode}
//                                        value={this.state.statusText} onChange={this.changeStatusText}/></div>
//                 }
//             </div >
//         )
//     }
// }

const ProfileStatus = (props) => {

    const [editeMode, changeEditMode] = useState(false);
    const [statusText, setStatusText] = useState(props.status);

    useEffect( () => {
        setStatusText(props.status);
    }, [props.status] )

    const activeAditeMode = () => {
        changeEditMode(true);
    }

    const deactiveAditeMode = () => {
        changeEditMode(false);
        props.changeStatus( statusText )
    }

    const changeStatusText = (e) => {
        setStatusText(e.target.value)
    }

    return (
        <div >
            {
                !editeMode
                    ? <div onDoubleClick={activeAditeMode} className={style.statusField}>{props.status || 'No status'}</div>
                    : <div ><input type="text" autoFocus={true} onBlur={deactiveAditeMode}
                        value={statusText} onChange={changeStatusText} /></div>
            }
        </div >
    )
}

export default ProfileStatus