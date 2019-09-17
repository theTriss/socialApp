import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';


class App extends Component {
    
    state = {
        inputValue: '',
    }
    
    inputChange = (e) => {
        let { value } = e.target 
        this.setState({ inputValue: value})
    }

    addNewRecord = () => {
        this.setState( {inputValue: ''} );
        let { addNewRecord, arrWithRecord } = this.props,
            newValue = this.state.inputValue;
        addNewRecord(newValue);
    }
    
    removeRecord = () => {
        this.setState( {inputValue: ''} );
        let { removeRecord } = this.props,
            { inputValue } = this.state;
        removeRecord(inputValue)
    }
    
    render() {
        let { arrWithRecord, removeRecord } = this.props;
        return (
           <div>
                <input onChange={this.inputChange} value={this.state.inputValue}  type="text" />
                <ul>
                    {arrWithRecord.map( ( elem, index ) => <li key={index}>{elem}</li> )}
                </ul>
                <button onClick={this.addNewRecord}>Add</button>
                <button onClick={this.removeRecord}>Remove</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        arrWithRecord: state,
    }),
    dispatch => ({
        addNewRecord(newRecord){
            dispatch({type: 'addRecord', value: newRecord})
        },
        removeRecord(record) {
            dispatch({ type: 'removeRecord', value: record })
        }
    })
)(App);
