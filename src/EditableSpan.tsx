import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField value={title}
                         type="text"
                         onBlur={activateViewMode}
                         autoFocus
                         onChange={onChangeInputHandler}
                         size={'small'}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})