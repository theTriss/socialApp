import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormElement } from '../FormControl/FormControl';
import { required, email } from '../../validations/validations'
import { Redirect  } from 'react-router'

const Login = (props) => {

    const { captcha } = props;

    const submitForm = (data) => {
        props.logInThunkCreator(data);
    }

    let LoginForm = (props) => {
        return <form onSubmit={props.handleSubmit}>
            <div>
                <label>Email: <Field component={FormElement} name='email' type='text' element='input' validate={[required, email]} /></label>
            </div>
            <div>
                <label>Password: <Field component={FormElement} name='password' type='password' element='input' validate={required}/></label>
            </div>
            <div>
                <Field component='input' name='rememberMe' type='checkbox' />
            </div>
                {captcha && <div>
                    <img src={captcha}/>
                    <Field component={FormElement} element='input' name='captcha' type='text' validate={required}/>
                </div>}
            <div>
                <button>Login</button>
            </div>
            {props.error && <span style={ {color: 'red'} }>{props.error}</span>}
        </form>
    }

    LoginForm = reduxForm({
        form: 'login'
    })(LoginForm)

    return (
        <div>
            <h1>LOGIN</h1>
            { !props.login ? <LoginForm onSubmit={submitForm}/> : <Redirect to='/profile' />}
        </div>
    )
}

export default Login;