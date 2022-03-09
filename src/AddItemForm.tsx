import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (title.trim() === '') {
            return
        }
        if (e.code === 'Enter') {
            props.addItem(title)
            setTitle('')
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('field is required')
        }

    }

    return (
        <div>
            <TextField
                value={title}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                size={'small'}
                label={'Type value'}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask}
                        color={'primary'}
            ><AddCircleOutlineIcon/> </IconButton>
        </div>
    )
}