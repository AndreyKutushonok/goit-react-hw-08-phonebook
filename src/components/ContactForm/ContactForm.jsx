import { useState, useEffect } from 'react';
import {
    useGetContactsQuery,
    useAddContactMutation,
} from 'redux/contacts/contactsApi';
import { Button, TextField, Box, CircularProgress } from '@mui/material';
import { AddIcCall } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { contactFormButtonSX, boxSX } from 'components/styles/styles.js';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const { data } = useGetContactsQuery();
    const [addContactApi, { isLoading, isSuccess, isError, error }] =
        useAddContactMutation();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleSubmit = e => {
        e.preventDefault();

        data.some(contact => contact.name === name)
            ? alert(`${name} is already in contacts`)
            : addContactApi({
                  name: name,
                  number: number,
              });

        setName('');
        setNumber('');
    };

    const changeText = evt => {
        const { name, value } = evt.target;
        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        isSuccess &&
            enqueueSnackbar('Contact added successfully', {
                variant: 'success',
            });
        if (isError && error?.originalStatus === 404) {
            enqueueSnackbar("Sorry, we can't find this page", {
                variant: 'error',
            });
        } else if (isError && error?.status === 'FETCH_ERROR') {
            enqueueSnackbar('Internet is disconnected', {
                variant: 'error',
            });
        } else if (isError) {
            enqueueSnackbar('Something went wrong, please try again later', {
                variant: 'error',
            });
        }
    }, [
        closeSnackbar,
        isSuccess,
        isError,
        enqueueSnackbar,
        error?.originalStatus,
        error?.status,
    ]);

    return (
        <Box component="form" onSubmit={handleSubmit} sx={boxSX}>
            <TextField
                label="Name"
                size="small"
                margin="normal"
                type="text"
                name="name"
                value={name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                onChange={changeText}
                required
            />
            <TextField
                label="Number"
                size="small"
                margin="normal"
                type="number"
                name="number"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                onChange={changeText}
                required
            />
            <Button
                variant="contained"
                type="submit"
                margin="normal"
                sx={contactFormButtonSX}
                endIcon={
                    isLoading ? (
                        <CircularProgress
                            size={16}
                            thickness={6}
                            color="inherit"
                        />
                    ) : (
                        <AddIcCall />
                    )
                }
            >
                Add contact
            </Button>
        </Box>
    );
}
