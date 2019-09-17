import React from 'react';
import style from './FormControl.module.css';

export const Input = ({ input, meta: { error, touched }, type, placeholder, autoFocus }) => {

    const warning = error && touched;

    return (
        <div>
            <div>
                <input placeholder={placeholder} autoFocus={autoFocus} type={type} {...input} 
                      className={`${style.inputControl} ${(warning ? style.inputError : ' ')}`} 
                />
            </div>
            {warning && <span className={style.spanError} >{error}</span>}
        </div>
    )
}

export const FormElement = ({ input, meta: { error, touched }, element, placeholder, type, className, autoFocus}) => {
    const warning = error && touched;

    return (
        <div>
            <div>
                {React.createElement(element, {
                    ...input, placeholder, type, autoFocus,
                    className: `${style[className]} ${(warning ? style.inputError : ' ')}`,
                }, null)}
            </div>
            {warning && <span className={style.spanError} >{error}</span>}
        </div>
    )
}

export const FieldFileInput = (props) => {

    const onChange = (e) => {
        const { input: { onChange } } = props
        onChange(e.target.files[0])
    }

    return (
            <div>
                <input
                    type='file'
                    accept='.jpg, .png, .jpeg'
                    onChange={onChange}
                />
            </div>
    )
}

export const SendMessageTextArea = (props) => {

    const onSubmit = (e) => {
        e.target.parentElement.parentElement.dispatchEvent(new Event('submit'))
    } 

    const input = {
        ...props.input,
        onBlur: onSubmit
    }

    return (
            <div>
                <textarea {...input} placeholder={props.placeholder} autoFocus={props.autoFocus}></textarea>
            </div>
    )
}

// export const someField = ({input, meta, placeholder, type, children}) => {

//     return (
//         <div>
//             {React.cloneElement(children, {...input, placeholder, type}, null)}
//         </div>
//     )
// }