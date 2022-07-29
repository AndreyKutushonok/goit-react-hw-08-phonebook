import { List, ListItem } from '@mui/material';
import {
    useDeleteContactMutation,
    useGetContactsQuery,
} from 'redux/contacts/contactsApi';
import { filteredContacts, getFilter } from 'redux/authorization/selectors';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ContactList() {
    const [deleteUser] = useDeleteContactMutation();
    const filter = useSelector(getFilter);
    const { filteredData } = useGetContactsQuery(undefined, {
        selectFromResult(result) {
            return {
                ...result,
                filteredData: filteredContacts(result, filter),
            };
        },
    });

    return (
        <List sx={{ mt: '0.5rem' }}>
            {filteredData?.map(({ id, name, number }) => (
                <ListItem key={id} sx={{ height: '40px' }}>
                    <p>
                        {name}: {number}
                    </p>
                    <IconButton
                        aria-label="delete"
                        onClick={() => deleteUser(id)}
                        color="primary"
                        sx={{ m: '0 1rem 0 0 ', p: '0' }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
}
