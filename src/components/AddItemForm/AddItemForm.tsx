import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled}: AddItemFormType) => {
    console.log('AddItemForm')
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (title.trim() === '') {
            return
        }
        if (e.code === 'Enter') {
            addItem(title)
            setTitle('')
        }
    }

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title)
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
                disabled={disabled}
            />
            <IconButton onClick={addItemHandler}
                        color={'primary'}
                        disabled={disabled}
            >
                <AddCircleOutlineIcon/>
            </IconButton>
        </div>
    )
})