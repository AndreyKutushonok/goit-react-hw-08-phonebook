import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/contacts/filterSlice';

export default function Filter() {
    const dispatch = useDispatch();
    return (
        <TextField
            label="Find contacts by name"
            size="small"
            type="text"
            name="filter"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={e => dispatch(setFilter(e.target.value))}
            sx={{ width: '22rem' }}
        />
    );
}
