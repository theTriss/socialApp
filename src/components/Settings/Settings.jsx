import React, { useEffect, useContext } from 'react';
import { reduxForm, Field } from 'redux-form';
import { FormElement, FieldFileInput } from '../FormControl/FormControl';
import { required, maxlength, minlength } from '../../validations/validations';


const maxLength20 = maxlength(20);
const maxLength100 = maxlength(100);
const minlength7 = minlength(7);

const Settings = (props) => {

    const { fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts: {
        facebook, github, instagram, twitter, vk, youtube, mainLink, website } } = props.userProfile;

    let SettingForm = (props) => {

        const { handleSubmit } = props;

        useEffect(() => {
            props.initialize({
                fullName, aboutMe, lookingForAJob, lookingForAJobDescription,
                facebook, github, instagram, twitter, vk, youtube, mainLink, website
            })
        }, [])

        return <form onSubmit={handleSubmit}>
            <label>Your name:
                <Field component={FormElement} element='input' type='text' className='inputControl' name='fullName' 
                       validate={[required, maxLength20, minlength7]} />
            </label>
            <label>About you:
                <Field component={FormElement} element='textarea' className='textareaControl' name='aboutMe' 
                       validate={[required, maxLength100]} />
            </label>
            <label>Lookoing job:
                <Field component={FormElement} element='input' type='checkbox' className='checkboxControl' name='lookingForAJob' />
            </label>
            <label>Job description:
                <Field component={FormElement} element='textarea' type='checkbox' className='textareaControl' name='lookingForAJobDescription' />
            </label>
            <label>Your facebook:
                <Field component={FormElement} element='input' type='text' className='inputControl' name='facebook' />
            </label>
            <label>Your github:
                <Field component={FormElement} element='input' type='text' className='inputControl' name='github' />
            </label>
            <label>Your instagram:
                <Field component={FormElement} element='input' type='text' className='inputControl' name='instagram' />
            </label>
            <label>Your twitter:
                <Field component={FormElement} element='input' type='text' className='inputControl' name='twitter' />
            </label>
            <label>Your vk:
                <Field component={FormElement} element='input' type='text' className='inputControl' name='vk' />
            </label>
            <label>Your youtube:
                <Field component={FormElement} element='input' type='text' className='inputControl' name='youtube' />
            </label>
            <label>Your mainLink:
                <Field component={FormElement} element='input' type='text' className='inputControl' name='mainLink' />
            </label>
            <label>Your website:
                <Field component={FormElement} element='input' type='text' className='inputControl' name='website' />
            </label>
            <label>Your photo:
                <Field component={FieldFileInput} name='photo' />
            </label>
            <button>Edit</button>
        </form>
    }

    SettingForm = reduxForm({
        form: 'setting'
    })(SettingForm);

    const setSettings = (data) => {
        props.editProfileThunkCreator(data);
    }

    return (
        <SettingForm onSubmit={setSettings} />
    )
}

export default Settings